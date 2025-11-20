import { ThemedText } from '@/components/themed-text';
import { useOAuth } from '@clerk/clerk-expo';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onGoogleSignInPress = async () => {
    setIsGoogleLoading(true);

    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      console.error('OAuth error:', err);
      if (err.message?.includes('cancelled')) {
        Alert.alert('Cancelled', 'Google sign in was cancelled');
      } else {
        Alert.alert('Error', 'Failed to sign in with Google');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const onSignInPress = async () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please enter both phone number and password');
      return;
    }

    // Basic phone number validation
    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (phoneNumber && password) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality will be implemented here.');
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#065F46" />
      
      {/* Header Section */}
      <LinearGradient
        colors={['#065F46', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <FontAwesome5 name="leaf" size={32} color="#FFF" />
            </View>
            <ThemedText style={styles.appName}>GreenWallet</ThemedText>
            <ThemedText style={styles.appTagline}>
              Digital Finance for Farmers
            </ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Login Form */}
        <View style={styles.section}>
          <View style={styles.formCard}>
            {/* Phone Number Input */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Phone Number</ThemedText>
              <View style={styles.inputContainer}>
                <Feather name="phone" size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#94A3B8"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Password</ThemedText>
              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.visibilityToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather 
                    name={showPassword ? 'eye' : 'eye-off'} 
                    size={20} 
                    color="#64748B" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity 
              style={styles.forgotPasswordLink}
              onPress={handleForgotPassword}
            >
              <ThemedText style={styles.forgotPasswordText}>
                Forgot Password?
              </ThemedText>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity 
              style={[
                styles.signInButton,
                isLoading && styles.signInButtonDisabled
              ]}
              onPress={onSignInPress}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['#065F46', '#059669']}
                style={styles.signInGradient}
              >
                {isLoading ? (
                  <Feather name="loader" size={20} color="#FFF" />
                ) : (
                  <Feather name="log-in" size={20} color="#FFF" />
                )}
                <ThemedText style={styles.signInButtonText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <ThemedText style={styles.dividerText}>OR</ThemedText>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Sign-In Button */}
            <TouchableOpacity 
              style={[
                styles.googleButton, 
                isGoogleLoading && styles.googleButtonDisabled
              ]} 
              onPress={onGoogleSignInPress}
              disabled={isGoogleLoading}
            >
              <Image
                source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                style={styles.googleIcon}
              />
              <ThemedText style={styles.googleButtonText}>
                {isGoogleLoading ? 'Connecting...' : 'Sign in with Google'}
              </ThemedText>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <ThemedText style={styles.signUpText}>
                Don't have an account?{' '}
              </ThemedText>
              <TouchableOpacity onPress={handleSignUp}>
                <ThemedText style={styles.signUpLink}>
                  Sign Up
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  appTagline: {
    color: '#A7F3D0',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: -40,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
    marginTop: 30,
  },
  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#064E3B',
  },
  visibilityToggle: {
    padding: 4,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  signInButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  signInButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  googleButtonDisabled: {
    opacity: 0.7,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#64748B',
    fontSize: 14,
  },
  signUpLink: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
});