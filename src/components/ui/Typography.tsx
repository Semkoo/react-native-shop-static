import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body1'
  | 'caption'
  | 'label'
  | 'subtitle1'
  | 'subtitle2';
type TextAlignment = 'auto' | 'left' | 'right' | 'center' | 'justify';

interface TypographyProps {
  variant?: TypographyVariant;
  color?: string;
  align?: TextAlignment;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numberOfLines?: number;
}

const typographyStyles: Record<TypographyVariant, TextStyle> = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  h5: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  h6: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  body1: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  subtitle1: {
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle2: {
    fontSize: 14,
    lineHeight: 20,
  },
};

export const Typography = React.memo<TypographyProps>(
  ({ variant = 'body', color, align, style, children, numberOfLines }) => {
    const combinedStyles: StyleProp<TextStyle> = React.useMemo(() => {
      const styles = [
        typographyStyles[variant],
        color && { color },
        align && { textAlign: align },
        style,
      ];
      return styles;
    }, [variant, color, align, style]);

    return (
      <Text style={combinedStyles} numberOfLines={numberOfLines}>
        {children}
      </Text>
    );
  }
);

Typography.displayName = 'Typography';
