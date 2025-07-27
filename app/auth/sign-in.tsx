import { useSignIn, useSSO } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function SignInPage() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const { startSSOFlow } = useSSO();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onSignInPress = async () => {
        if (!isLoaded) {return;}
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/');
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    // Google SSO handler
    const onGoogleSignIn = async () => {
        try {
            const { createdSessionId, setActive: setSSOActive } = await startSSOFlow({ strategy: 'oauth_google' });
            if (createdSessionId && setSSOActive) {
                await setSSOActive({ session: createdSessionId });
                router.replace('/');
            }
        } catch (err) {
            console.error('Google SSO error:', err);
        }
    };

    return (
        <View>
            <Text>Sign in</Text>
            <TouchableOpacity onPress={onGoogleSignIn} style={{ marginBottom: 16 }}>
                <Text>Continue with Google</Text>
            </TouchableOpacity>
            <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Enter email"
                onChangeText={setEmailAddress}
            />
            <TextInput
                value={password}
                placeholder="Enter password"
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={onSignInPress}>
                <Text>Continue</Text>
            </TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                <Link href="/auth/sign-up">
                    <Text>Sign up</Text>
                </Link>
            </View>
        </View>
    );
}