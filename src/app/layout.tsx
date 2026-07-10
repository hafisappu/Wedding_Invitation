import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Poppins, Amiri } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Safrad & Sheyba — Wedding Invitation",
  description: "Together with their families, Safrad & Sheyba invite you to celebrate their wedding on August 1, 2026. Join us and share your blessings.",
  openGraph: {
    title: "Safrad & Sheyba — Wedding Invitation",
    description: "Together with their families, Safrad & Sheyba invite you to celebrate their wedding on August 1, 2026.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${greatVibes.variable} ${poppins.variable} ${amiri.variable} scroll-smooth`}
    >
      <body className="bg-[#F8F7F4] text-[#222222] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
