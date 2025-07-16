import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EasyTent Rentals | Tent Rental from ₹500/day',
  description: 'Affordable, waterproof 4-person tents for camping, parties, and outdoor events. Clean, quality-checked, and easy to rent.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'EasyTent Rentals | Rent Tents Easily',
    description: 'Book waterproof tents starting ₹500/day for events and camping. 4-person tents available now.',
    url: 'https://www.easytentrentals.me',
    siteName: 'EasyTent Rentals',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'EasyTent Rentals preview image',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
