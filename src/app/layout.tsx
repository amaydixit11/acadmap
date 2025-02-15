import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AppLayout from "@/components/AppLayout";

const defaultUrl = process.env.NEXT_PUBLIC_ORIGIN ?? "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AcadMap - Your Academic Journey Simplified",
  description: "Navigate your academic path with AcadMap - A comprehensive platform for academic planning and course management",
  keywords: "academic planning, course management, education, learning platform",
  authors: [{ name: "Amay Dixit" }],
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
      <body>
        <AppLayout children={children}/>
      </body>
    </html>
  );
}
