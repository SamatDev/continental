import { useTranslations } from 'next-intl'
import Link from 'next/link'

type Locale = 'ru' | 'en'

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  return (
    <footer className="relative z-10 border-t border-border bg-bg-primary/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 border border-accent-blue/50 rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-accent-blue -rotate-45" />
              </div>
              <span className="font-mono text-sm tracking-[0.25em] text-text-primary uppercase">
                Continental
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-5">
              {t('nav_title')}
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/services', label: nav('services') },
                { href: '/portfolio', label: nav('portfolio') },
                { href: '/about', label: nav('about') },
                { href: '/contact', label: nav('contact') },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-accent-blue transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-5">
              {t('contact_title')}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${t('email')}`}
                className="text-sm text-text-secondary hover:text-accent-blue transition-colors"
              >
                {t('email')}
              </a>
              <a
                href={`tel:${t('phone').replace(/\s/g, '')}`}
                className="text-sm text-text-secondary hover:text-accent-blue transition-colors"
              >
                {t('phone')}
              </a>
              <span className="text-sm text-text-muted">{t('address')}</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">{t('rights')}</p>
          <Link
            href={'/privacy'}
            className="text-xs text-text-muted hover:text-accent-blue transition-colors"
          >
            {t('privacy')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
