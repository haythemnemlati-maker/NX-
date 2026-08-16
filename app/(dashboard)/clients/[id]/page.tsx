import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ClientPageProps {
  params: {
    id: string
  }
}

export default async function ClientDetailPage({ params }: ClientPageProps) {
  const supabase = createClient()

  // 1. جلب بيانات العميل والإجابات المرتبطة به من قاعدة البيانات
  const { data: client, error } = await supabase
    .from('clients')
    .select(`
      id,
      name,
      email,
      company,
      created_at,
      submissions (
        id,
        created_at,
        data
      )
    `)
    .eq('id', params.id)
    .single()

  if (error || !client) {
    notFound()
  }

  const submission = client.submissions?.[0]
  const answers = submission?.data?.text_answers || {}
  const files = submission?.data?.file_urls || {}

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* الهيدر وزر العودة */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{client.name}</h1>
          <p className="text-slate-400 text-sm">{client.company || 'بدون اسم شركة'} • {client.email}</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">العودة للوحة التحكم</Button>
        </Link>
      </div>

      {/* حالة الاستلام */}
      {!submission ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 text-center">
          <p className="text-slate-400">لم يقم العميل بإرسال البيانات حتى الآن.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* الإجابات النصية */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-200 border-b border-slate-800 pb-2">
              الإجابات النصية
            </h2>
            {Object.keys(answers).length === 0 ? (
              <p className="text-slate-500 text-sm">لا توجد إجابات نصية.</p>
            ) : (
              <div className="grid gap-4">
                {Object.entries(answers).map(([key, value]) => (
                  <div key={key} className="bg-slate-950 p-4 rounded-md border border-slate-800/60">
                    <span className="block text-xs text-slate-500 mb-1">المُدخل #{key}</span>
                    <p className="text-slate-200 text-sm whitespace-pre-wrap">{String(value)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* الملفات والأصول المرفوعة */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-200 border-b border-slate-800 pb-2">
              الملفات والأصول المرفوعة
            </h2>
            {Object.keys(files).length === 0 ? (
              <p className="text-slate-500 text-sm">لم يتم إرفاق أي ملفات.</p>
            ) : (
              <div className="grid gap-3">
                {Object.entries(files).map(([fieldId, url]) => (
                  <div key={fieldId} className="flex items-center justify-between bg-slate-950 p-3 rounded-md border border-slate-800">
                    <span className="text-sm text-slate-300">مرفق حقل #{fieldId}</span>
                    <a
                      href={String(url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-3 py-1.5 rounded transition"
                    >
                      معاينة / تحميل الملف
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
