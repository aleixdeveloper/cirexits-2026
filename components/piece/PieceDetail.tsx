import { SHAPE_VARIANTS } from '@/lib/variants';
import { CherrySvg } from '../ui/icons/CherrySvg';
import { defaultProps, grayDefaultProps } from '../ui/icons/defaultProps';
import { Alert } from '../ui/alert/Alert';
import { SuccessfulFound } from './SuccessfulFound';
import Link from 'next/link';
import { getPastelColor } from '@/lib/colors';

const FoundLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Alert className="w-full">
        Oh! Aquesta cirèxit ja ha estat collida i no et dóna més punts.
      </Alert>
      {children}
      <Link className="text-xl font-semibold" href="/mocador-de-farcells">
        Veure el Mocador de fer Farcells
      </Link>
    </>
  );
};

type Props = {
  id: string;
  hue: number;
  isFound: boolean;
  userId: string;
};
export const PieceDetail = async ({ id, hue, isFound, userId }: Props) => {
  return (
    <div className="flex flex-col items-center">
      {isFound ? (
        <FoundLayout>
          <div className="max-w-md m-auto">
            <CherrySvg
              {...(isFound ? grayDefaultProps : defaultProps)}
              width="200"
              height="200"
              isFullPage
              backgroundColor={isFound ? '#eee' : getPastelColor(hue)}
              shape={SHAPE_VARIANTS.CIRCLE}
              points={isFound ? '+0 punts' : `+1 punt`}
            />
          </div>
        </FoundLayout>
      ) : (
        <SuccessfulFound pieceId={id} userId={userId}>
          <div className="max-w-md m-auto">
            <CherrySvg
              {...(isFound ? grayDefaultProps : defaultProps)}
              width="200"
              height="200"
              isFullPage
              backgroundColor={isFound ? '#eee' : getPastelColor(hue)}
              shape={SHAPE_VARIANTS.CIRCLE}
              points={isFound ? '+0 punts' : `+1 punt`}
            />
          </div>
        </SuccessfulFound>
      )}
    </div>
  );
};
