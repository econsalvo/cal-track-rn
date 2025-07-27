import AppStack from "@/components/layout/AppStack";
import { ProtectedLayout } from "@/components/layout/ProtectedLayout";
import "@/global.css";
import { useColorScheme } from '@/hooks/useColorScheme';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider tokenCache={tokenCache}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'lightgray' } }}>
          <ProtectedLayout>
            <SafeAreaView className="flex-1">
              <AppStack />
            </SafeAreaView>
          </ProtectedLayout>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}