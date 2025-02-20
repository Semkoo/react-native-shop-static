import React from 'react';
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { Typography } from './Typography';

export interface PickerItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface PickerProps {
  items: PickerItem[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  style?: object;
}

export const Picker: React.FC<PickerProps> = ({
  items,
  selectedValue,
  onValueChange,
  label,
  placeholder = 'Select an option',
  disabled = false,
  style,
}) => {
  const selectedItem = items.find(item => item.value === selectedValue);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Typography variant="body" style={styles.label}>
          {label}
        </Typography>
      )}
      <View style={[styles.pickerContainer, disabled && styles.disabledContainer]}>
        {Platform.OS === 'ios' ? (
          <View style={styles.iosPickerButton}>
            <Typography
              variant="body"
              color={selectedValue ? '#000' : '#666'}
              style={styles.selectedText}>
              {selectedItem?.label || placeholder}
            </Typography>
            <Typography variant="body" color="#666">
              ▼
            </Typography>
          </View>
        ) : null}
        <RNPicker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          enabled={!disabled}
          style={[styles.picker, Platform.OS === 'ios' && styles.iosPicker]}
          itemStyle={styles.iosPickerItem}>
          {!selectedValue && (
            <RNPicker.Item label={placeholder} value="" enabled={false} color="#666" />
          )}
          {items.map(item => (
            <RNPicker.Item
              key={item.value}
              label={item.label}
              value={item.value}
              enabled={!item.disabled}
              color={item.disabled ? '#999' : Platform.OS === 'ios' ? '#000' : undefined}
            />
          ))}
        </RNPicker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  pickerContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    position: 'relative',
  },
  disabledContainer: {
    opacity: 0.5,
  },
  picker: {
    ...Platform.select({
      android: {
        paddingHorizontal: 12,
        height: 48,
      },
      ios: {
        height: 200, // Height for iOS picker modal
      },
    }),
  },
  iosPicker: {
    opacity: 0, // Hide the actual picker on iOS
    height: 48, // Match the button height
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iosPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#f5f5f5',
  },
  iosPickerItem: {
    fontSize: 16,
    height: 48,
  },
  selectedText: {
    flex: 1,
    marginRight: 8,
  },
});
