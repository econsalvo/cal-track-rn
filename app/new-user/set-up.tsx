import { useUpdateUserSettings } from '@/api/settings';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SetUp() {
    const [calories, setCalories] = useState('');
    const { userId } = useAuth();
    const router = useRouter();

    const mutation = useUpdateUserSettings();

    React.useEffect(() => {
        if (mutation.isError && mutation.error?.message?.includes('409')) {
            router.replace('/');
        }
    }, [mutation.isError, mutation.error, router]);

    const handleSubmit = useCallback(() => {
        if (!userId || !calories) { return; }
        mutation.mutate({
            clerkUserId: userId,
            defaultCalories: Number(calories),
        });
    }, [userId, calories, mutation]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Set Default Calories</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={calories}
                onChangeText={setCalories}
                placeholder="Enter calories"
            />
            <Button title="Save" onPress={handleSubmit} />
            {mutation.isPending && <Text>Saving...</Text>}
            {mutation.isError && <Text>Error saving settings.</Text>}
            {mutation.isSuccess && <Text>Settings saved!</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#F9FAFB',
    },
    label: {
        fontSize: 18,
        marginBottom: 12,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
});
