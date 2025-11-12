import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WithdrawScreen() {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const withdrawMethods = [
    {
      id: 'airtel',
      name: 'Airtel Money',
      logo: 'https://tse2.mm.bing.net/th/id/OIP.6Ez2Qv67HHzJcK7KN18rmQHaHb?rs=1&pid=ImgDetMain&o=7&rm=3',
      color: '#EF4444',
      description: 'Withdraw to Airtel Money wallet',
      fee: 'MK 50',
      processingTime: 'Instant'
    },
    {
      id: 'mpamba',
      name: 'Mpamba',
      logo: 'https://tse4.mm.bing.net/th/id/OIP.INvklK-sT51QgKuNJCH1AwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      color: '#10B981',
      description: 'Withdraw to TNM Mpamba',
      fee: 'MK 50',
      processingTime: 'Instant'
    },
    {
      id: 'agent',
      name: 'GreenWallet Agent',
      icon: 'store',
      iconLib: MaterialCommunityIcons,
      color: '#3B82F6',
      description: 'Withdraw cash from agent',
      fee: 'MK 100',
      processingTime: 'Find nearest agent'
    }
  ];

  const quickAmounts = ['1,000', '5,000', '10,000', '20,000', '50,000'];

  const handleWithdraw = async () => {
    if (!amount || !selectedMethod) {
      Alert.alert('Error', 'Please enter amount and select withdrawal method');
      return;
    }

    if (!phoneNumber && selectedMethod !== 'agent') {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    if (phoneNumber.length < 10 && selectedMethod !== 'agent') {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    const amountNum = parseFloat(amount.replace(/,/g, ''));
    if (amountNum < 500) {
      Alert.alert('Error', 'Minimum withdrawal amount is MK 500');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Withdrawal Successful',
        `MK ${amount} withdrawal to ${withdrawMethods.find(m => m.id === selectedMethod)?.name} is being processed`,
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    }, 2000);
  };

  const renderMethodIcon = (method: any) => {
    if (method.logo) {
      return (
        <Image 
          source={{ uri: method.logo }} 
          style={styles.methodLogo}
          resizeMode="contain"
        />
      );
    } else {
      const IconComponent = method.iconLib || Feather;
      return <IconComponent name={method.icon} size={24} color={method.color} />;
    }
  };

  const getSelectedMethod = () => {
    return withdrawMethods.find(method => method.id === selectedMethod);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#065F46" />
      
      {/* Header */}
      <LinearGradient
        colors={['#065F46', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <ThemedText style={styles.headerTitleText}>Withdraw Money</ThemedText>
            <ThemedText style={styles.headerSubtitle}>Choose withdrawal method</ThemedText>
          </View>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Amount Input */}
        <View style={styles.section}>
          <View style={styles.amountCard}>
            <ThemedText style={styles.amountLabel}>Enter Amount (MK)</ThemedText>
            <View style={styles.amountInputContainer}>
              <ThemedText style={styles.currencySymbol}>MK</ThemedText>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#94A3B8"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>

            {/* Quick Amount Buttons */}
            <View style={styles.quickAmounts}>
              {quickAmounts.map((quickAmount) => (
                <TouchableOpacity
                  key={quickAmount}
                  style={styles.quickAmountButton}
                  onPress={() => setAmount(quickAmount)}
                >
                  <ThemedText style={styles.quickAmountText}>MK {quickAmount}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Withdrawal Methods */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Withdrawal Methods</ThemedText>
          <View style={styles.methodsList}>
            {withdrawMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodItem,
                  selectedMethod === method.id && styles.methodItemSelected
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.methodInfo}>
                  <View style={[styles.methodIcon, { backgroundColor: `${method.color}15` }]}>
                    {renderMethodIcon(method)}
                  </View>
                  <View style={styles.methodDetails}>
                    <ThemedText style={styles.methodName}>{method.name}</ThemedText>
                    <ThemedText style={styles.methodDescription}>{method.description}</ThemedText>
                    <View style={styles.methodMeta}>
                      <ThemedText style={styles.methodFee}>Fee: {method.fee}</ThemedText>
                      <ThemedText style={styles.methodTime}>• {method.processingTime}</ThemedText>
                    </View>
                  </View>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedMethod === method.id && styles.radioButtonSelected
                ]}>
                  {selectedMethod === method.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Phone Number Input (for mobile money) */}
        {(selectedMethod === 'airtel' || selectedMethod === 'mpamba') && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              {selectedMethod === 'airtel' ? 'Airtel Money Number' : 'Mpamba Number'}
            </ThemedText>
            <View style={styles.phoneInputContainer}>
              <Feather name="phone" size={20} color="#64748B" style={styles.phoneIcon} />
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter your phone number"
                placeholderTextColor="#94A3B8"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        )}

        {/* Agent Instructions */}
        {selectedMethod === 'agent' && (
          <View style={styles.section}>
            <View style={styles.agentInfoCard}>
              <Feather name="info" size={20} color="#3B82F6" />
              <View style={styles.agentInfoText}>
                <ThemedText style={styles.agentInfoTitle}>Visit a GreenWallet Agent</ThemedText>
                <ThemedText style={styles.agentInfoDescription}>
                  Withdraw cash from any authorized GreenWallet agent in your area. 
                  Present your ID and phone number to complete the transaction.
                </ThemedText>
              </View>
            </View>
          </View>
        )}

        {/* Withdrawal Summary */}
        {selectedMethod && amount && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Withdrawal Summary</ThemedText>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Amount</ThemedText>
                <ThemedText style={styles.summaryValue}>MK {amount}</ThemedText>
              </View>
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Withdrawal Fee</ThemedText>
                <ThemedText style={styles.summaryValue}>
                  {getSelectedMethod()?.fee}
                </ThemedText>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryTotalLabel}>Total Deducted</ThemedText>
                <ThemedText style={styles.summaryTotalValue}>
                  MK {(parseFloat(amount.replace(/,/g, '')) + 
                    (getSelectedMethod()?.id === 'agent' ? 100 : 50)).toLocaleString()}
                </ThemedText>
              </View>
            </View>
          </View>
        )}

        {/* Withdraw Button */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={[
              styles.withdrawButton,
              (!amount || !selectedMethod || (selectedMethod !== 'agent' && !phoneNumber)) && styles.withdrawButtonDisabled
            ]}
            onPress={handleWithdraw}
            disabled={!amount || !selectedMethod || (selectedMethod !== 'agent' && !phoneNumber) || isLoading}
          >
            <LinearGradient
              colors={['#065F46', '#059669']}
              style={styles.withdrawGradient}
            >
              {isLoading ? (
                <Feather name="loader" size={20} color="#FFF" />
              ) : (
                <Feather name="arrow-up-circle" size={20} color="#FFF" />
              )}
              <ThemedText style={styles.withdrawButtonText}>
                {isLoading ? 'Processing...' : 'Withdraw Money'}
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Security Note */}
        <View style={styles.section}>
          <View style={styles.securityCard}>
            <Feather name="shield" size={16} color="#059669" />
            <ThemedText style={styles.securityText}>
              Your transaction is secure and encrypted
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomRightRadius: 70,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitleText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#A7F3D0',
    fontSize: 14,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    marginTop: -20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  amountCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 16,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#059669',
    paddingBottom: 12,
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: '#064E3B',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: '700',
    color: '#064E3B',
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickAmountButton: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  quickAmountText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#064E3B',
    marginBottom: 16,
  },
  methodsList: {
    gap: 12,
  },
  methodItem: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  methodItemSelected: {
    borderWidth: 2,
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  methodLogo: {
    width: 30,
    height: 30,
  },
  methodDetails: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  methodMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodFee: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  methodTime: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#059669',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#059669',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  phoneIcon: {
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#064E3B',
  },
  agentInfoCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  agentInfoText: {
    flex: 1,
  },
  agentInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 4,
  },
  agentInfoDescription: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  summaryCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#064E3B',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
  },
  withdrawButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  withdrawButtonDisabled: {
    opacity: 0.5,
  },
  withdrawGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  withdrawButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
  },
  securityText: {
    fontSize: 12,
    color: '#64748B',
  },
});