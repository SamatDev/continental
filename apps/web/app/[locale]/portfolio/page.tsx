import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'portfolio' })
  return { title: t('title') }
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'portfolio' })

  const cases = ['case1', 'case2', 'case3'] as const

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

        {/* Cases */}
        <div className="flex flex-col gap-px bg-border">
          {cases.map((caseKey, idx) => (
            <div key={caseKey} className="bg-bg-primary p-6 md:p-10 lg:p-14 card-hover group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left */}
                <div>
                  <div className="font-mono text-xs text-text-muted tracking-widest mb-4">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-5">
                    {t(`${caseKey}.title`)}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(['tag1', 'tag2', 'tag3'] as const).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] tracking-widest text-accent-blue border border-accent-blue/30 px-2 py-1 uppercase bg-accent-blue/5"
                      >
                        {t(`${caseKey}.${tag}`)}
                      </span>
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t(`${caseKey}.desc`)}
                  </p>
                </div>

                {/* Right - Stats */}
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  {(['stat1', 'stat2', 'stat3'] as const).map((stat) => (
                    <div key={stat} className="border border-border p-3 md:p-5 bg-bg-secondary">
                      <div className="text-lg md:text-2xl font-bold text-gradient-blue mb-1">
                        {t(`${caseKey}.${stat}_v`)}
                      </div>
                      <div className="text-xs text-text-muted font-mono">
                        {t(`${caseKey}.${stat}_l`)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-text-secondary mb-6">
            {locale === 'ru'
              ? 'Хотите реализовать похожий проект?'
              : 'Want to implement a similar project?'}
          </p>
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
