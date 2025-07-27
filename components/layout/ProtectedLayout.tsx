import { useUserSettings } from "@/api/settings";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, useSegments } from "expo-router";

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { isLoaded, isSignedIn } = useAuth();
    const { data: userSettings, isLoading: settingLoading } = useUserSettings();
    const segments = useSegments();

    if (!isLoaded
        || settingLoading
    ) { return null; }

    if (!isSignedIn && segments[0] !== 'auth') {
        return <Redirect href="/auth/sign-in" />;
    } else if (!userSettings?.defaultCalories && segments[0] !== 'new-user') {
        return <Redirect href="/new-user/set-up" />;
    }

    return <>{children}</>;
}