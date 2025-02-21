import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '../../assets/icons';
import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  FlatList,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Typography } from './Typography';

type SelectProps = {
  value: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
};

type SelectItemProps = {
  children: React.ReactNode;
  value: string;
  style?: StyleProp<ViewStyle>;
  isSelected?: boolean;
  onPress?: (value: string) => void;
  isDisabled?: boolean;
};

export const Select = ({ value, onValueChange, placeholder, children }: SelectProps) => {
  const [expanded, setExpanded] = useState(false);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(0);

  const buttonRef = useRef<View>(null);

  const toggleExpanded = useCallback(() => {
    if (!expanded && buttonRef.current) {
      // measure(callback) gives us: x, y, width, height, pageX, pageY
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        // pageY: distance from top of screen to component
        // height: height of the component
        // Platform specific adjustment for Android (-32) or iOS (+3)
        const finalValue = pageY + height + (Platform.OS === 'android' ? -32 : 3);
        setTop(finalValue);
        setWidth(width);
      });
    }
    setExpanded(prev => !prev);
  }, [expanded]);

  return (
    <View ref={buttonRef}>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={toggleExpanded}>
        <Typography variant="body">{value || placeholder || 'Select...'}</Typography>
        {expanded ? (
          <ChevronUpIcon width={16} height={16} color="#666" />
        ) : (
          <ChevronDownIcon width={16} height={16} color="#666" />
        )}
      </TouchableOpacity>

      {expanded && (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View style={[styles.options, { top, width }]}>
                <FlatList
                  data={React.Children.toArray(children).filter(React.isValidElement)}
                  bounces={false}
                  renderItem={({ item }) =>
                    React.cloneElement(item as React.ReactElement, {
                      onPress: (itemValue: string) => {
                        onValueChange?.(itemValue);
                        setExpanded(false);
                      },
                    })
                  }
                  keyExtractor={(_, index) => index.toString()}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

export const SelectItem = ({
  children,
  value,
  onPress,
  style,
  isSelected,
  isDisabled,
}: SelectItemProps) => {
  const content = React.isValidElement(children) ? (
    children
  ) : (
    <Typography variant="body" style={styles.itemText}>
      {children}
    </Typography>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        styles.optionItem,
        isSelected && styles.selectedItem,
        isDisabled && styles.disabledItem,
        style,
      ]}
      onPress={() => !isDisabled && onPress?.(value)}>
      {content}
      {isSelected && <CheckIcon width={16} height={16} color="#666" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  text: {
    fontSize: 15,
    opacity: 0.8,
  },

  backdrop: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  options: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 12,
    maxHeight: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionItem: {
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 1,
  },
  disabledItem: {
    opacity: 0.5,
  },
  selectedItem: {
    backgroundColor: '#e8f0fe',
  },
  itemText: {
    fontSize: 14,
  },
  separator: {
    height: 4,
  },
});

export { Select as default };
