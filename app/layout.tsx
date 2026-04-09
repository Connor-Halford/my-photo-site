import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LayoutTransition from './components/LayoutTransition'
import PageChevrons from './components/PageChevrons'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Connor Halford Photography',
  description: 'Photography portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} bg-white antialiased`}>
        <LayoutTransition>{children}</LayoutTransition>
        <PageChevrons />
      </body>
    </html>
  );
}
