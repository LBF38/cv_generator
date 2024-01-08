"use client";
import { NavigationBar } from '@/components/navigation-bar';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased p-5 mx-auto",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <header>
            <NavigationBar />
          </header>
          <main>
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
