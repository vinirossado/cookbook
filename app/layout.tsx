import type React from "react"
import { MenuProvider } from "@/hooks/use-menu"
import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* AdSense script would go here in production */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // This is a placeholder for Google AdSense
              // In production, replace with actual AdSense code
              console.log('AdSense script would load here');
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <MenuProvider>{children}</MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
