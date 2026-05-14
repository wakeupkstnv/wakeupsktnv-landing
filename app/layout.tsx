import type { Metadata, Viewport } from 'next'
import { Inter, Fira_Code } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Tamirlan Kustanayev | AI & Backend Engineer',
  description:
    'AI & Backend Engineer specializing in LLM infrastructure, vLLM, FastAPI, and scalable microservices. Building intelligent systems at Bereke Bank.',
  keywords: [
    'Tamirlan Kustanayev',
    'AI Engineer',
    'Backend Engineer',
    'Python Developer',
    'FastAPI',
    'vLLM',
    'LLM Infrastructure',
    'Machine Learning',
    'Kazakhstan',
  ],
  authors: [{ name: 'Tamirlan Kustanayev' }],
  creator: 'Tamirlan Kustanayev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Tamirlan Kustanayev | AI & Backend Engineer',
    description:
      'AI & Backend Engineer specializing in LLM infrastructure, vLLM, FastAPI, and scalable microservices.',
    siteName: 'Tamirlan Kustanayev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tamirlan Kustanayev | AI & Backend Engineer',
    description:
      'AI & Backend Engineer specializing in LLM infrastructure, vLLM, FastAPI, and scalable microservices.',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a2332',
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
    <html lang="en" className={`${inter.variable} ${firaCode.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
