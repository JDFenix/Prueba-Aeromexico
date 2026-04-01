import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/src/shared/styles/global.css"



export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html
      lang="en"
      className={``}
    >

      <body className="">{children}</body>
    </html>
  );
}
