import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'info';
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}: ConfirmationDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] z-[101] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 outline-none p-10 border border-gray-200">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className={`w-14 h-14 flex items-center justify-center ${variant === 'danger' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-black'}`}>
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <div className="space-y-3">
              <Dialog.Title className="text-sm font-bold text-black uppercase tracking-[0.1em]">
                {title}
              </Dialog.Title>
              <Dialog.Description className="text-xs text-gray-500 font-medium leading-relaxed">
                {description}
              </Dialog.Description>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
              <Dialog.Close asChild>
                <button className="flex-1 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black hover:bg-gray-50 transition-colors border border-gray-200 order-2 sm:order-1 cursor-pointer">
                  {cancelText}
                </button>
              </Dialog.Close>
              <button
                onClick={() => {
                  onConfirm();
                  onOpenChange(false);
                }}
                className={`flex-1 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-colors order-1 sm:order-2 cursor-pointer ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-900'}`}
              >
                {confirmText}
              </button>
            </div>
          </div>
          
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 p-2 text-gray-300 hover:text-black transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
