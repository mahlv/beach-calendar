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

// This is a workaround for the data-arp attribute added by browser extensions
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove data-arp attribute if it exists
              document.documentElement.removeAttribute('data-arp');
              
              // Add a mutation observer to remove the attribute if it's added later
              const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                  if (mutation.type === 'attributes' && mutation.attributeName === 'data-arp') {
                    document.documentElement.removeAttribute('data-arp');
                  }
                });
              });
              
              observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-arp']
              });
            `,
          }}
        />
      </head>
      <body className={`${nothingYouCouldDo.variable} ${firaCode.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
