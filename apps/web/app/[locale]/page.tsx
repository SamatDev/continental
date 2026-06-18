import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('siteName'),
    description: t('siteDescription'),
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })
  const ts = await getTranslations({ locale, namespace: 'services' })

  const services = [
    { key: 'wirenboard', icon: '⬡', color: 'text-accent-blue' },
    { key: 'voice',      icon: '◎', color: 'text-accent-purple' },
    { key: 'climate',    icon: '≋', color: 'text-accent-blue' },
    { key: 'lighting',   icon: '✦', color: 'text-accent-pink' },
    { key: 'security',   icon: '◈', color: 'text-accent-purple' },
    { key: 'support',    icon: '⟳', color: 'text-accent-blue' },
  ] as const

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-20 md:pt-24 pb-16">
        {/* Radial glows */}
        <div className="absolute inset-0 bg-gradient-radial from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent-pink/4 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-accent-purple/30 px-4 py-1.5 mb-8 bg-accent-purple/5 scan-overlay">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-accent-purple uppercase">
              {t('badge')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6 whitespace-pre-line">
            <span className="text-gradient-cyber">{t('title')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent-pink text-white font-mono text-sm tracking-widest uppercase font-semibold hover:bg-accent-pink/90 transition-all duration-200 glow-pink"
            >
              {t('cta_primary')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-accent-blue/30 text-accent-blue font-mono text-sm tracking-widest uppercase hover:border-accent-blue/60 transition-all duration-200"
            >
              {t('cta_secondary')}
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 md:mt-24 grid grid-cols-3 gap-4 md:gap-8 max-w-xs sm:max-w-2xl mx-auto">
            {[
              { value: t('stat1_value'), label: t('stat1_label'), cls: 'text-gradient-blue' },
              { value: t('stat2_value'), label: t('stat2_label'), cls: 'text-gradient-purple' },
              { value: t('stat3_value'), label: t('stat3_label'), cls: 'text-gradient-cyber' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-2xl md:text-4xl font-bold ${stat.cls} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted font-mono tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-accent-blue/40" />
          <div className="w-1 h-1 rounded-full bg-accent-blue/60 animate-bounce" />
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ─── */}
      <section className="relative px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-widest text-accent-blue uppercase mb-3">— {ts('title')}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                {ts('subtitle')}
              </h2>
            </div>
            <Link
              href={`/services`}
              className="shrink-0 font-mono text-xs text-text-muted tracking-widest uppercase border-b border-text-muted/30 pb-px hover:text-accent-blue hover:border-accent-blue transition-colors"
            >
              {locale === 'ru' ? 'Все услуги →' : 'All services →'}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map(({ key, icon, color }) => (
              <div
                key={key}
                className="bg-bg-primary p-8 card-hover group cursor-default"
              >
                <div className={`text-2xl ${color} mb-4 group-hover:scale-110 transition-transform duration-300 inline-block`}>
                  {icon}
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-2 tracking-wide">
                  {ts(`items.${key}.title`)}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {ts(`items.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="relative px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto border border-accent-purple/20 bg-bg-card/50 p-8 md:p-16 text-center border-cyber">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-48 h-px bg-gradient-to-r from-transparent via-accent-purple/80 to-transparent" />
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            {locale === 'ru'
              ? 'Готовы автоматизировать ваш объект?'
              : 'Ready to automate your property?'}
          </h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            {locale === 'ru'
              ? 'Расскажите о задаче — мы подберём оптимальное решение и рассчитаем стоимость'
              : 'Tell us about your project — we will find the optimal solution and calculate the cost'}
          </p>
          <Link
            href={`/contact`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent-purple text-white font-mono text-sm tracking-widest uppercase font-semibold hover:bg-accent-purple/90 transition-all duration-200 glow-purple"
          >
            {locale === 'ru' ? 'Оставить заявку' : 'Send a request'}
          </Link>
        </div>
      </section>
    </>
  )
}
