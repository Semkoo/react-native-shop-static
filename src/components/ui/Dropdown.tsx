import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Typography } from './Typography';

export type OptionItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

interface DropdownProps {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  placeholder: string;
  value?: string;
  disabled?: boolean;
}

interface DropdownRootProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled?: boolean;
}

interface DropdownTriggerProps {
  children: React.ReactNode;
}

interface DropdownContentProps {
  children: React.ReactNode;
}

interface DropdownItemProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  onSelect?: () => void;
  selected?: boolean;
}

// Root component
const DropdownRoot = ({ children, open, onOpenChange, disabled }: DropdownRootProps) => {
  const buttonRef = useRef<View>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const handleOpen = useCallback(() => {
    if (!disabled) {
      buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setDropdownPosition({
          top: pageY + height,
          left: pageX,
          width: width,
        });
        onOpenChange(true);
      });
    }
  }, [disabled, onOpenChange]);

  return (
    <DropdownContext.Provider
      value={{
        open,
        onOpenChange,
        buttonRef,
        dropdownPosition,
        handleOpen,
        disabled,
      }}>
      {children}
    </DropdownContext.Provider>
  );
};

// Trigger component
const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  const { buttonRef, handleOpen, disabled } = useDropdown();

  return (
    <View ref={buttonRef}>
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        activeOpacity={0.8}
        onPress={handleOpen}
        disabled={disabled}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

// Content component
const DropdownContent = ({ children }: DropdownContentProps) => {
  const { open, onOpenChange, dropdownPosition } = useDropdown();

  return (
    <Modal visible={open} transparent>
      <TouchableWithoutFeedback onPress={() => onOpenChange(false)}>
        <View style={styles.backdrop}>
          <View
            style={[
              styles.options,
              {
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
              },
            ]}>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Item component
const DropdownItem = ({ children, disabled, onSelect, selected }: DropdownItemProps) => {
  const { onOpenChange } = useDropdown();

  const handlePress = () => {
    if (!disabled && onSelect) {
      onSelect();
      onOpenChange(false);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.optionItem,
        selected && styles.selectedOption,
        disabled && styles.disabledOption,
      ]}
      onPress={handlePress}
      disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};

// Context
type DropdownContextType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buttonRef: React.RefObject<View>;
  dropdownPosition: { top: number; left: number; width: number };
  handleOpen: () => void;
  disabled?: boolean;
};

const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined);

const useDropdown = () => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be wrapped in <Dropdown.Root>');
  }
  return context;
};

// Compose the components
export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  optionItem: {
    padding: 16,
    backgroundColor: '#fff',
  },
  selectedOption: {
    backgroundColor: '#f0f9ff',
  },
  selectedText: {
    color: '#0066cc',
  },
  disabledOption: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  options: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 300,
  },
});
