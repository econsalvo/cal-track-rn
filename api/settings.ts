import { useAuth } from '@clerk/clerk-expo';
import { useMutation, useQuery } from '@tanstack/react-query';
import { client } from './client';


interface UserSettings {
    clerkUserId: string;
    defaultCalories: number | null;
}

export const useUserSettings = () => {
    const { userId, isLoaded } = useAuth();

    return useQuery({
        queryKey: ['user-settings', userId],
        queryFn: () => {
            return client.get<UserSettings>(`/settings/${userId}`);
        },
        enabled: isLoaded && !!userId,
    });
};

export const useUpdateUserSettings = () => {
    return useMutation({
        mutationFn: (data: UserSettings) =>
            client.post<UserSettings>(
                `/settings`,
                { defaultCalories: data.defaultCalories, clerkUserId: data.clerkUserId }),
    });
};