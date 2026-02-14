import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FONTS = {
  'ibm-plex-mono': { name: 'IBM Plex Mono', family: 'IBMPlexMono' },
  'cascadia-code': { name: 'Cascadia Code', family: 'CascadiaCode' },
  'fira-code': { name: 'Fira Code', family: 'FiraCode' },
  'hack': { name: 'Hack', family: 'Hack' },
  'inconsolata': { name: 'Inconsolata', family: 'Inconsolata' },
  'intel-one-mono': { name: 'Intel One Mono', family: 'IntelOneMono' },
  'jetbrains-mono': { name: 'JetBrains Mono', family: 'JetBrainsMono' },
  'meslo-lgs': { name: 'Meslo LGS', family: 'MesloLGS' },
  'roboto-mono': { name: 'Roboto Mono', family: 'RobotoMono' },
  'source-code-pro': { name: 'Source Code Pro', family: 'SourceCodePro' },
  'ubuntu-mono': { name: 'Ubuntu Mono', family: 'UbuntuMono' },
} as const;

export type FontKey = keyof typeof FONTS;

type FontContextType = {
  selectedFont: FontKey;
  setSelectedFont: (font: FontKey) => void;
  isLoading: boolean;
  getFontFamily: () => string;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

const FONT_STORAGE_KEY = 'selected-font';

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [selectedFont, setSelectedFontState] = useState<FontKey>('ibm-plex-mono');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedFont();
  }, []);

  const loadSavedFont = async () => {
    try {
      const savedFont = await AsyncStorage.getItem(FONT_STORAGE_KEY);
      if (savedFont && savedFont in FONTS) {
        setSelectedFontState(savedFont as FontKey);
      }
    } catch (error) {
      console.error('Error loading font preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setSelectedFont = async (font: FontKey) => {
    try {
      await AsyncStorage.setItem(FONT_STORAGE_KEY, font);
      setSelectedFontState(font);
    } catch (error) {
      console.error('Error saving font preference:', error);
    }
  };

  const getFontFamily = () => {
    return FONTS[selectedFont].family;
  };

  return (
    <FontContext.Provider value={{ selectedFont, setSelectedFont, isLoading, getFontFamily }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
}
