import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Offstone Preview',
  description: 'Hero uniquement – preview Offstone',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

