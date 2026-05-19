import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

export const metadata: Metadata = {
  title: 'TAMIRLAN.EXE | AI & Backend Engineer',
  description:
    'AI & Backend Engineer building backend systems, agent orchestration, and practical production APIs.',
  keywords: [
    'Tamirlan Kustanayev',
    'AI Engineer',
    'Backend Engineer',
    'Python Developer',
    'FastAPI',
    'Pydantic AI',
    'LLM Infrastructure',
    'Machine Learning',
    'Kazakhstan',
  ],
  authors: [{ name: 'Tamirlan Kustanayev' }],
  creator: 'Tamirlan Kustanayev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'TAMIRLAN.EXE | AI & Backend Engineer',
    description:
      'AI & Backend Engineer building backend systems, agent orchestration, and practical production APIs.',
    siteName: 'TAMIRLAN.EXE',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className="font-mono antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="tamirlan-theme-mode"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
