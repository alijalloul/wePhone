import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Script from "next/script";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "wePhone",
  description:
    ' wePhone is a responsive web application that mimics an iPhone website clone. It includes an interactive 3D model of a "wePhone" that users can orbit, change colors, and select different models. ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-DHEQSBZYZ8"
        ></Script>
        <Script id="" strategy="lazyOnload">
          {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DHEQSBZYZ8');`}
        </Script>
      </head>

      <body className={cn("", fontSans.variable)}>{children}</body>
    </html>
  );
}
