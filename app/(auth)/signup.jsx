import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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
  const [verificationStep, setVerificationStep] = useState(1); // 1: Phone input, 2: OTP verification
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      // You would need to add refs to the OTP inputs for this to work
    }
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
    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return false;
    }

    // Password validation
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const sendOtp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate OTP sending
    setTimeout(() => {
      setVerificationStep(2);
      setIsLoading(false);
      Alert.alert('OTP Sent', `Verification code sent to ${formData.phoneNumber}`);
    }, 1500);
  };

  const verifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit verification code');
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success', 
        'Account created successfully!',
        [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
      );
    }, 1500);
  };

  const handleLogin = () => {
    router.back();
  };

  const renderPhoneInputStep = () => (
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
            placeholder="Enter your phone number"
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
            placeholder="Create a password"
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

      {/* Send OTP Button */}
      <TouchableOpacity 
        style={[
          styles.signUpButton,
          isLoading && styles.signUpButtonDisabled
        ]}
        onPress={sendOtp}
        disabled={isLoading}
      >
        <LinearGradient
          colors={['#065F46', '#059669']}
          style={styles.signUpGradient}
        >
          {isLoading ? (
            <Feather name="loader" size={20} color="#FFF" />
          ) : (
            <Feather name="send" size={20} color="#FFF" />
          )}
          <ThemedText style={styles.signUpButtonText}>
            {isLoading ? 'Sending OTP...' : 'Send Verification Code'}
          </ThemedText>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );

  const renderOtpVerificationStep = () => (
    <>
      <View style={styles.otpHeader}>
        <Feather name="shield" size={48} color="#059669" />
        <ThemedText style={styles.otpTitle}>Verify Your Phone</ThemedText>
        <ThemedText style={styles.otpSubtitle}>
          Enter the 6-digit code sent to{'\n'}
          <ThemedText style={styles.phoneNumber}>{formData.phoneNumber}</ThemedText>
        </ThemedText>
      </View>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      {/* Resend OTP */}
      <TouchableOpacity style={styles.resendContainer}>
        <ThemedText style={styles.resendText}>
          Didn't receive the code?{' '}
        </ThemedText>
        <ThemedText style={styles.resendLink}>
          Resend OTP
        </ThemedText>
      </TouchableOpacity>

      {/* Verify Button */}
      <TouchableOpacity 
        style={[
          styles.signUpButton,
          isLoading && styles.signUpButtonDisabled
        ]}
        onPress={verifyOtp}
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
            {isLoading ? 'Verifying...' : 'Verify & Create Account'}
          </ThemedText>
        </LinearGradient>
      </TouchableOpacity>

      {/* Back to phone input */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setVerificationStep(1)}
      >
        <Feather name="arrow-left" size={16} color="#059669" />
        <ThemedText style={styles.backButtonText}>
          Change Phone Number
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
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <FontAwesome5 name="leaf" size={32} color="#FFF" />
            </View>
            <ThemedText style={styles.appName}>GreenWallet</ThemedText>
            <ThemedText style={styles.appTagline}>
              {verificationStep === 1 ? 'Create Your Account' : 'Verify Phone Number'}
            </ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <View style={styles.formCard}>
            {verificationStep === 1 ? renderPhoneInputStep() : renderOtpVerificationStep()}

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
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
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
  // OTP Verification Styles
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
    color: '#064E3B',
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