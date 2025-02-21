import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  onPress: () => void;
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const buttonStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#e8f0fe',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
};

const textStyles: Record<ButtonVariant, TextStyle> = {
  primary: {
    color: '#FFFFFF',
  },
  secondary: {
    color: '#FFFFFF',
  },
  outline: {
    color: '#007AFF',
  },
  danger: {
    color: '#FFFFFF',
  },
  ghost: {
    color: '#000',
  },
};

const textSizeStyles: Record<ButtonSize, TextStyle> = {
  small: {
    fontSize: 14,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 18,
  },
};

export const Button = React.memo<ButtonProps>(
  ({
    onPress,
    title,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
    textStyle,
    fullWidth = false,
    children,
  }) => {
    const buttonStyleArray = React.useMemo(
      () => [
        styles.base,
        buttonStyles[variant],
        sizeStyles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ],
      [variant, size, fullWidth, disabled, style]
    );

    const textStyleArray = React.useMemo(
      () => [
        styles.text,
        textStyles[variant],
        textSizeStyles[size],
        disabled && styles.disabledText,
        textStyle,
      ],
      [variant, size, disabled, textStyle]
    );

    const spinnerColor = React.useMemo(
      () => (variant === 'outline' ? '#007AFF' : '#fff'),
      [variant]
    );

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={buttonStyleArray}
        activeOpacity={0.8}>
        {loading ? (
          <ActivityIndicator color={spinnerColor} />
        ) : children ? (
          children
        ) : (
          <Text style={textStyleArray}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledText: {
    opacity: 0.7,
  },
});
