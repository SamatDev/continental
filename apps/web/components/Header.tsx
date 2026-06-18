'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Locale = 'ru' | 'en'

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('nav')
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const switchLocale = useCallback(() => {
    const next = locale === 'ru' ? 'en' : 'ru'
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`
    router.refresh()
  }, [locale, router])

  const navLinks = [
    { href: '/services', label: t('services') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-accent-blue/50 rotate-45 flex items-center justify-center group-hover:border-accent-blue transition-colors duration-300">
            <div className="w-2 h-2 bg-accent-blue rounded-none -rotate-45 group-hover:scale-125 transition-transform duration-300" />
          </div>
          <span className="font-mono text-sm tracking-[0.25em] text-text-primary uppercase font-semibold">
            Continental
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-accent-blue transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Locale switcher — cookie, no URL change */}
          <button
            onClick={switchLocale}
            className="font-mono text-xs text-text-muted hover:text-accent-blue transition-colors tracking-widest uppercase"
          >
            {locale === 'ru' ? 'EN' : 'RU'}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 border border-accent-blue/40 text-accent-blue text-xs font-mono tracking-widest uppercase hover:bg-accent-blue/10 transition-all duration-200"
          >
            {t('contact')}
          </Link>

          {/* Burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-text-primary transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-text-primary transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-text-primary transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-primary/95 backdrop-blur-xl border-t border-border px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-text-secondary hover:text-accent-blue transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
