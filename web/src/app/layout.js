// Built by Rakshita Dogra — SugarNest Cookie Co. © 2025
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import CartDrawer from '@/components/CartDrawer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: "SugarNest Cookie Co.",
  description: 'Demo bakery website with fresh cookies, local cart, fake checkout, and SEO-friendly pages.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <CartDrawer />
      </body>
    </html>
  )
}