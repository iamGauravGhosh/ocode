import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Modal } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUIMode } from '@/contexts/ui-mode-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function SettingsScreen() {
  const { mode, setMode } = useUIMode();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const options = [
    { value: 'gui', label: 'GUI (Graphical)' },
    { value: 'tui', label: 'TUI (Terminal)' },
  ];

  const handleSelect = (value: 'gui' | 'tui') => {
    setMode(value);
    setDropdownVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Settings</ThemedText>
      
      <ThemedView style={styles.settingItem}>
        <ThemedText type="defaultSemiBold">UI Mode</ThemedText>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownVisible(true)}>
          <ThemedText>
            {mode === 'gui' ? 'GUI (Graphical)' : 'TUI (Terminal)'}
          </ThemedText>
          <IconSymbol name="chevron.right" size={20} color="#666" />
        </TouchableOpacity>
      </ThemedView>

      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}>
          <ThemedView style={styles.dropdownMenu}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  mode === option.value && styles.selectedOption,
                ]}
                onPress={() => handleSelect(option.value as 'gui' | 'tui')}>
                <ThemedText
                  style={mode === option.value ? styles.selectedText : undefined}>
                  {option.label}
                </ThemedText>
                {mode === option.value && (
                  <View style={styles.dot} />
                )}
              </TouchableOpacity>
            ))}
          </ThemedView>
        </TouchableOpacity>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    marginBottom: 30,
  },
  settingItem: {
    gap: 10,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdownMenu: {
    width: '100%',
    maxWidth: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  selectedOption: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  selectedText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
});
