import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { ICON_SIZE } from './index';

{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg> */
}

interface PlusIconProps extends SvgProps {
  width?: number;
  height?: number;
}

export const PlusIcon: React.FC<PlusIconProps> = ({
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
    <Path d="M5 12h14" />
    <Path d="M12 5v14" />
  </Svg>
);
