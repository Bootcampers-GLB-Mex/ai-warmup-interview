import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar/navbar";
import "./globals.css";
import Footer from "../components/Footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warmup-AI",
  description: "Warmup-AI Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NavBar />
      {children}
      <Footer />
      </body>
    </html>
  );
}