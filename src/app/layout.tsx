import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/Footer";
import { FilterProvider } from "@/context/FiltersContext";

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
          <FilterProvider>
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <Header />
              <div className="flex flex-col gap-20 max-w-7xl p-5">
                {children}
              </div>
              <Footer />
            </div>
          </main>
          </FilterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
