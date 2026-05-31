import { getPieceById } from '@/lib/pieces/getPieceById';
import { CherrySvg } from '@/components/ui/icons/CherrySvg';
import { defaultProps } from '@/components/ui/icons/defaultProps';
import { SHAPE_VARIANTS } from '@/lib/variants';
import { getPastelColor } from '@/lib/colors';

export default async function PieceDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const piece = await getPieceById(id);

  return (
    <div className="max-w-md m-auto">
      <CherrySvg
        {...defaultProps}
        width="200"
        height="200"
        backgroundColor={getPastelColor(piece?.hue || 0)}
        shape={SHAPE_VARIANTS.CIRCLE}
        points={'1 punt'}
        isFullPage
      />
    </div>
  );
}
