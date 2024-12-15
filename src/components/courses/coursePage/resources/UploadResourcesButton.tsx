import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import React from 'react';

interface UploadResourcesButtonProps extends React.ComponentProps<typeof Button> {
  text: string;
  onClick: () => void;
}

const UploadResourcesButton = ({ text, onClick, className, ...buttonProps }: UploadResourcesButtonProps) => {
  return (
    <Button onClick={onClick} className={cn('shrink-0 group', className)}  {...buttonProps}>
      <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
      {text}
    </Button>
  );
};

export default UploadResourcesButton;
