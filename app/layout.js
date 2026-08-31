import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PDF Viewer Premium",
  description: "A premium, responsive PDF viewer built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-white text-slate-900 antialiased selection:bg-indigo-500/30`}>
        {children}
      </body>
    </html>
  );
}
