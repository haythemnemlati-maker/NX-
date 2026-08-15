'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User, Building, Palette, Save, Check } from 'lucide-react'

export default function SettingsPage() {
  const [agencyName, setAgencyName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function loadAgencyProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email || '')
        const { data } = await supabase
          .from('agencies')
          .select('agency_name')
          .eq('id', user.id)
          .single()

        if (data) setAgencyName(data.agency_name)
      }
      setLoading(false)
    }

    loadAgencyProfile()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)

    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { error } = await supabase
        .from('agencies')
        .update({ agency_name: agencyName })
        .eq('id', user.id)

      if (!error) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="text-slate-500">جاري تحميل الإعدادات...</div>
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">إعدادات الحساب والوكالة</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          إدارة بيانات الوكالة والمعلومات الأساسية للحساب.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                اسم الوكالة
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <Building size={18} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                البريد الإلكتروني (الحساب)
              </label>
              <div className="relative">
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed"
                />
                <User size={18} className="absolute left-3 top-3 text-slate-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">البريد الإلكتروني مرتبط بحساب المصادقة ولا يمكن تغييره هنا.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>

            {success && (
              <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                <Check size={16} /> تم حفظ التغييرات بنجاح!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
