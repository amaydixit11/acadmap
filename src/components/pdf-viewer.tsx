"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Loader2 } from "lucide-react";

interface PDFViewerProps {
  url: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
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
        if (!response.ok) throw new Error("Failed to fetch PDF");

        const data = await response.json();
        const base64 = data.content;

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
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [url]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading PDF...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500">
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white">
      {pdfUrl && (
        <>
          <iframe 
            src={pdfUrl} 
            className="w-full h-full" 
            title="PDF Viewer" 
          />
        </>
      )}
    </div>

  );
}