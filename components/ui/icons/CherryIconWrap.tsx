import { CherryProps, CherrySvg } from '@/components/ui/icons/CherrySvg';
import { defaultProps } from '@/components/ui/icons/defaultProps';

const CHERRY_WIDTH = 70;
const CHERRY_HEIGHT = 70;

export const CherryIconWrap = (props: Partial<CherryProps>) => {
  return (
    <div style={{ width: CHERRY_WIDTH, height: CHERRY_HEIGHT }}>
      <CherrySvg
        {...defaultProps}
        {...props}
        shape="circle"
        points="+1 punt"
        cherryColorReflected="#fdd"
      />
    </div>
  );
};
