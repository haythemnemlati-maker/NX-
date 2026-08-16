import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ContactPage() {
  return (
    <div className="max-w-lg mx-auto py-12 px-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">تواصل معنا</h1>
        <p className="text-slate-400 text-sm">هل لديك استفسار أو تحتاج مساعدة؟ اترك لنا رسالة.</p>
      </div>

      <form className="space-y-4 bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <div>
          <label className="block text-xs text-slate-400 mb-1">الاسم الكامل</label>
          <Input placeholder="أدخل اسمك" required />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">البريد الإلكتروني</label>
          <Input type="email" placeholder="email@example.com" required />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">الرسالة</label>
          <textarea
            rows={4}
            className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition text-sm"
            placeholder="اكتب رسالتك هنا..."
            required
          />
        </div>
        <Button type="submit" className="w-full">إرسال الرسالة</Button>
      </form>
    </div>
  )
}
