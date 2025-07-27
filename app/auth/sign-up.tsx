import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSignUp, useOAuth } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();
    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState('');

    // Google OAuth
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

    const onSignUpPress = async () => {
        if (!isLoaded) {return;}
        try {
            await signUp.create({
                emailAddress,
                password,
            });
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setPendingVerification(true);
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded) {return;}
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            });
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace('/');
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    // Handler for Google OAuth
    const onGoogleSignUp = async () => {
        try {
            const { createdSessionId, setActive: setOAuthActive } = await startOAuthFlow();
            if (createdSessionId && setOAuthActive) {
                await setOAuthActive({ session: createdSessionId });
                router.replace('/');
            }
        } catch (err) {
            console.error('Google OAuth error:', err);
        }
    };

    if (pendingVerification) {
        return (
            <>
                <Text>Verify your email</Text>
                <TextInput
                    value={code}
                    placeholder="Enter your verification code"
                    onChangeText={(code) => setCode(code)}
                />
                <TouchableOpacity onPress={onVerifyPress}>
                    <Text>Verify</Text>
                </TouchableOpacity>
            </>
        );
    }

    return (
        <View>
            <>
                <Text>Sign up</Text>
                <TouchableOpacity onPress={onGoogleSignUp} style={{ marginBottom: 16 }}>
                    <Text>Continue with Google</Text>
                </TouchableOpacity>
                <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter email"
                    onChangeText={(email) => setEmailAddress(email)}
                />
                <TextInput
                    value={password}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <TouchableOpacity onPress={onSignUpPress}>
                    <Text>Continue</Text>
                </TouchableOpacity>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                    <Text>Already have an account?</Text>
                    <Link href="/auth/sign-in">
                        <Text>Sign in</Text>
                    </Link>
                </View>
            </>
        </View>
    );
}