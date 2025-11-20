import { ThemedText } from '@/components/themed-text';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
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

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(1); // 1: Registration, 2: Phone verification
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Generate a random 6-digit verification code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const validateForm = () => {
    const { fullName, email, phoneNumber, password, confirmPassword } = formData;

    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    // Phone number validation
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (!phoneRegex.test(phoneNumber) || phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return false;
    }

    // Password validation
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Generate a fake verification code
      const fakeCode = generateVerificationCode();
      setGeneratedCode(fakeCode);
      
      // Simulate API delay
      setTimeout(() => {
        setVerificationStep(2);
        setIsLoading(false);
        
        // Show the code in development for testing
        if (__DEV__) {
          Alert.alert(
            'Verification Code Sent', 
            `A verification code has been sent to ${formData.phoneNumber}\n\nDevelopment Code: ${fakeCode}`,
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert(
            'Verification Code Sent', 
            `A verification code has been sent to ${formData.phoneNumber}`,
            [{ text: 'OK' }]
          );
        }
      }, 1500);

    } catch (err) {
      console.error('Sign up error:', err);
      Alert.alert('Error', 'Failed to create account. Please try again.');
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!code) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    setIsLoading(true);

    // Simulate verification process
    setTimeout(() => {
      if (code === generatedCode) {
        // Success - create account
        Alert.alert(
          'Success', 
          'Account created successfully! Welcome to GreenWallet!',
          [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
        );
      } else {
        Alert.alert('Error', 'Invalid verification code. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const resendVerificationCode = async () => {
    const newCode = generateVerificationCode();
    setGeneratedCode(newCode);
    
    // Show the new code in development for testing
    if (__DEV__) {
      Alert.alert(
        'New Code Sent', 
        `A new verification code has been sent to your phone.\n\nDevelopment Code: ${newCode}`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('Code Sent', 'A new verification code has been sent to your phone.');
    }
  };

  const handleLogin = () => {
    router.back();
  };

  // Auto-fill code for testing in development
  const autoFillCode = () => {
    if (__DEV__ && generatedCode) {
      setCode(generatedCode);
    }
  };

  const renderRegistrationStep = () => (
    <>
      {/* Full Name Input */}
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Full Name</ThemedText>
        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#64748B" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your full name"
            placeholderTextColor="#94A3B8"
            value={formData.fullName}
            onChangeText={(value) => handleInputChange('fullName', value)}
            autoCapitalize="words"
          />
        </View>
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Email Address</ThemedText>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#64748B" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email address"
            placeholderTextColor="#94A3B8"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Phone Number</ThemedText>
        <View style={styles.inputContainer}>
          <Feather name="phone" size={20} color="#64748B" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="+265 XXX XXX XXX"
            placeholderTextColor="#94A3B8"
            value={formData.phoneNumber}
            onChangeText={(value) => handleInputChange('phoneNumber', value)}
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
            placeholder="Create a password (min. 8 characters)"
            placeholderTextColor="#94A3B8"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
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

      {/* Confirm Password Input */}
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Confirm Password</ThemedText>
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#64748B" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm your password"
            placeholderTextColor="#94A3B8"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity 
            style={styles.visibilityToggle}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Feather 
              name={showConfirmPassword ? 'eye' : 'eye-off'} 
              size={20} 
              color="#64748B" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity 
        style={[
          styles.signUpButton,
          isLoading && styles.signUpButtonDisabled
        ]}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        <LinearGradient
          colors={['#065F46', '#059669']}
          style={styles.signUpGradient}
        >
          {isLoading ? (
            <Feather name="loader" size={20} color="#FFF" />
          ) : (
            <Feather name="user-plus" size={20} color="#FFF" />
          )}
          <ThemedText style={styles.signUpButtonText}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </ThemedText>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );

  const renderVerificationStep = () => (
    <>
      <View style={styles.otpHeader}>
        <Feather name="shield" size={48} color="#059669" />
        <ThemedText style={styles.otpTitle}>Verify Your Phone</ThemedText>
        <ThemedText style={styles.otpSubtitle}>
          Enter the verification code sent to{'\n'}
          <ThemedText style={styles.phoneNumber}>{formData.phoneNumber}</ThemedText>
        </ThemedText>
        
        {/* Development Helper - Show code in development */}
        {__DEV__ && generatedCode && (
          <View style={styles.devHelper}>
            <ThemedText style={styles.devHelperText}>
              Development Code: {generatedCode}
            </ThemedText>
            <TouchableOpacity onPress={autoFillCode} style={styles.autoFillButton}>
              <ThemedText style={styles.autoFillText}>Auto-fill</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Verification Code Input */}
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Verification Code</ThemedText>
        <View style={styles.inputContainer}>
          <Feather name="key" size={20} color="#64748B" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter 6-digit code"
            placeholderTextColor="#94A3B8"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>
      </View>

      {/* Resend Code */}
      <TouchableOpacity 
        style={styles.resendContainer}
        onPress={resendVerificationCode}
      >
        <ThemedText style={styles.resendText}>
          Didn't receive the code?{' '}
        </ThemedText>
        <ThemedText style={styles.resendLink}>
          Resend Code
        </ThemedText>
      </TouchableOpacity>

      {/* Verify Button */}
      <TouchableOpacity 
        style={[
          styles.signUpButton,
          isLoading && styles.signUpButtonDisabled
        ]}
        onPress={handleVerification}
        disabled={isLoading}
      >
        <LinearGradient
          colors={['#065F46', '#059669']}
          style={styles.signUpGradient}
        >
          {isLoading ? (
            <Feather name="loader" size={20} color="#FFF" />
          ) : (
            <Feather name="check-circle" size={20} color="#FFF" />
          )}
          <ThemedText style={styles.signUpButtonText}>
            {isLoading ? 'Verifying...' : 'Verify & Continue'}
          </ThemedText>
        </LinearGradient>
      </TouchableOpacity>

      {/* Back to registration */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setVerificationStep(1)}
      >
        <Feather name="arrow-left" size={16} color="#059669" />
        <ThemedText style={styles.backButtonText}>
          Back to Registration
        </ThemedText>
      </TouchableOpacity>
    </>
  );

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
          <TouchableOpacity 
            style={styles.backButtonHeader}
            onPress={() => verificationStep === 1 ? router.back() : setVerificationStep(1)}
          >
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <FontAwesome5 name="leaf" size={32} color="#FFF" />
            </View>
            <ThemedText style={styles.appName}>GreenWallet</ThemedText>
            <ThemedText style={styles.appTagline}>
              {verificationStep === 1 ? 'Create Your Account' : 'Verify Phone Number'}
            </ThemedText>
          </View>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <View style={styles.formCard}>
            {verificationStep === 1 ? renderRegistrationStep() : renderVerificationStep()}

            {/* Login Link */}
            {verificationStep === 1 && (
              <View style={styles.loginContainer}>
                <ThemedText style={styles.loginText}>
                  Already have an account?{' '}
                </ThemedText>
                <TouchableOpacity onPress={handleLogin}>
                  <ThemedText style={styles.loginLink}>
                    Sign In
                  </ThemedText>
                </TouchableOpacity>
              </View>
            )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButtonHeader: {
    padding: 8,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
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
  placeholder: {
    width: 40,
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
  signUpButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 8,
  },
  signUpButtonDisabled: {
    opacity: 0.7,
  },
  signUpGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#64748B',
    fontSize: 14,
  },
  loginLink: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  // Verification Styles
  otpHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  otpTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#064E3B',
    marginTop: 16,
    marginBottom: 8,
  },
  otpSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  phoneNumber: {
    fontWeight: '600',
    color: '#064E3B',
  },
  devHelper: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  devHelperText: {
    color: '#92400E',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  autoFillButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  autoFillText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  resendText: {
    color: '#64748B',
    fontSize: 14,
  },
  resendLink: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  backButtonText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
});