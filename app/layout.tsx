// app/layout.tsx
import type { Metadata, Viewport } from "next";
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
    // Favicon clásico
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" }, // opcional, por si prefieres PNG
    ],
    // Icono para iPhone/iPad al “Agregar a la pantalla de inicio”
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
        url: "/logo-tayro.png", // imagen cuadrada o 1200x630
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
        {children}
      </body>
    </html>
  );
}
