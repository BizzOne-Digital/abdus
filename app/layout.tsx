import type { Metadata, Viewport } from "next";
import { Noto_Serif } from "next/font/google";
import "./globals.css";
import "./typography.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "Vote Shinwary | Ward 1 · Oshawa",
  description:
    "Vote A. Salam Shinwary for City Councillor — Ward 1, Oshawa. Strong leadership. Better Oshawa.",
  icons: {
    icon: "/favicon.png",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#06152f",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={notoSerif.variable}>
      <body>{children}</body>
    </html>
  );
}
