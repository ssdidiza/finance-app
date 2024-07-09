 import type { Metadata } from "next";
 import { Inter } from "next/font/google";
 import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/query-provider";

import "./globals.css";
import { SheetProvider } from "@/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

          export const metadata: Metadata = {
            title: "Didiserv FinTech",
            description: "This app is for serious people who are serious about their money",
          };

          export default function RootLayout({
            children,
          }: Readonly<{
            children: React.ReactNode;
          }>) {
            return (
              <ClerkProvider>
              <html lang="en">
                <body className={inter.className}>
                  <QueryProvider>
                    <SheetProvider />
                    <Toaster />
                    {children}
                    </QueryProvider>
                    </body>
              </html>
              </ClerkProvider> 
            );
          };
