// app/layout.tsx
import "./globals.css";
import { ToastProvider, ToastProviderWithRef } from "@/components/ui/toast";
import { Providers } from "./provider"; // Import your Providers component

export const metadata = {
  title: "My App",
  description: "Next.js + Tailwind + shadcn/ui",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <Providers> {/* Wrap with your Providers */}
          <ToastProvider>
            <ToastProviderWithRef>
              {children}
            </ToastProviderWithRef>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}