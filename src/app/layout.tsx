import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarah Jenkins | The Local Authority | The Jenkins Group",
  description: "A data-driven, human-first approach to real estate that averages sales 12% above neighborhood asking prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased selection:bg-brand-gold/30 selection:text-brand-charcoal`}
      >
        {children}
      </body>
    </html>
  );
}

