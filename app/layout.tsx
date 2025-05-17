import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
