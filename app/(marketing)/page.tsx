import Link from 'next/link'
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, Layers, Lock } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Header / Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-white">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">O</div>
            <span>OnboardFlow</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <Link href="#features" className="hover:text-white transition">الميزات</Link>
            <Link href="/pricing" className="hover:text-white transition">الأسعار</Link>
            <Link href="/privacy" className="hover:text-white transition">الخصوصية</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-slate-300 hover:text-white transition">
              تسجيل الدخول
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shadow-lg shadow-blue-500/20"
            >
              ابدأ مجاناً
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center px-6 py-24 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-medium">
          <Zap size={14} /> بديل النماذج المجانية للإيميلات العشوائية
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
          استقبل عملاء وكالتك الجدد بـ <span className="text-blue-500">بوابات مخصصة</span> واحترافية
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          أداة بسيطة تتيح لوكالات التسويق والتصميم والبرمجة بناء بوابات استلام أصول واحتياجات العملاء بهويتهم الخاصة، دون أتمتة معقدة وبذات الروابط الفريدة الآمنة.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-blue-600 hover:bg-blue-500 text-white transition flex items-center justify-center gap-2 shadow-xl shadow-blue-600/25"
          >
            أنشئ بوابتك الأولى مجاناً <ArrowLeft size={18} />
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-medium border border-slate-800 hover:bg-slate-900 text-slate-300 transition"
          >
            عرض خطط الأسعار
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-3">
            <Layers className="text-blue-500" size={32} />
            <h3 className="text-xl font-bold text-white">مُنشئ بوابات بسحب وإفلات</h3>
            <p className="text-sm text-slate-400">ابنِ الصفحة من صفر على قماش أبيض مخصص مع إضافة مدخلات النصوص، الملفات، ورابط الهوية.</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-3">
            <Lock className="text-blue-500" size={32} />
            <h3 className="text-xl font-bold text-white">روابط فريدة تُغلق تلقائياً</h3>
            <p className="text-sm text-slate-400">بمجرد إرسال العميل لبياناته، يُغلق الرابط تلقائياً لمنع أي إعادة استخدام حفظاً للأمان.</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-3">
            <ShieldCheck className="text-blue-500" size={32} />
            <h3 className="text-xl font-bold text-white">مستودع بطاقات منظم</h3>
            <p className="text-sm text-slate-400">لوحة تحكم تعرض لك كل عميل على شكل بطاقة تحتوي كافة إجاباته وملفاته المرفوعة جاهزة للتحميل.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <p>© 2026 OnboardFlow. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-slate-300 transition">الشروط والأحكام</Link>
            <Link href="/refunds" className="hover:text-slate-300 transition">سياسة الاسترداد</Link>
            <Link href="/contact" className="hover:text-slate-300 transition">تواصل معنا</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
