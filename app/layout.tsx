import type { Metadata } from 'next'
import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Script from 'next/script';
import { CandidateProvider } from '@/lib/candidate-context';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'eye by proctorme demo',
  description: ' A demo application showcasing eye by proctorme widget.',
  // icons: {
  //   icon: [
  //     {
  //       url: '/icon-light-32x32.png',
  //       media: '(prefers-color-scheme: light)',
  //     },
  //     {
  //       url: '/icon-dark-32x32.png',
  //       media: '(prefers-color-scheme: dark)',
  //     },
  //     {
  //       url: '/icon.svg',
  //       type: 'image/svg+xml',
  //     },
  //   ],
  //   apple: '/apple-icon.png',
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${bricolage.variable} ${jetbrains.variable} font-sans antialiased`}>
        {/* Keep app layers below dialogs injected into document.body by the widget. */}
        <div id="assessment-app" className="relative isolate z-0">
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute -left-32 -top-40 size-[560px] rounded-full bg-[radial-gradient(circle,#6a2be938,transparent_65%)] blur-[90px] motion-safe:animate-[ambient-drift_18s_ease-in-out_infinite_alternate]" />
            <div className="absolute -bottom-36 -right-24 size-[480px] rounded-full bg-[radial-gradient(circle,#f0a2fd47,transparent_65%)] blur-[90px] motion-safe:animate-[ambient-drift_22s_ease-in-out_infinite_alternate-reverse]" />
            <div className="absolute left-[55%] top-[40%] size-[340px] rounded-full bg-[#d3bbf459] blur-[90px]" />
          </div>
          <CandidateProvider>
            {children}
          </CandidateProvider>
        </div>

        <Script
          src={process.env.NEXT_PUBLIC_SCRIPT_URL}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
