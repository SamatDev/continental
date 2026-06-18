import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return { title: t('title') }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  const values = ['value1', 'value2', 'value3'] as const

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <p className="font-mono text-xs tracking-widest text-accent-blue uppercase mb-4">— {t('title')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            {t('subtitle')}
          </h1>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <p className="text-text-secondary leading-relaxed">{t('p1')}</p>
            <p className="text-text-secondary leading-relaxed">{t('p2')}</p>
          </div>

          {/* Decoration — скрываем на мобиле */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <div className="absolute inset-0 border border-accent-blue/20 rotate-12 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 border border-accent-blue/10 -rotate-6 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-gradient-blue font-mono">C</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-20">
          {values.map((v) => (
            <div key={v} className="bg-bg-primary p-8 card-hover">
              <div className="w-8 h-px bg-accent-blue mb-6" />
              <h3 className="text-base font-semibold text-text-primary mb-3">
                {t(`${v}_title`)}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t(`${v}_desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="mb-20">
          <p className="font-mono text-xs tracking-widest text-text-muted uppercase mb-8">
            {locale === 'ru' ? '— Технологический стек' : '— Technology stack'}
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              'Wirenboard 7',
              'KNX',
              'Modbus RTU/TCP',
              'MQTT',
              'BACnet',
              'DALI',
              'DMX512',
              'Яндекс Алиса',
              'Apple HomeKit',
              'Google Home',
              'HomeAssistant',
              'Node-RED',
              'InfluxDB',
              'Grafana',
            ].map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs tracking-wider text-text-secondary border border-border px-3 py-1.5 hover:border-accent-blue/30 hover:text-accent-blue transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border border-border p-6 md:p-10 bg-bg-card/30 text-center">
          <h2 className="text-xl font-bold text-text-primary mb-4">
            {locale === 'ru' ? 'Давайте работать вместе' : 'Let`s work together'}
          </h2>
          <p className="text-text-secondary text-sm mb-6">
            {locale === 'ru'
              ? 'Опишите вашу задачу — ответим в течение часа'
              : 'Describe your project — we`ll respond within an hour'}
          </p>
          <Link
            href={`/contact`}
            className="inline-flex items-center gap-3 px-8 py-3 border border-accent-blue text-accent-blue font-mono text-xs tracking-widest uppercase hover:bg-accent-blue hover:text-bg-primary transition-all"
          >
            {locale === 'ru' ? 'Связаться' : 'Get in touch'}
          </Link>
        </div>
      </div>
    </div>
  )
}
