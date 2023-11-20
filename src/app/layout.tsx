import { NavigationBar } from '@/components/navigation-bar';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'CV/Resume Generator',
  description: 'Display your CV/Resume in a beautiful way.',
}

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
        </ThemeProvider>
      </body>
    </html>
  )
}
