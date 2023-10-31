import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import 'primeicons/primeicons.css'
import './globals.css'
import '@/styles/normalize.scss'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Bank Track',
  description:
    'BankTrack is a simple yet effective banking application that gives users the ability to easily view their bank account movements and transactions. Designed with an intuitive and friendly user interface, the app focuses on providing banking customers with an efficient tool to track their financial activities quickly and securely.',
  metadataBase: new URL('https://bank-view.vercel.app'),
  authors: [
    {
      url: 'https://deyvisdev.com',
      name: 'Deyvis Mariños'
    }
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover'
  },
  alternates: {
    canonical: '/'
  },
  manifest: '/docs/manifest.json'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
