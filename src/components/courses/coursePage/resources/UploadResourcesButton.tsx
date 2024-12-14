import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react'

interface UploadResourcesButtonProps{
    text: string;
    onClick: () => void;
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
}
const UploadResourcesButton = ({text, onClick, buttonProps}: UploadResourcesButtonProps) => {
  return (
    <Button onClick={onClick} className="shrink-0 group" {...buttonProps}>
        <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
        {text}
    </Button>
  )
}

export default UploadResourcesButton
