'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-card p-8 shadow-lg">
        <div>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground">
            تسجيل الدخول لوكالتك
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            مرحباً بعودتك! أدخل بياناتك للوصول إلى لوحة التحكم.
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="agency@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                كلمة المرور
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition"
          >
            {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
          </button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">ليس لديك حساب؟ </span>
            <Link href="/register" className="font-medium text-primary hover:underline">
              أنشئ حساباً جديداً
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
