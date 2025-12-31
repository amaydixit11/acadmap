'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Share2, Copy, Check, QrCode, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareTimetableDialogProps {
  timetableId: string;
  timetableName: string;
  isPublic: boolean;
  onMakePublic?: () => Promise<boolean>;
}

export function ShareTimetableDialog({
  timetableId,
  timetableName,
  isPublic,
  onMakePublic,
}: ShareTimetableDialogProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMakingPublic, setIsMakingPublic] = useState(false);
  
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/timetable/share/${timetableId}`
    : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleMakePublic = async () => {
    if (!onMakePublic) return;
    setIsMakingPublic(true);
    await onMakePublic();
    setIsMakingPublic(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Timetable
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!isPublic ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This timetable is private. Make it public to share.
              </p>
              <Button onClick={handleMakePublic} disabled={isMakingPublic}>
                {isMakingPublic ? 'Making public...' : 'Make Public & Share'}
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowQR(!showQR)}
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  {showQR ? 'Hide' : 'Show'} QR Code
                </Button>
              </div>
              
              {showQR && (
                <div className="flex justify-center p-4 bg-white rounded-lg">
                  {/* Simple QR placeholder - would use a library like qrcode.react */}
                  <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center text-sm text-gray-500">
                      <QrCode className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>QR Code</p>
                      <p className="text-xs">Install qrcode.react</p>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-center text-gray-500">
                Anyone with this link can view your timetable
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
