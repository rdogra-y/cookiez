// Built by Rakshita Dogra — SugarNest Cookie Co. © 2025
import './globals.css'
import CartDrawer from '@/components/CartDrawer'

export const metadata = {
  title: "SugarNest Cookie Co.",
  description: 'Demo bakery website with fresh cookies, local cart, fake checkout, and SEO-friendly pages.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CartDrawer />
      </body>
    </html>
  )
}