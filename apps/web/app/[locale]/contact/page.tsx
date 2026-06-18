import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ContactForm } from '@/components/ContactForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return { title: t('title') }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  const steps = ['step1', 'step2', 'step3', 'step4'] as const

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs tracking-widest text-accent-blue uppercase mb-4">— {t('title')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {t('title')}
          </h1>
          <p className="text-text-secondary">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3 bg-bg-card border border-border p-5 md:p-8">
            <ContactForm />
          </div>

          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <p className="font-mono text-xs tracking-widest text-text-muted uppercase mb-6">
                {t('info_title')}
              </p>
              <ol className="flex flex-col gap-5">
                {steps.map((step, idx) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-accent-blue shrink-0 mt-0.5 tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-text-secondary">{t(step)}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-border pt-8 flex flex-col gap-4">
              <a
                href="mailto:hello@continental.systems"
                className="text-sm text-text-secondary hover:text-accent-blue transition-colors"
              >
                help@continental.systems
              </a>
              <a
                href="tel:+79869227925"
                className="text-sm text-text-secondary hover:text-accent-blue transition-colors"
              >
                +7 (986) 922-79-25
              </a>
              <span className="text-sm text-text-muted">
                {locale === 'ru' ? 'Казань' : 'Kazan'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
