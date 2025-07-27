import { Stack } from 'expo-router';

export default function AppStack() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="new-user/set-up" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}