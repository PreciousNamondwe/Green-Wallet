import { ThemedText } from '@/components/themed-text';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type LoanType = 'all' | 'input' | 'financial';

export default function LoansScreen() {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showProviders, setShowProviders] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<LoanType>('all');
  const router = useRouter();
  
  // Combined loans data - both input and financial loans
  const allLoans = [
    // Input Loans
    {
      id: 1,
      type: 'input',
      title: 'Seeds & Fertilizers',
      provider: 'SEEDCO',
      amount: 'MWK 500,000',
      interest: '12%',
      duration: '12 months',
      description: 'Input loan for hybrid seeds and NPK fertilizers',
      requirements: ['Farm registration', 'Land ownership proof', 'Business plan'],
      features: ['Flexible repayment', 'Insurance included', 'Technical support'],
      category: 'Seeds & Inputs',
      rating: 4.5,
      processingTime: '3-5 days'
    },
    {
      id: 2,
      type: 'input',
      title: 'Solar Pumps',
      provider: 'Integrated Water and  Energy Technology (IWET)',
      amount: 'MWK 1,200,000',
      interest: '15%',
      duration: '24 months',
      description: 'Loan for farming equipment and machinery purchase',
      requirements: ['Collateral', '2 years farming experience', 'Bank statement'],
      features: ['Grace period', 'Maintenance support', 'Training'],
      category: 'Equipment',
      rating: 4.3,
      processingTime: '5-7 days'
    },
    
    // Financial Loans
    {
      id: 4,
      type: 'financial',
      title: 'FINCA Loans',
      provider: 'Foundation for International Community Assistance (FINCA)',
      amount: 'Up to MWK 5,000,000',
      interest: '12-15%',
      duration: '12-60 months',
      description: 'Comprehensive agricultural financing for various farming needs',
      requirements: ['Business plan', 'Collateral', 'Credit history'],
      features: ['Input financing', 'Equipment loans', 'Seasonal credit', 'Agri advisory'],
      category: 'Multi-Purpose',
      rating: 4.5,
      processingTime: '3-5 days',
      logo: 'bank'
    },
    {
      id: 5,
      type: 'financial',
      title: 'NEEF',
      provider: 'National Economic Empowerment Fund (NEEF)',
      amount: 'Up to MWK 2,000,000',
      interest: '14-18%',
      duration: '6-36 months',
      description: 'Digital-first agricultural loans with quick processing',
      requirements: ['Mobile money account', 'ID copy', 'Farm photos'],
      features: ['Digital application', 'Mobile disbursement', 'Flexible terms'],
      category: 'Digital Loans',
      rating: 4.2,
      processingTime: '24 hours',
      logo: 'mobile-alt'
    },
  ];

  // Filter loans based on active filter
  const filteredLoans = allLoans.filter(loan => {
    if (activeFilter === 'all') return true;
    return loan.type === activeFilter;
  }).filter(loan =>
    loan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loan.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loan.features.some(feature => 
      feature.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Financial service providers for the modal
  const financialProviders = [
    {
      id: 1,
      name: 'Agricultural Development Bank',
      logo: 'bank',
      interest: '12-15%',
      maxAmount: 'MWK 5,000,000',
      processing: '3-5 days',
      rating: 4.5,
      features: ['Input financing', 'Equipment loans', 'Seasonal credit'],
      contact: '+265 123 4567'
    },
    {
      id: 2,
      name: 'NEEF',
      logo: 'mobile-alt',
      interest: '14-18%',
      maxAmount: 'MWK 2,000,000',
      processing: '24 hours',
      rating: 4.2,
      features: ['Digital application', 'Mobile disbursement', 'Flexible terms'],
      contact: '+265 987 6543'
    },
    {
      id: 3,
      name: 'NBS Bank Agri Division',
      logo: 'university',
      interest: '11-16%',
      maxAmount: 'MWK 3,000,000',
      processing: '2-4 days',
      rating: 4.3,
      features: ['Agri advisory', 'Insurance bundled', 'Group loans'],
      contact: '+265 456 7890'
    },
    {
      id: 4,
      name: 'FDH Bank',
      logo: 'hand-holding-usd',
      interest: '13-17%',
      maxAmount: 'MWK 4,000,000',
      processing: '3-7 days',
      rating: 4.1,
      features: ['Youth loans', 'Women farmers', 'Value chain financing'],
      contact: '+265 234 5678'
    }
  ];

  const filteredProviders = financialProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.features.some(feature => 
      feature.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

const handleApplyForLoan = (loan) => {
  setSelectedLoan(loan);
  Alert.alert(
    'Apply for Loan',
    `Would you like to apply for ${loan.title} with ${loan.provider}?\n\n` +
    `Amount: ${loan.amount}\n` +
    `Interest: ${loan.interest}\n` +
    `Duration: ${loan.duration}`,
    [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Apply Now', 
        onPress: () => {
          // Using URL params approach
          router.push({
            pathname: '/services/loan-application',
            params: {
              loanId: loan.id.toString(),
              loanType: loan.type,
              loanTitle: loan.title,
              loanProvider: loan.provider,
              loanAmount: loan.amount,
              loanInterest: loan.interest,
              loanDuration: loan.duration,
              loanDescription: loan.description,
              loanRequirements: JSON.stringify(loan.requirements),
              loanFeatures: JSON.stringify(loan.features),
              loanCategory: loan.category,
              loanProcessingTime: loan.processingTime,
            }
          });
        }
      }
    ]
  );
};

  const handleContactProvider = (provider) => {
    Alert.alert(
      'Contact Provider',
      `Contact ${provider.name} at ${provider.contact}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call Now', 
          onPress: () => {
            Alert.alert('Calling...', `Would call ${provider.contact}`);
          }
        }
      ]
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesome5 key={i} name="star" size={12} color="#F59E0B" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FontAwesome5 key="half" name="star-half-alt" size={12} color="#F59E0B" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesome5 key={`empty-${i}`} name="star" size={12} color="#E5E7EB" />);
    }

    return stars;
  };

  const getLoanTypeColor = (type) => {
    return type === 'input' ? '#10B981' : '#3B82F6';
  };

  const getLoanTypeIcon = (type) => {
    return type === 'input' ? 'seedling' : 'hand-holding-usd';
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
          <View>
            <ThemedText style={styles.greeting}>Agricultural Loans</ThemedText>
            <ThemedText style={styles.userName}>Financing Solutions</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Section */}
        <View style={styles.filterSection}>
          <ThemedText style={styles.sectionTitle}>Available Loans</ThemedText>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search loans, providers, or features..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            <TouchableOpacity 
              style={[
                styles.filterButton,
                activeFilter === 'all' && styles.filterButtonActive
              ]}
              onPress={() => setActiveFilter('all')}
            >
              <ThemedText style={[
                styles.filterButtonText,
                activeFilter === 'all' && styles.filterButtonTextActive
              ]}>
                All Loans
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.filterButton,
                activeFilter === 'input' && styles.filterButtonActive
              ]}
              onPress={() => setActiveFilter('input')}
            >
              <FontAwesome5 
                name="seedling" 
                size={14} 
                color={activeFilter === 'input' ? '#FFF' : '#10B981'} 
              />
              <ThemedText style={[
                styles.filterButtonText,
                activeFilter === 'input' && styles.filterButtonTextActive
              ]}>
                Input Loans
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.filterButton,
                activeFilter === 'financial' && styles.filterButtonActive
              ]}
              onPress={() => setActiveFilter('financial')}
            >
              <FontAwesome5 
                name="hand-holding-usd" 
                size={14} 
                color={activeFilter === 'financial' ? '#FFF' : '#3B82F6'} 
              />
              <ThemedText style={[
                styles.filterButtonText,
                activeFilter === 'financial' && styles.filterButtonTextActive
              ]}>
                Financial Loans
              </ThemedText>
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.resultsText}>
            {filteredLoans.length} {filteredLoans.length === 1 ? 'loan' : 'loans'} found
          </ThemedText>
        </View>

        {/* Loans List */}
        <View style={styles.section}>
          {filteredLoans.map((loan) => (
            <TouchableOpacity 
              key={loan.id}
              style={styles.loanCard}
              onPress={() => handleApplyForLoan(loan)}
            >
              <LinearGradient
                colors={['#FFF', '#F8FAFC']}
                style={styles.loanCardGradient}
              >
                {/* Loan Header */}
                <View style={styles.loanHeader}>
                  <View style={styles.loanTypeContainer}>
                    <View style={[
                      styles.loanTypeBadge,
                      { backgroundColor: `${getLoanTypeColor(loan.type)}15` }
                    ]}>
                      <FontAwesome5 
                        name={getLoanTypeIcon(loan.type)} 
                        size={12} 
                        color={getLoanTypeColor(loan.type)} 
                      />
                      <ThemedText style={[
                        styles.loanTypeText,
                        { color: getLoanTypeColor(loan.type) }
                      ]}>
                        {loan.type === 'input' ? 'Input Loan' : 'Financial Provider'}
                      </ThemedText>
                    </View>
                    <View style={styles.ratingContainer}>
                      {renderStars(loan.rating)}
                    </View>
                  </View>
                  <ThemedText style={styles.loanAmount}>{loan.amount}</ThemedText>
                </View>
                
                {/* Loan Title and Provider */}
                <ThemedText style={styles.loanTitle}>{loan.title}</ThemedText>
                <ThemedText style={styles.loanProvider}>{loan.provider}</ThemedText>
                <ThemedText style={styles.loanDescription}>{loan.description}</ThemedText>
                
                {/* Loan Details */}
                <View style={styles.loanDetails}>
                  <View style={styles.detailItem}>
                    <FontAwesome5 name="percentage" size={12} color="#059669" />
                    <ThemedText style={styles.detailText}>{loan.interest} interest</ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <FontAwesome5 name="calendar" size={12} color="#059669" />
                    <ThemedText style={styles.detailText}>{loan.duration}</ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <Feather name="clock" size={12} color="#059669" />
                    <ThemedText style={styles.detailText}>{loan.processingTime}</ThemedText>
                  </View>
                </View>

                {/* Features */}
                <View style={styles.featuresContainer}>
                  {loan.features.slice(0, 3).map((feature, index) => (
                    <View key={index} style={styles.featureTag}>
                      <ThemedText style={styles.featureText}>{feature}</ThemedText>
                    </View>
                  ))}
                  {loan.features.length > 3 && (
                    <View style={styles.featureTag}>
                      <ThemedText style={styles.featureText}>+{loan.features.length - 3} more</ThemedText>
                    </View>
                  )}
                </View>

                {/* Apply Button */}
                <TouchableOpacity 
                  style={[
                    styles.applyButton,
                    { backgroundColor: getLoanTypeColor(loan.type) }
                  ]}
                  onPress={() => handleApplyForLoan(loan)}
                >
                  <ThemedText style={styles.applyButtonText}>
                    {loan.type === 'input' ? 'Apply for Loan' : 'Contact Provider'}
                  </ThemedText>
                  <Feather name="arrow-right" size={16} color="#FFF" />
                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <FontAwesome5 name="seedling" size={24} color="#059669" />
            <ThemedText style={styles.statNumber}>{allLoans.filter(l => l.type === 'input').length}</ThemedText>
            <ThemedText style={styles.statLabel}>Input Loans</ThemedText>
          </View>
          <View style={styles.statCard}>
            <FontAwesome5 name="hand-holding-usd" size={24} color="#3B82F6" />
            <ThemedText style={styles.statNumber}>{allLoans.filter(l => l.type === 'financial').length}</ThemedText>
            <ThemedText style={styles.statLabel}>Financial Providers</ThemedText>
          </View>
          <View style={styles.statCard}>
            <FontAwesome5 name="check-circle" size={24} color="#059669" />
            <ThemedText style={styles.statNumber}>95%</ThemedText>
            <ThemedText style={styles.statLabel}>Approval Rate</ThemedText>
          </View>
        </View>
      </ScrollView>

      {/* Providers Modal */}
      <Modal
        visible={showProviders}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>All Financial Service Providers</ThemedText>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowProviders(false)}
            >
              <Feather name="x" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.providersList}>
            {financialProviders.map((provider) => (
              <View key={provider.id} style={styles.providerCard}>
                <View style={styles.providerHeader}>
                  <View style={styles.providerInfo}>
                    <View style={styles.providerLogo}>
                      <FontAwesome5 name={provider.logo} size={20} color="#059669" />
                    </View>
                    <View>
                      <ThemedText style={styles.providerName}>{provider.name}</ThemedText>
                      <View style={styles.ratingContainer}>
                        {renderStars(provider.rating)}
                        <ThemedText style={styles.ratingText}>({provider.rating})</ThemedText>
                      </View>
                    </View>
                  </View>
                  <ThemedText style={styles.interestRate}>{provider.interest}</ThemedText>
                </View>

                <View style={styles.providerDetails}>
                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>Max Amount:</ThemedText>
                    <ThemedText style={styles.detailValue}>{provider.maxAmount}</ThemedText>
                  </View>
                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>Processing:</ThemedText>
                    <ThemedText style={styles.detailValue}>{provider.processing}</ThemedText>
                  </View>
                </View>

                <View style={styles.featuresContainer}>
                  {provider.features.map((feature, index) => (
                    <View key={index} style={styles.providerFeatureTag}>
                      <ThemedText style={styles.providerFeatureText}>{feature}</ThemedText>
                    </View>
                  ))}
                </View>

                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => handleContactProvider(provider)}
                >
                  <ThemedText style={styles.contactButtonText}>Contact Provider</ThemedText>
                  <Feather name="phone" size={16} color="#059669" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: '#A7F3D0',
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  providerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  providerButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  filterSection: {
    padding: 20,
    paddingBottom: 0,
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#064E3B',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#1E293B',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterButtonActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },
  resultsText: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  loanCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  loanCardGradient: {
    padding: 20,
  },
  loanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  loanTypeContainer: {
    flex: 1,
  },
  loanTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  loanTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  loanTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#064E3B',
    marginBottom: 4,
  },
  loanProvider: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 8,
  },
  loanDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
    lineHeight: 20,
  },
  loanDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  featureTag: {
    backgroundColor: '#F0FDF9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  featureText: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '500',
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsSection: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#064E3B',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 10,
    color: '#64748B',
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 60,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#064E3B',
  },
  closeButton: {
    padding: 4,
  },
  providersList: {
    flex: 1,
    padding: 20,
  },
  providerCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  providerLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 4,
  },
  interestRate: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
  },
  providerDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#064E3B',
  },
  providerFeatureTag: {
    backgroundColor: '#F0FDF9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  providerFeatureText: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '500',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#059669',
    gap: 8,
    marginTop: 8,
  },
  contactButtonText: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '600',
  },
});