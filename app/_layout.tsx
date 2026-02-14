import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';
import * as Font from 'expo-font';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { UIModeProvider } from '@/contexts/ui-mode-context';
import { FontProvider, FONTS, type FontKey } from '@/contexts/font-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

async function loadFonts() {
  await Font.loadAsync({
    'IBMPlexMono': require('../assets/fonts/IBMPlexMono-Regular.ttf'),
    'CascadiaCode': require('../assets/fonts/CascadiaCode-Regular.ttf'),
    'FiraCode': require('../assets/fonts/FiraCode-Regular.ttf'),
    'Hack': require('../assets/fonts/Hack-Regular.ttf'),
    'Inconsolata': require('../assets/fonts/Inconsolata-Regular.ttf'),
    'IntelOneMono': require('../assets/fonts/IntelOneMono-Regular.ttf'),
    'JetBrainsMono': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
    'MesloLGS': require('../assets/fonts/MesloLGS-Regular.ttf'),
    'RobotoMono': require('../assets/fonts/RobotoMono-Regular.ttf'),
    'SourceCodePro': require('../assets/fonts/SourceCodePro-Regular.ttf'),
    'UbuntuMono': require('../assets/fonts/UbuntuMono-Regular.ttf'),
  });
}

function FontLoader({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    loadFonts();
  }, []);

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <FontProvider>
      <FontLoader>
        <UIModeProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </UIModeProvider>
      </FontLoader>
    </FontProvider>
  );
}
