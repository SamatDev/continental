import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  return { title: t('title') }
}

const SERVICES = [
  {
    key: 'wirenboard',
    icon: '⬡',
    tags: ['Wirenboard', 'KNX', 'Modbus', 'MQTT'],
  },
  {
    key: 'voice',
    icon: '◎',
    tags: ['Яндекс Алиса', 'Apple HomeKit', 'Google Home'],
  },
  {
    key: 'climate',
    icon: '≋',
    tags: ['Мультизональный климат', 'Рекуперация', 'Тёплый пол'],
  },
  {
    key: 'lighting',
    icon: '✦',
    tags: ['DALI', 'DMX', 'Modbus', 'Сцены'],
  },
  {
    key: 'security',
    icon: '◈',
    tags: ['CCTV', 'Контроль доступа', 'Датчики'],
  },
  {
    key: 'support',
    icon: '⟳',
    tags: ['Мониторинг 24/7', 'Удалённое обновление'],
  },
] as const

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <p className="font-mono text-xs tracking-widest text-accent-blue uppercase mb-4">— {t('title')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            {t('subtitle')}
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-16">
          {SERVICES.map(({ key, icon, tags }) => (
            <div key={key} className="bg-bg-primary p-10 card-hover group">
              <div className="flex items-start gap-6">
                <span className="text-3xl text-accent-blue shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-3">
                    {t(`items.${key}.title`)}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">
                    {t(`items.${key}.desc`)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] tracking-widest text-text-muted border border-border px-2 py-1 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/contact`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent-blue text-bg-primary font-mono text-sm tracking-widest uppercase font-semibold hover:bg-accent-blue/90 transition-all"
          >
            {locale === 'ru' ? 'Обсудить проект' : 'Discuss a project'}
          </Link>
        </div>
      </div>
    </div>
  )
}
