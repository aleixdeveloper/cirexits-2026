'use client';
import Link from 'next/link';
import { Alert } from '../ui/alert/Alert';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { storeQrScanItemToStrage } from './helper';
import { shouldOpenModal } from '../ui/modal/utils';
import { useDialog } from '../ui/modal/useDialog';
import { QuestionModal } from '../ui/modal/questionModal';

type Props = {
  userId: string;
  pieceId: string;
  children: React.ReactNode;
};
export const SuccessfulFound = ({ userId, pieceId, children }: Props) => {
  const [enabled, setEnabled] = useState(false);
  const { open, openDialog, closeDialog } = useDialog(false);

  useEffect(() => {
    if (pieceId) {
      const timer_enable_link = setTimeout(() => setEnabled(true), 1500);
      const qrScanCount = storeQrScanItemToStrage(pieceId);
      if (!qrScanCount) {
        return;
      }

      if (shouldOpenModal(qrScanCount)) {
        const timer_modal = setTimeout(() => {
          openDialog();
        }, 1000); // 2 seconds delay

        return () => clearTimeout(timer_modal); // Clean up if component unmounts
      }
      return () => clearTimeout(timer_enable_link); // Clean up if component unmounts
    }
  }, [pieceId]);

  return (
    <>
      <div className="flex flex-col items-center">
        <Alert variant="default">Enhorabona! Has trobat una cirèxit</Alert>
      </div>
      {children}
      <QuestionModal
        open={open}
        closeDialog={closeDialog}
        userId={userId}
        pieceId={pieceId}
      />
      <Link
        className={cn(
          'text-xl font-semibold',
          enabled ? 'cursor-pointer' : 'opacity-20 pointer-events-none'
        )}
        href={enabled ? '/mocador-de-farcells' : '#'}
      >
        Veure el Mocador de fer Farcells
      </Link>
    </>
  );
};
