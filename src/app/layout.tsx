import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/Footer";
import { FilterProvider } from "@/context/FiltersContext";
import { ToastProvider } from "@/context/ToastContext";

const defaultUrl = process.env.NEXT_PUBLIC_ORIGIN ?? "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AcadMap - Your Academic Journey Simplified",
  description: "Navigate your academic path with AcadMap - A comprehensive platform for academic planning and course management",
  keywords: "academic planning, course management, education, learning platform",
  authors: [{ name: "AcadMap Team" }],
  openGraph: {
    title: "AcadMap - Your Academic Journey Simplified",
    description: "Navigate your academic path with AcadMap - A comprehensive platform for academic planning and course management",
    url: defaultUrl,
    siteName: "AcadMap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AcadMap - Your Academic Journey Simplified",
    description: "Navigate your academic path with AcadMap - A comprehensive platform for academic planning and course management",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${GeistSans.className} antialiased`} 
      suppressHydrationWarning
    >
      <body 
      // className="relative min-h-screen bg-gradient-to-b from-background to-background/95 text-foreground"
      >
        {/* Background Pattern */}
        <div 
        // className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" 
        />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <FilterProvider>
              {/* Skip to main content link for accessibility */}
              {/* <a 
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4 
                bg-background text-foreground px-4 py-2 rounded-md shadow-lg"
              >
                Skip to main content
              </a> */}

              {/* <div className="relative flex min-h-screen flex-col"> */}
                <Header />
{/*                 
                <main 
                  id="main-content"
                  className="flex-1 w-full flex flex-col items-center isolate"
                >
                  <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-7xl mx-auto 
                    px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12"
                  > */}
                    {/* Content wrapper with improved spacing */}
                    {/* <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-20"> */}
                      {children}
                    {/* </div>
                  </div>
                </main> */}

                <Footer />
              {/* </div> */}
            </FilterProvider>
          </ToastProvider>
        </ThemeProvider>

        {/* Performance optimized analytics */}
        <Analytics />
      </body>
    </html>
  );
}
