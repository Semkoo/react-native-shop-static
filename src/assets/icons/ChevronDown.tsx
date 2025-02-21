import React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

import { ICON_SIZE } from './index';

{
  /*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg> */
}

interface ChevronDownIconProps extends SvgProps {
  width?: number;
  height?: number;
}

export const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  width = ICON_SIZE.BASE_WIDTH,
  height = ICON_SIZE.BASE_HEIGHT,
  color = 'currentColor',
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="m6 9 6 6 6-6" />
  </Svg>
);
