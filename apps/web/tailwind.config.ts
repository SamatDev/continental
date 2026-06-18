import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#050508',
          secondary: '#0a0a12',
          card: '#0f0f1a',
        },
        accent: {
          blue:       '#00d4ff',
          'blue-dim': '#0099bb',
          purple:     '#a050ff',
          'purple-dim':'#5a20aa',
          pink:       '#ff00a0',
          'pink-dim': '#aa0060',
          gold:       '#f0c060',
          'gold-dim': '#b08830',
        },
        text: {
          primary:   '#e8eaf0',
          secondary: '#8890a8',
          muted:     '#4a5068',
        },
        border: {
          DEFAULT:       '#1a1d2e',
          accent:        '#00d4ff22',
          purple:        '#a050ff22',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial':    'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cyber':
          'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(160,80,255,0.08) 50%, rgba(255,0,160,0.05) 100%)',
        'grid-pattern':
          'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(160,80,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '60px 60px',
      },
      animation: {
        'fade-in':  'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        float:      'float 6s ease-in-out infinite',
        glow:       'glow 2.5s ease-in-out infinite alternate',
        'glow-purple': 'glowPurple 2.5s ease-in-out infinite alternate',
        'scan-line':'scanLine 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px rgba(0,212,255,0.3), 0 0 30px rgba(0,212,255,0.1)' },
          to:   { boxShadow: '0 0 25px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.2)' },
        },
        glowPurple: {
          from: { boxShadow: '0 0 10px rgba(160,80,255,0.3), 0 0 30px rgba(160,80,255,0.1)' },
          to:   { boxShadow: '0 0 25px rgba(160,80,255,0.6), 0 0 60px rgba(160,80,255,0.2)' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
