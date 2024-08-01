"use client";

import "./globals.css";
import "@radix-ui/themes/styles.css";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [vh, setVh] = useState(window.innerHeight * 0.01);

  useEffect(() => {
    const updateVh = () => {
      setVh(window.innerHeight * 0.01);
    };

    updateVh();
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, [vh]);

  return (
    <html lang="en">
      <body style={{ height: `${vh * 100}px` }}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="mt-16 max-w-7xl mx-auto flex-grow">{children}</main>
          <FooterNav />
        </div>
      </body>
    </html>
  );
}
