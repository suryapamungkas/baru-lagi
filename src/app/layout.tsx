import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ModalProvider } from "@/context/ModalContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/cart/CheckoutModal";
import { ProductDetailModal } from "@/components/product/ProductDetailModal";
import { TradeInModal } from "@/components/tradein/TradeInModal";
import { GlobalModals } from "@/components/modals/GlobalModals";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BaruLagi - Platform Gawai & Gadget Rekondisi Bersertifikasi Resmi",
  description: "Beli iPhone, MacBook, iPad, dan gadget rekondisi berkualitas rasa baru lagi dengan Garansi 1 Tahun dan Retur 30 Hari Bebas Risiko.",
  authors: [{ name: "Nur Hidayat Surya Pamungkas" }],
  creator: "Nur Hidayat Surya Pamungkas",
  publisher: "Nur Hidayat Surya Pamungkas",
  keywords: ["BaruLagi", "Gadget Rekondisi", "iPhone Second Resmi", "MacBook Bekas Berkualitas", "Nur Hidayat Surya Pamungkas"],
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased font-sans scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-white selection:text-black">
        <ModalProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <CheckoutModal />
            <ProductDetailModal />
            <TradeInModal />
            <GlobalModals />
          </CartProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
