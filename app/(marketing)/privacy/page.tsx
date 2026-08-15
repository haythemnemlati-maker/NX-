export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-16 px-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white">سياسة الخصوصية (Privacy Policy)</h1>
      <p className="text-sm leading-relaxed">
        توضح هذه السياسة كيفية جمع واستخدام وحماية البيانات التي تدخلها الوكالات أو عملاؤهم عبر منصة OnboardFlow.
      </p>
      <h2 className="text-xl font-semibold text-white pt-4">البيانات التي نجمعها</h2>
      <p className="text-sm leading-relaxed">
        نجمع البريد الإلكتروني للوكالة، اسم الوكالة، الإجابات المرفوعة، والملفات المرفوعة عبر البوابات، ونستخدم خدمات معتمدة مثل Supabase و Paddle لمعالجة البيانات والدفع بأمان.
      </p>
    </div>
  )
}
