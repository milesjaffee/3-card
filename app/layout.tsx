import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Three Cards",
  description: "3-Cards by Miles Jaffee",
};

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black',
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body 
        className="antialiased mx-4 my-8 lg:mx-auto"
        style={{
          background: `repeating-linear-gradient(
            35deg,
            rgb(240, 210, 255),  
          rgb(255, 255, 255),
          rgb(230, 221, 255)
          1000px
        )`,
      backgroundSize: "100% 1000px",
      //animation: "scrollBackground 30s infinite",
      }}
      >
        <style>
        {`
          @keyframes scrollBackground {
            from {
              background-position: 0 0;
            }
            to {
              background-position: 0 200px;
            }
          }
        `}
      </style>
      <main className="relative flex flex-col items-center justify-items-center h-screen sm:px-20 lg:px-60 gap-10 font-[family-name:var(--font-geist-sans)]">
          {children}
          
          
        </main>
        <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>
            <script
              dangerouslySetInnerHTML={{
              __html: `
              const updateKofiWidget = (locale) => {
              kofiWidgetOverlay.draw('milesjaffee', {
                type: 'floating-chat',
                'floating-chat.donateButton.text': 'Support Me',
                'floating-chat.donateButton.background-color': '#fffc',
                'floating-chat.donateButton.text-color': '#000'
              });
              };

              // Initial setup
              updateKofiWidget('en');
              `,
              }}
            ></script>
      </body>
    </html>
  )
}

