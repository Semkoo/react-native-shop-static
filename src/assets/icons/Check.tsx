import React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

import { ICON_SIZE } from './index';

{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> */
}

interface CheckIconProps extends SvgProps {
  width?: number;
  height?: number;
}

export const CheckIcon: React.FC<CheckIconProps> = ({
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
    <Path d="M20 6 9 17l-5-5" />
  </Svg>
);
