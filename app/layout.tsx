// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Color de la barra del navegador (Android/Windows)
export const viewport: Viewport = {
  themeColor: "#0B5AD0",
};

// ✅ SEO + Social
export const metadata: Metadata = {
  metadataBase: new URL("https://tayropharma.com.co"), // cambia si usas otro dominio
  title: "Distribuidora Tayro Pharma SAS | Medicamentos al por mayor",
  description:
    "Venta de medicamentos al por mayor y productos farmacéuticos confiables.",
  keywords: [
    "medicamentos",
    "droguerías",
    "Tayro Pharma",
    "mayorista",
    "productos farmacéuticos",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    title: "Distribuidora Tayro Pharma SAS",
    description:
      "Venta de medicamentos al por mayor y productos farmacéuticos confiables.",
    url: "/",
    siteName: "Distribuidora Tayro Pharma SAS",
    images: [
      {
        url: "/logo-tayro.png",
        width: 512,
        height: 512,
        alt: "Distribuidora Tayro Pharma SAS",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Distribuidora Tayro Pharma SAS",
    description:
      "Venta de medicamentos al por mayor y productos farmacéuticos confiables.",
    images: ["/logo-tayro.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Google Analytics con el ID correcto */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-QNCRKP13Z6"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QNCRKP13Z6', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
