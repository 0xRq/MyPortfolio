import React from "react"
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, IBM_Plex_Mono, Figtree } from 'next/font/google'
import { GeistPixelLine } from 'geist/font/pixel'
import { Analytics } from '@vercel/analytics/next'
import SmoothScroll from "@/components/smooth-scroll";
// Ignore TypeScript complaint about side-effect import of global CSS
// @ts-ignore
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'Nexus AI - Intelligent Automation Platform',
  description: 'Transform your workflow with AI-powered automation. Nexus AI brings cutting-edge machine learning to your fingertips.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${figtree.variable} ${jetbrainsMono.variable} ${GeistPixelLine.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        
          {children}
        
        <Analytics />
      </body>
    </html>
  )
}

