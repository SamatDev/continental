# Continental — Setup Guide

## Локальная разработка

```bash
cd apps/web
npm install
npm run dev
# → http://localhost:3000
```

## Структура проекта

```
continental/
├── apps/web/                   # Next.js 15 приложение
│   ├── app/
│   │   ├── [locale]/           # Страницы (ru по умолчанию, /en для англ.)
│   │   │   ├── page.tsx        # Главная
│   │   │   ├── services/       # Услуги
│   │   │   ├── portfolio/      # Портфолио
│   │   │   ├── about/          # О компании
│   │   │   └── contact/        # Контакты
│   │   ├── api/
│   │   │   ├── contact/        # POST /api/contact — форма заявки
│   │   │   └── health/         # GET /api/health — для K8s liveness probe
│   │   ├── sitemap.ts          # Авто-sitemap
│   │   └── robots.ts           # robots.txt
│   ├── components/
│   │   ├── NeuralBackground.tsx # Canvas-анимация (нейроны + цифры)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ContactForm.tsx
│   ├── messages/
│   │   ├── ru.json             # Русские тексты
│   │   └── en.json             # Английские тексты
│   └── Dockerfile              # Multi-stage, standalone output
├── deploy/
│   ├── helm/continental/       # Helm chart
│   └── argocd/application.yaml # ArgoCD Application
└── .github/workflows/ci.yaml   # CI: lint → build → push → gitops
```

## Deploy через ArgoCD (пошагово)

### 1. Создать GitHub репозиторий

```bash
gh repo create YOUR_ORG/continental --private
git init
git remote add origin https://github.com/YOUR_ORG/continental.git
git add .
git commit -m "init: continental smart home website"
git push -u origin main
```

### 2. Заменить YOUR_GITHUB_ORG

```bash
# Заменить во всём проекте (macOS/Linux):
grep -rl 'YOUR_GITHUB_ORG' . | xargs sed -i '' 's/YOUR_GITHUB_ORG/РЕАЛЬНЫЙ_ORG/g'
```

Файлы: `deploy/helm/continental/values.yaml`, `deploy/argocd/application.yaml`

### 3. Secrets в GitHub

```
GITOPS_TOKEN  — GitHub PAT с правами: repo (нужен для gitops-шага CI,
                который пишет новый image tag в values.yaml)
```

Создать: GitHub → Settings → Developer settings → Personal access tokens

### 4. Разрешить GitHub Actions читать/пушить packages (GHCR)

GitHub repo → Settings → Actions → General → Workflow permissions → Read and write

### 5. Cert-manager ClusterIssuer (если ещё не создан)

```bash
# Поменяй email в файле перед применением!
kubectl apply -f deploy/cert-manager/cluster-issuer.yaml

# Проверить:
kubectl get clusterissuer letsencrypt-prod
```

### 6. Настроить DNS

```
continental.systems      A  →  IP вашего nginx Ingress
www.continental.systems  A  →  IP вашего nginx Ingress
```

Получить IP Ingress:
```bash
kubectl get svc -n ingress-nginx ingress-nginx-controller
```

### 7. Применить ArgoCD Application

```bash
kubectl apply -f deploy/argocd/application.yaml

# Следить за синком:
kubectl get application continental-web -n argocd
argocd app sync continental-web   # если не auto
```

ArgoCD создаст namespace `continental`, задеплоит Helm-чарт, cert-manager
автоматически получит Let's Encrypt сертификат через HTTP-01 challenge.

### 8. Проверить TLS 1.3 + HTTP/2

```bash
# TLS версия:
curl -v --tlsv1.3 https://continental.systems 2>&1 | grep "SSL connection"

# HTTP/2:
curl -I --http2 https://continental.systems | head -5

# Или через testssl.sh:
docker run --rm drwetter/testssl.sh continental.systems
```

## Форма заявки → Telegram

В `apps/web/app/api/contact/route.ts` раскомментировать блок с Telegram, добавить в K8s secret:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: continental-secrets
  namespace: continental
stringData:
  telegram-bot-token: "YOUR_TOKEN"
  telegram-chat-id: "YOUR_CHAT_ID"
```

И раскомментировать `env` секцию в `deploy/helm/continental/values.yaml`.

## Дальнейшее расширение (ЛК, API)

Проект спроектирован как монорепо. Следующие сервисы добавлять в `apps/`:
- `apps/api` — NestJS/FastAPI бэкенд
- `apps/dashboard` — личный кабинет
- `apps/admin` — CMS

Для каждого создать свой Dockerfile и Helm chart в `deploy/helm/`.
