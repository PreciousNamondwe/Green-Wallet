import { useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';

export default function OAuthCallback() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const handleOAuthCallback = async () => {
      try {
       
        if (signIn && signIn.status === 'needs_second_factor') {
          
          await signIn.reload();
          
          if (signIn.status === 'complete') {
            await setActive({ session: signIn.createdSessionId });
            router.replace('/tabs)'); 
            return;
          }
        }
        router.replace('/(tabs)');
        
      } catch (err) {
        console.error('OAuth callback error:', err);
        router.replace('/(tabs)');
      }
    };

    handleOAuthCallback();
  }, [isLoaded, signIn, setActive, router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Completing sign in...</Text>
    </View>
  );
}