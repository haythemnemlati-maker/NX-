import './globals.css'

export const metadata = {
  title: 'Client Onboarding SaaS',
  description: 'SaaS Platform for Agency Client Onboarding',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
