import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Modal } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUIMode } from '@/contexts/ui-mode-context';
import { useFont, FONTS, type FontKey } from '@/contexts/font-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function SettingsScreen() {
  const { mode, setMode } = useUIMode();
  const { selectedFont, setSelectedFont } = useFont();
  const [uiModeDropdownVisible, setUIModeDropdownVisible] = useState(false);
  const [fontDropdownVisible, setFontDropdownVisible] = useState(false);

  const uiModeOptions = [
    { value: 'gui', label: 'GUI (Graphical)' },
    { value: 'tui', label: 'TUI (Terminal)' },
  ];

  const fontOptions = Object.entries(FONTS).map(([key, value]) => ({
    value: key as FontKey,
    label: value.name,
  }));

  const handleUIModeSelect = (value: 'gui' | 'tui') => {
    setMode(value);
    setUIModeDropdownVisible(false);
  };

  const handleFontSelect = (value: FontKey) => {
    setSelectedFont(value);
    setFontDropdownVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Settings</ThemedText>
      
      <ThemedView style={styles.settingItem}>
        <ThemedText type="defaultSemiBold">UI Mode</ThemedText>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setUIModeDropdownVisible(true)}>
          <ThemedText>
            {mode === 'gui' ? 'GUI (Graphical)' : 'TUI (Terminal)'}
          </ThemedText>
          <IconSymbol name="chevron.right" size={20} color="#666" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.settingItem}>
        <ThemedText type="defaultSemiBold">Font Family</ThemedText>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setFontDropdownVisible(true)}>
          <ThemedText>
            {FONTS[selectedFont].name}
          </ThemedText>
          <IconSymbol name="chevron.right" size={20} color="#666" />
        </TouchableOpacity>
      </ThemedView>

      {/* UI Mode Modal */}
      <Modal
        visible={uiModeDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setUIModeDropdownVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setUIModeDropdownVisible(false)}>
          <ThemedView style={styles.dropdownMenu}>
            {uiModeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  mode === option.value && styles.selectedOption,
                ]}
                onPress={() => handleUIModeSelect(option.value as 'gui' | 'tui')}>
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

      {/* Font Selection Modal */}
      <Modal
        visible={fontDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFontDropdownVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setFontDropdownVisible(false)}>
          <ThemedView style={[styles.dropdownMenu, styles.fontDropdownMenu]}>
            {fontOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  selectedFont === option.value && styles.selectedOption,
                ]}
                onPress={() => handleFontSelect(option.value)}>
                <ThemedText
                  style={[
                    selectedFont === option.value ? styles.selectedText : undefined,
                    { fontFamily: FONTS[option.value].family }
                  ]}>
                  {option.label}
                </ThemedText>
                {selectedFont === option.value && (
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
    marginBottom: 20,
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
  fontDropdownMenu: {
    maxHeight: 400,
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
