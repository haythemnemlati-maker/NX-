'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Submission } from '@/types'
import { Download, FileText, UserCheck, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchSubmissions() {
      // جلب جميع إجابات العملاء المخصصة لوكالتك
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('submitted_at', { ascending: false })

      if (!error && data) {
        setSubmissions(data as Submission[])
      }
      setLoading(false)
    }

    fetchSubmissions()
  }, [])

  return (
    <div className="space-y-8">
      {/* رأس الصفحة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">مستودع بطاقات العملاء</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            جميع البيانات والملفات المستقبلة من العملاء الجدد عبر بواباتك المخصصة.
          </p>
        </div>
        
        <Link
          href="/builder"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition"
        >
          + إنشاء بوابة جديدة
        </Link>
      </div>

      {/* عرض البطاقات */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 animate-pulse" />
          ))}
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
          <UserCheck size={48} className="mx-auto text-slate-400 mb-3" />
          <h3 className="text-lg font-semibold">لا يوجد عملاء جدد بعد</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">
            قم بإنشاء بوابة مشاركة الرابط مع عملائك لتستقبل ملفاتهم هنا.
          </p>
          <Link
            href="/builder"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            الانتقال لمُنشئ البوابات &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400 border border-green-200 dark:border-green-900">
                    مكتمل
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(sub.submitted_at).toLocaleDateString('ar-EG')}
                  </span>
                </div>

                <h3 className="text-lg font-bold group-hover:text-blue-600 transition">
                  {sub.client_name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  عدد الإجابات: {Object.keys(sub.data || {}).length} | عدد الملفات: {Object.keys(sub.files || {}).length}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href={`/clients/${sub.id}`}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <FileText size={14} />
                  عرض التفاصيل والتحميل
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
