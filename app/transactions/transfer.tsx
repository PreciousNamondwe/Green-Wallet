import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  Image
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Bank data with logo URLs (using placeholder images - replace with actual logos)
const banks = [
  {
    id: 1,
    name: 'FDH Bank',
    code: 'FDH',
    logo: 'https://tse3.mm.bing.net/th/id/OIP.e2kLRxCoHc4J_KqfX-3CVQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
    color: '#EF4444'
  },
  {
    id: 2,
    name: 'National Bank',
    code: 'NB',
    logo: 'https://th.bing.com/th/id/R.95bdaed43aca7cb79aa7a0f95a059fda?rik=dB7AprXUHQm%2brA&pid=ImgRaw&r=0',
    color: '#3B82F6'
  },
  {
    id: 3,
    name: 'Ecobank',
    code: 'ECO',
    logo: 'https://tse3.mm.bing.net/th/id/OIP.yRYHYW2T04YJdLWvRHNMlgHaED?rs=1&pid=ImgDetMain&o=7&rm=3',
    color: '#10B981'
  },
  {
    id: 4,
    name: 'Standard Bank',
    code: 'SB',
    logo: 'https://tse2.mm.bing.net/th/id/OIP.9FhPbX7V6Ja6_wQTd1artAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    color: '#8B5CF6'
  },
  {
    id: 5,
    name: 'First Merchant Bank',
    code: 'FMB',
    logo: 'https://th.bing.com/th/id/R.2cddbb3da713e983ff9cecccdb681360?rik=z1BgZydTMDxO5g&pid=ImgRaw&r=0',
    color: '#F59E0B'
  },
  {
    id: 6,
    name: 'NBS Bank',
    code: 'NBS',
    logo: 'https://th.bing.com/th/id/R.52b533311147186545de66dc120858ad?rik=C%2beot3ccPgPmTg&pid=ImgRaw&r=0',
    color: '#06B6D4'
  },
];

export default function TransferScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const router = useRouter();

  // Filter banks based on search query
  const filteredBanks = banks.filter(bank =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bank.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    // Navigate to transfer details page or show account input
    // For now, just show selection
    setTimeout(() => {
      router.push({
        pathname: '/transactions/transfer',
        params: { bank: JSON.stringify(bank) }
      });
    }, 500);
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
            <ThemedText style={styles.headerTitleText}>Transfer Money</ThemedText>
            <ThemedText style={styles.headerSubtitle}>Select a bank to transfer to</ThemedText>
          </View>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Section */}
        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#64748B" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search banks..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Feather name="x" size={20} color="#64748B" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* All Banks List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>All Banks</ThemedText>
          </View>

          <View style={styles.banksList}>
            {filteredBanks.map((bank) => (
              <TouchableOpacity 
                key={bank.id}
                style={[
                  styles.bankItem,
                  selectedBank?.id === bank.id && styles.bankItemSelected
                ]}
                onPress={() => handleBankSelect(bank)}
              >
                <View style={styles.bankInfo}>
                  <View style={[styles.bankLogo, { backgroundColor: `${bank.color}15` }]}>
                    {bank.logo ? (
                      <Image 
                        source={{ uri: bank.logo }} 
                        style={styles.bankLogoImage}
                        resizeMode="contain"
                      />
                    ) : (
                      <ThemedText style={[styles.bankLogoText, { color: bank.color }]}>
                        {bank.code}
                      </ThemedText>
                    )}
                  </View>
                  <View style={styles.bankDetails}>
                    <ThemedText style={styles.bankName}>{bank.name}</ThemedText>
                    <ThemedText style={styles.bankCode}>{bank.code}</ThemedText>
                  </View>
                </View>
                <Feather 
                  name="chevron-right" 
                  size={20} 
                  color="#64748B" 
                />
              </TouchableOpacity>
            ))}
          </View>

          {filteredBanks.length === 0 && (
            <View style={styles.emptyState}>
              <Feather name="search" size={48} color="#CBD5E1" />
              <ThemedText style={styles.emptyStateTitle}>No banks found</ThemedText>
              <ThemedText style={styles.emptyStateText}>
                Try searching with a different name or code
              </ThemedText>
            </View>
          )}
        </View>

        {/* Other Transfer Options */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Other Options</ThemedText>
          <View style={styles.otherOptions}>
            <TouchableOpacity style={styles.optionItem}>
              <View style={[styles.optionIcon, { backgroundColor: '#F0FDF4' }]}>
                <Ionicons name="phone-portrait-outline" size={20} color="#059669" />
              </View>
              <View style={styles.optionDetails}>
                <ThemedText style={styles.optionTitle}>Mobile Money</ThemedText>
                <ThemedText style={styles.optionDescription}>Airtel Money, TNM Mpamba</ThemedText>
              </View>
              <Feather name="chevron-right" size={20} color="#64748B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem}>
              <View style={[styles.optionIcon, { backgroundColor: '#F0F9FF' }]}>
                <Ionicons name="person-outline" size={20} color="#0369A1" />
              </View>
              <View style={styles.optionDetails}>
                <ThemedText style={styles.optionTitle}>GreenWallet Users</ThemedText>
                <ThemedText style={styles.optionDescription}>Transfer to other farmers</ThemedText>
              </View>
              <Feather name="chevron-right" size={20} color="#64748B" />
            </TouchableOpacity>
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
    borderBottomRightRadius:70,
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
    textAlign:'center',
  },
  headerSubtitle: {
    color: '#A7F3D0',
    fontSize: 14,
    textAlign:'center',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#064E3B',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#064E3B',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankCount: {
    color: '#64748B',
    fontSize: 14,
  },
  quickTransferScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  quickTransferContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  quickTransferItem: {
    alignItems: 'center',
    width: 80,
  },
  quickTransferIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickTransferCode: {
    fontSize: 12,
    fontWeight: '700',
  },
  quickTransferName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#064E3B',
    textAlign: 'center',
  },
  banksList: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  bankItemSelected: {
    backgroundColor: '#F0FDF4',
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bankLogo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bankLogoImage: {
    width: 30,
    height: 30,
  },
  bankLogoText: {
    fontSize: 12,
    fontWeight: '700',
  },
  bankDetails: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 2,
  },
  bankCode: {
    fontSize: 12,
    color: '#64748B',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
  otherOptions: {
    gap: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionDetails: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 12,
    color: '#64748B',
  },
});