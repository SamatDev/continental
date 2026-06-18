'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  object: z.string().min(2),
  message: z.string().min(10),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <div className="w-16 h-16 border border-accent-blue/50 rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl text-text-primary font-semibold">{t('success_title')}</h3>
        <p className="text-text-secondary text-sm">{t('success_desc')}</p>
      </div>
    )
  }

  const fieldClass = (hasError: boolean) =>
    `w-full bg-bg-card border ${hasError ? 'border-red-500/50' : 'border-border'} px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 transition-colors duration-200`

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-mono text-text-muted tracking-widest uppercase mb-2">
            {t('name_label')}
          </label>
          <input
            {...register('name')}
            placeholder={t('name_placeholder')}
            className={fieldClass(!!errors.name)}
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-text-muted tracking-widest uppercase mb-2">
            {t('phone_label')}
          </label>
          <input
            {...register('phone')}
            placeholder={t('phone_placeholder')}
            type="tel"
            className={fieldClass(!!errors.phone)}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-text-muted tracking-widest uppercase mb-2">
          {t('object_label')}
        </label>
        <input
          {...register('object')}
          placeholder={t('object_placeholder')}
          className={fieldClass(!!errors.object)}
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-text-muted tracking-widest uppercase mb-2">
          {t('message_label')}
        </label>
        <textarea
          {...register('message')}
          placeholder={t('message_placeholder')}
          rows={5}
          className={`${fieldClass(!!errors.message)} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">{t('error')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="self-start inline-flex items-center gap-3 px-8 py-3 bg-accent-blue text-bg-primary text-xs font-mono tracking-widest uppercase font-semibold hover:bg-accent-blue/90 disabled:opacity-50 transition-all duration-200"
      >
        {status === 'loading' ? t('submitting') : t('submit')}
        {status !== 'loading' && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
    </form>
  )
}
