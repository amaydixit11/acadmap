"use client";

import { useState, useEffect } from "react";

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPDF() {
      if (!url) {
        setError("Invalid URL");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch PDF");
        }

        const data = await response.json();
        const base64 = data.content; // Extract Base64 content

        // Decode Base64 into binary data
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const pdfBlobUrl = URL.createObjectURL(blob);

        setPdfUrl(pdfBlobUrl);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPDF();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl); // Cleanup on unmount
    };
  }, [url]);

  return (
    <div className="w-full h-full">
      {loading && <p>Loading PDF...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {pdfUrl && <iframe src={pdfUrl} className="w-full h-full"></iframe>}
    </div>
  );
}
