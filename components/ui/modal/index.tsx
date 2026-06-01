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
        `top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm`,
        open ? 'absolute' : 'hidden'
      )}
    >
      <div
        className={cn(
          'w-[calc(100%-3rem)] h-[calc(100%-3rem)] relative flex flex-col gap-2 overflow-y-auto rounded-lg border-2 bg-card p-2 shadow-[0_12px_0_hsl(var(--foreground)/0.12)] sm:gap-3 sm:p-6 md:gap-4 items-center',
          className
        )}
      >
        {!withCloseButton ? (
          <></>
        ) : (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-full bg-accent p-1 text-accent-foreground shadow-sm transition-transform hover:scale-105"
          >
            <CircleX className="h-8 w-8" />
          </button>
        )}
        {title && (
          <div className="flex flex-col gap-0.5 sm:gap-2">
            <h2 className="text-xl font-bold text-center">{title}</h2>
            {subtitle && (
              <h3 className="text-lg font-semibold text-center">{subtitle}</h3>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
