import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Ticketing System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>{children}</NextUIProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}