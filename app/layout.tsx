import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
})

const geistPixelGrid = localFont({
  src: [
    {
      path: '../public/fonts/GeistPixelGrid-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-geist-pixel-grid',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TAMIRLAN.DEV | AI & Backend Engineer',
  description:
    'AI & Backend Engineer. Building LLM infrastructure, vLLM deployments, and scalable microservices. Currently at Bereke Bank.',
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
    title: 'TAMIRLAN.DEV | AI & Backend Engineer',
    description:
      'AI & Backend Engineer. Building LLM infrastructure, vLLM deployments, and scalable microservices.',
    siteName: 'TAMIRLAN.DEV',
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
    <html lang="en" className={`${jetbrainsMono.variable} ${geistPixelGrid.variable} bg-background`} suppressHydrationWarning>
      <body className="font-mono antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
