import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const alertVariants = cva('border-2 rounded-lg px-2 py-1  ', {
  variants: {
    variant: {
      default: 'bg-background text-foreground shadow-sm shadow-foreground/20',
      destructive:
        'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive shadow-sm shadow-destructive/20',
      success:
        'border-success/50 text-success dark:border-success [&>svg]:text-success shadow-lg shadow-success/20'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

export { Alert };
