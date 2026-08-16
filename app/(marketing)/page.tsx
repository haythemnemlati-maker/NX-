import Link from 'next/link'
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Lock,
  Sparkles,
  CheckCircle2,
  FileCheck,
  MessageSquare
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* Header / Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-white group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-extrabold text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition">
              O
            </div>
            <span className="tracking-tight">OnboardFlow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto text-center px-6 pt-28 pb-20 space-y-8">
        {/* Glow effect behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-400 text-xs font-semibold shadow-inner">
          <Sparkles size={14} className="text-blue-400 animate-pulse" />
          <span>The Modern Way to Onboard Agency Clients</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto">
          Collect Client Assets with{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
            Secure Custom Portals
          </span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Stop chasing clients over endless email threads and chaotic Google Drive folders. Build custom asset collection portals in seconds with auto-expiring single-use links.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5"
          >
            Create Your First Portal <ArrowRight size={18} />
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold border border-slate-800 hover:bg-slate-900/80 text-slate-300 transition-colors"
          >
            View Pricing & Plans
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" /> No complex setup required
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" /> Unlimited file storage
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" /> Self-expiring secure links
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-blue-400 font-bold">Why OnboardFlow?</h2>
          <p className="text-3xl font-extrabold text-white">Built Specifically for Agencies & Freelancers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl space-y-4 hover:border-blue-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Layers size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Drag & Drop Builder</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Build personalized intake pages with text fields, file upload targets, and brand link inputs effortlessly.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl space-y-4 hover:border-blue-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">One-Time Secure Links</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Once your client submits their files and information, the access link automatically locks to guarantee data safety.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl space-y-4 hover:border-blue-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Centralized Storage</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Review all client assets in a clean dashboard. Preview files directly or download them with one click.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-xs text-white">O</div>
            <span>OnboardFlow</span>
            <span className="text-slate-600 text-xs font-normal">© 2026. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
