import { SHAPE_VARIANTS } from '@/lib/variants';
import { CherryProps } from './CherrySvg';
import { commonDefaultProps } from './commonsProps';

export const defaultProps: CherryProps = {
  ...commonDefaultProps,
  cherryColorLight: '#FF1744',
  cherryColorDark: '#D50000',
  cherryColorStem: '#795548',
  cherryColorLeaf: '#4CAF50',
  backgroundColor: 'transparent'
};

export const grayDefaultProps: CherryProps = {
  ...commonDefaultProps,
  backgroundColor: '#eee',
  cherryColorReflected: '#fbfbfb',
  cherryColorLight: '#ddd',
  cherryColorDark: '#ccc',
  cherryColorStem: '#ddd',
  cherryColorLeaf: '#ccc'
};

export const welcomeProps: CherryProps = {
  ...defaultProps,
  backgroundColor: 'black',
  shape: 'circle'
};

export const goldCherryProps = {
  shape: SHAPE_VARIANTS.CIRCLE,
  cherryColorStem: '#A39959',
  cherryColorLeaf: '#D3BF4E',
  backgroundColor: 'black',
  cherryColorLight: '#FFD92F',
  cherryColorDark: '#EDC204',
  cherryColorReflected: '#FFFFBF'
};
