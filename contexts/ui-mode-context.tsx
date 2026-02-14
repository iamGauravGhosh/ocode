import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UIMode = 'gui' | 'tui';

interface UIModeContextType {
  mode: UIMode;
  setMode: (mode: UIMode) => void;
  isLoading: boolean;
}

const UIModeContext = createContext<UIModeContextType | undefined>(undefined);

const UI_MODE_STORAGE_KEY = 'ui-mode';

export function UIModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<UIMode>('gui');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedMode();
  }, []);

  const loadSavedMode = async () => {
    try {
      const savedMode = await AsyncStorage.getItem(UI_MODE_STORAGE_KEY);
      if (savedMode === 'gui' || savedMode === 'tui') {
        setModeState(savedMode);
      }
    } catch (error) {
      console.error('Error loading UI mode:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setMode = async (newMode: UIMode) => {
    try {
      await AsyncStorage.setItem(UI_MODE_STORAGE_KEY, newMode);
      setModeState(newMode);
    } catch (error) {
      console.error('Error saving UI mode:', error);
    }
  };

  return (
    <UIModeContext.Provider value={{ mode, setMode, isLoading }}>
      {children}
    </UIModeContext.Provider>
  );
}

export function useUIMode() {
  const context = useContext(UIModeContext);
  if (context === undefined) {
    throw new Error('useUIMode must be used within a UIModeProvider');
  }
  return context;
}
