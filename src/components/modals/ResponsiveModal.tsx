// components/shop/modals/ResponsiveModal.tsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';


interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  children,
  maxWidth = 'md'
}) => {
  const maxWidthClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`${maxWidthClasses[maxWidth]} w-[95vw] max-h-[90vh] overflow-y-auto`}
        onPointerDownOutside={(e) => {
          // Prevent closing on mobile when scrolling
          if (window.innerWidth < 640) {
            e.preventDefault();
          }
        }}
      >
        {/* Custom Header for Mobile */}
        <div className="flex items-center justify-between p-4 sm:p-0 border-b sm:border-b-0 -mx-6 -mt-6 sm:mx-0 sm:mt-0 mb-4 sm:mb-0">
          <DialogHeader className="flex-1">
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
              {icon}
              {title}
            </DialogTitle>
          </DialogHeader>
          
          {/* Mobile Close Button */}
          
        </div>

        {/* Modal Content */}
        <div className="px-1 sm:px-0">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};