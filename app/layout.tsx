import type { Metadata } from 'next'
import { Nothing_You_Could_Do, Fira_Code } from 'next/font/google'
import './globals.css'

// Load fonts
const nothingYouCouldDo = Nothing_You_Could_Do({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nothing'
})

const firaCode = Fira_Code({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira'
})

export const metadata: Metadata = {
  title: 'Praia',
  description: 'Created by MH',
  generator: 'MH',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${nothingYouCouldDo.variable} ${firaCode.variable}`}>
      <body>{children}</body>
    </html>
  )
}
