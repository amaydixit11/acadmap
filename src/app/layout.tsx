import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/Footer";
import { FilterProvider } from "@/context/FiltersContext";
import { ToastProvider } from "@/context/ToastContext";
import { Analytics } from '@vercel/analytics/next';

const defaultUrl = process.env.NEXT_PUBLIC_ORIGIN
  ? `${process.env.NEXT_PUBLIC_ORIGIN}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AcadMap",
  description: "AcadMap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <FilterProvider>
                  <Header />
              <main className="min-h-screen flex flex-col">
                <div className="flex-1 w-full flex flex-col items-center">
                  <div className="w-full flex-1 flex flex-col">
                    <div className="flex-1 w-full max-w-[95%] sm:max-w-[90%] md:max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
                      <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-20 py-6 sm:py-8 md:py-10 lg:py-12">
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </main>
                    <Footer />
            </FilterProvider>
          </ToastProvider>
        </ThemeProvider>
              <Analytics />
      </body>
    </html>
  );
}