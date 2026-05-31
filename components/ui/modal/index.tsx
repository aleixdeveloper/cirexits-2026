'use client';

import { CircleX } from 'lucide-react';
import clsx from 'clsx';
import { cn } from '@/lib/utils';

export const Modal = ({
  title,
  subtitle = '',
  open = false,
  onClose = () => {},
  children,
  withCloseButton = false,
  className = ''
}: {
  title?: string;
  subtitle?: string;
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  withCloseButton?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        `top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50`,
        open ? 'absolute' : 'hidden'
      )}
    >
      <div
        className={cn(
          'w-[calc(100%-3rem)] h-[calc(100%-3rem)] relative bg-white rounded-lg flex flex-col gap-2 sm:gap-3 md:gap-4 items-center border-4 border-black overflow-y-auto p-2 sm:p-6',
          className
        )}
      >
        {!withCloseButton ? (
          <></>
        ) : (
          <button onClick={onClose} className="absolute top-2 right-2">
            <CircleX className="w-8 h-8 text-black" />
          </button>
        )}
        <div className="flex flex-col gap-0.5 sm:gap-2">
          {title && <h2 className="text-xl font-bold text-center">{title}</h2>}
          {subtitle && (
            <h3 className="text-lg font-semibold text-center">{subtitle}</h3>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};
