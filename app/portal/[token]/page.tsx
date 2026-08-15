'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Portal, PortalElement } from '@/types'
import { CheckCircle2, Lock, Upload, FileCheck } from 'lucide-react'

export default function ClientPortalPage() {
  const { token } = useParams()
  const [loading, setLoading] = useState(true)
  const [isUsed, setIsUsed] = useState(false)
  const [portal, setPortal] = useState<Portal | null>(null)
  const [linkId, setLinkId] = useState<string | null>(null)
  
  const [clientName, setClientName] = useState('')
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [fileUrls, setFileUrls] = useState<Record<string, string>>({})
  const [uploadingFiles, setUploadingFiles] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function loadPortal() {
      // 1. التحقق من صلاحية التوكن وقراءته
      const { data: linkData, error: linkError } = await supabase
        .from('portal_links')
        .select('id, portal_id, is_used')
        .eq('token', token)
        .single()

      if (linkError || !linkData) {
        setLoading(false)
        return
      }

      if (linkData.is_used) {
        setIsUsed(true)
        setLoading(false)
        return
      }

      setLinkId(linkData.id)

      // 2. جلب بيانات البوابة
      const { data: portalData } = await supabase
        .from('portals')
        .select('*')
        .eq('id', linkData.portal_id)
        .single()

      if (portalData) {
        setPortal(portalData as Portal)
      }
      setLoading(false)
    }

    loadPortal()
  }, [token])

  // رفع الملفات لـ Supabase Storage Bucket
  const handleFileUpload = async (elementId: string, file: File) => {
    setUploadingFiles(true)
    const fileExt = file.name.split('.').pop()
    const filePath = `portal-files/${Date.now()}_${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('client-assets')
      .upload(filePath, file)

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('client-assets')
        .getPublicUrl(filePath)

      setFileUrls((prev) => ({ ...prev, [elementId]: publicUrl }))
    }
    setUploadingFiles(false)
  }

  // إرسال النموذج وإغلاق الرابط
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!linkId) return

    setLoading(true)

    // 1. حفظ الإجابات والملفات في جدول submissions
    const { error: subError } = await supabase
      .from('submissions')
      .insert({
        portal_link_id: linkId,
        client_name: clientName,
        data: formData,
        files: fileUrls,
      })

    if (!subError) {
      // 2. إغلاق الرابط تلقائياً لمنع الاستخدام المكرر
      await supabase
        .from('portal_links')
        .update({ is_used: true })
        .eq('id', linkId)

      setSubmitted(true)
    } else {
      alert('حدث خطأ أثناء إرسال البيانات. يرجى المحاولة لاحقاً.')
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        جاري تحميل البوابة...
      </div>
    )
  }

  // إذا كان الرابط قد استخدم سابقاً تم إغلاقه
  if (isUsed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-slate-200 space-y-4">
          <Lock size={48} className="mx-auto text-amber-500" />
          <h2 className="text-xl font-bold text-slate-800">هذا الرابط لم يعد صالحاً</h2>
          <p className="text-sm text-slate-500">
            لقد تم إرسال البيانات واستغلال هذا الرابط سابقاً. تم إغلاقه تلقائياً للحفاظ على أمان البيانات.
          </p>
        </div>
      </div>
    )
  }

  // عند نجاح الإرسال
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-slate-200 space-y-4">
          <CheckCircle2 size={56} className="mx-auto text-green-500" />
          <h2 className="text-2xl font-bold text-slate-800">شكراً لك!</h2>
          <p className="text-sm text-slate-600">
            تم إرسال كافة البيانات والملفات المطلوب بنجاح إلى فريق الوكالة.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* رأس الصفحة بأسلوب الوكالة */}
        <div 
          className="p-8 text-white text-center space-y-2"
          style={{ backgroundColor: portal?.theme_config?.primaryColor || '#2563eb' }}
        >
          <h1 className="text-2xl font-bold">{portal?.title}</h1>
          <p className="text-sm opacity-90">يرجى تعبئة التفاصيل والأسئلة المطلوبة أدناه</p>
        </div>

        {/* نموذج الإجابات */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              اسمك / اسم شركتك <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="مثال: شركة الحلول المبتكرة"
            />
          </div>

          {portal?.schema?.map((el: PortalElement) => (
            <div key={el.id} className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">
                {el.label} {el.required && <span className="text-red-500">*</span>}
              </label>

              {el.type === 'text' && (
                <input
                  type="text"
                  required={el.required}
                  onChange={(e) => setFormData({ ...formData, [el.label]: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={el.placeholder}
                />
              )}

              {el.type === 'textarea' && (
                <textarea
                  rows={3}
                  required={el.required}
                  onChange={(e) => setFormData({ ...formData, [el.label]: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={el.placeholder}
                />
              )}

              {el.type === 'file' && (
                <div className="border-2 border-dashed border-slate-200 p-4 rounded-xl text-center space-y-2">
                  <input
                    type="file"
                    id={`file-${el.id}`}
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(el.id, e.target.files[0])
                      }
                    }}
                  />
                  <label
                    htmlFor={`file-${el.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium cursor-pointer transition"
                  >
                    <Upload size={16} />
                    {fileUrls[el.id] ? 'تم اختيار الملف ✓' : 'اختر الملف للرفع'}
                  </label>
                  {fileUrls[el.id] && (
                    <p className="text-xs text-green-600 font-medium flex items-center justify-center gap-1">
                      <FileCheck size={14} /> تم رفع الملف بنجاح
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={uploadingFiles || loading}
            style={{ backgroundColor: portal?.theme_config?.primaryColor || '#2563eb' }}
            className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-base shadow-lg hover:opacity-95 transition disabled:opacity-50"
          >
            {loading ? 'جاري الإرسال...' : 'إرسال البيانات وإغلاق الصفحة'}
          </button>
        </form>

      </div>
    </div>
  )
}
