import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./AuthProvider";

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
        <AuthProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </AuthProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
