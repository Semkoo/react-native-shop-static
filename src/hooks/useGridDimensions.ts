import { useMemo } from 'react';
import { Dimensions } from 'react-native';

const useGridDimensions = (columns: number, spacing: number) => {
  const columnWidth = useMemo(() => {
    const screenWidth = Dimensions.get('window').width;
    const totalGapSpace = spacing * (columns - 1);
    const availableWidth = screenWidth - spacing * 2 - totalGapSpace;
    return availableWidth / columns;
  }, [columns, spacing]);

  return {
    itemWidth: (Dimensions.get('window').width - spacing * (columns + 1)) / columns,
    columnWidth,
  };
};

export default useGridDimensions;
