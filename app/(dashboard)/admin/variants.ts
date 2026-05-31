import { BadgeProps } from '@/components/ui/badge';

export const stateMap: Record<
  string,
  { text: string; variant: BadgeProps['variant'] }
> = {
  hidden: {
    text: 'Amagada',
    variant: 'default'
  },
  found: {
    text: 'Collida',
    variant: 'success'
  },
  unset: {
    text: 'Inicial',
    variant: 'outline'
  }
};
