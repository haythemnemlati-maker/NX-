'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CreditCard, Check, Sparkles, AlertCircle } from 'lucide-react'

export default function BillingPage() {
  const [plan, setPlan] = useState<'free' | 'pro'>('free')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadPlan() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('agencies')
          .select('plan')
          .eq('id', user.id)
          .single()

        if (data?.plan) setPlan(data.plan as 'free' | 'pro')
      }
      setLoading(false)
    }

    loadPlan()
  }, [])

  // محاكاة فتح بوابة Paddle Checkout Sandbox
  const handleUpgrade = () => {
    alert('سيتم فتح بوابة Paddle Checkout (Sandbox Environment) لإكمال عملية الترقية.')
  }

  if (loading) {
    return <div className="text-slate-500">جاري تحميل بيانات الاشتراك...</div>
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">إدارة الاشتراك والفوترة</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          عرض الخطة الحالية وتحديث الترقية عبر Paddle.
        </p>
      </div>

      {/* بطاقة الخطة الحالية */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard size={24} className="text-blue-600" />
            <div>
              <h3 className="font-bold text-base">الخطة الحالية</h3>
              <p className="text-xs text-slate-500">
                أنت على خطة: <span className="font-semibold uppercase text-blue-600">{plan}</span>
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${plan === 'pro' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
            {plan === 'pro' ? 'اشتراك نشط' : 'خطة مجانية'}
          </span>
        </div>
      </div>

      {/* خيارات الخطط والترقية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* الخطة المجانية */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Free Plan</h3>
            <div className="text-2xl font-bold">$0 <span className="text-xs font-normal text-slate-500">/ شهرياً</span></div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> إنشاء بوابة واحدة</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> استقبال حتى 5 عملاء</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> دعم رفع الملفات الأساسي</li>
            </ul>
          </div>
          <button
            disabled={plan === 'free'}
            className="mt-6 w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 disabled:opacity-50"
          >
            {plan === 'free' ? 'خطتك الحالية' : 'التحويل للمجانية'}
          </button>
        </div>

        {/* خطة الاحتراف المتقدمة */}
        <div className="bg-white dark:bg-slate-900 border-2 border-blue-600 rounded-xl p-6 flex flex-col justify-between shadow-md relative">
          <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles size={10} /> موصى بها
          </span>
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-blue-600">Pro Agency</h3>
            <div className="text-2xl font-bold">$19 <span className="text-xs font-normal text-slate-500">/ شهرياً</span></div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> بوابات غير محدودة</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> استقبال لا محدود للعملاء</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> إخفاء شعار المنصة وتخصيص الهوية كلياً</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> روابط فريدة غير محدودة</li>
            </ul>
          </div>
          <button
            onClick={handleUpgrade}
            disabled={plan === 'pro'}
            className="mt-6 w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition disabled:opacity-50"
          >
            {plan === 'pro' ? 'خطتك الحالية' : 'الترقية لـ Pro عبر Paddle'}
          </button>
        </div>
      </div>
    </div>
  )
}
