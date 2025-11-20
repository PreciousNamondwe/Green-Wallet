import { ThemedText } from '@/components/themed-text';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CooperativeLoanApplicationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loanData, setLoanData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Parse loan data from URL params
  useEffect(() => {
    if (params.loanData) {
      try {
        const parsedData = JSON.parse(params.loanData as string);
        setLoanData(parsedData);
      } catch (error) {
        console.error('Error parsing loan data:', error);
        // If parsing fails, create basic loan data from individual params
        setLoanData({
          id: params.loanId,
          type: params.loanType,
          title: params.loanTitle,
          provider: params.loanProvider,
          amount: params.loanAmount,
          interest: params.loanInterest,
          duration: params.loanDuration,
          description: params.loanDescription,
          processingTime: params.loanProcessingTime,
        });
      }
    } else if (params.loanId) {
      // Create loan data from individual params
      setLoanData({
        id: params.loanId,
        type: params.loanType,
        title: params.loanTitle,
        provider: params.loanProvider,
        amount: params.loanAmount,
        interest: params.loanInterest,
        duration: params.loanDuration,
        description: params.loanDescription,
        processingTime: params.loanProcessingTime,
      });
    }
  }, [params]);

  // Form state - Cooperative only
  const [formData, setFormData] = useState({
    // Step 1: Cooperative Representative Information
    representativeName: '',
    representativeNationalId: '',
    representativePosition: '',
    representativePhoneNumber: '',
    representativeEmail: '',

    // Step 2: Cooperative Basic Information
    cooperativeName: '',
    cooperativeRegistrationId: '',
    cooperativeRegistrationDate: '',
    cooperativeEstablishmentDate: '',
    cooperativeAddress: '',

    // Step 3: Cooperative Location (Kasungu specific)
    region: 'Kasungu',
    district: 'Kasungu',
    traditionalAuthority: '',
    village: '',
    fullPhysicalAddress: '',

    // Step 4: Cooperative Membership & Structure
    totalMembers: '',
    activeMembers: '',
    womenMembers: '',
    youthMembers: '',
    managementCommittee: [] as string[],

    // Step 5: Cooperative Farming Information
    mainCrops: [] as string[],
    totalFarmSize: '',
    averageLandPerMember: '',
    farmingExperience: '',
    storageFacilities: '',
    equipmentOwned: [] as string[],

    // Step 6: Financial Information
    previousLoans: '',
    loanRepaymentHistory: '',
    savingsAmount: '',
    annualTurnover: '',

    // Step 7: Loan Details
    loanAmount: '',
    loanPurpose: '',
    repaymentPlan: '',
    collateral: '',
    guarantors: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Kasungu specific data
  const kasunguData = {
    traditionalAuthorities: [
      'Kaluluma',
      'Kapelula',
      'Chipala',
      'Santan',
      'Mkanda',
      'Chaima',
      'Mkukula',
      'Chilowamatambe'
    ],
    mainCrops: [
      'Tobacco',
      'Maize',
      'Groundnuts',
      'Soybeans',
      'Sunflower',
      'Cotton',
      'Beans',
      'Sweet Potatoes'
    ],
    equipmentOptions: [
      'Tractor',
      'Planter',
      'Harvester',
      'Sprayer',
      'Irrigation System',
      'Storage Silos',
      'Processing Equipment',
      'Transport Vehicle'
    ]
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.representativeName) newErrors.representativeName = 'Representative name is required';
        if (!formData.representativeNationalId) newErrors.representativeNationalId = 'National ID is required';
        if (!formData.representativePosition) newErrors.representativePosition = 'Position in cooperative is required';
        if (!formData.representativePhoneNumber) newErrors.representativePhoneNumber = 'Phone number is required';
        if (formData.representativeNationalId && formData.representativeNationalId.length !== 9) {
          newErrors.representativeNationalId = 'National ID must be 9 digits';
        }
        break;

      case 2:
        if (!formData.cooperativeName) newErrors.cooperativeName = 'Cooperative name is required';
        if (!formData.cooperativeRegistrationId) newErrors.cooperativeRegistrationId = 'Registration ID is required';
        if (!formData.cooperativeRegistrationDate) newErrors.cooperativeRegistrationDate = 'Registration date is required';
        break;

      case 3:
        if (!formData.traditionalAuthority) newErrors.traditionalAuthority = 'Traditional Authority is required';
        if (!formData.village) newErrors.village = 'Village is required';
        break;

      case 4:
        if (!formData.totalMembers) newErrors.totalMembers = 'Total members is required';
        if (!formData.activeMembers) newErrors.activeMembers = 'Active members is required';
        break;

      case 5:
        if (!formData.mainCrops.length) newErrors.mainCrops = 'Select at least one main crop';
        if (!formData.totalFarmSize) newErrors.totalFarmSize = 'Total farm size is required';
        if (!formData.farmingExperience) newErrors.farmingExperience = 'Farming experience is required';
        break;

      case 6:
        if (!formData.savingsAmount) newErrors.savingsAmount = 'Savings amount is required';
        break;

      case 7:
        if (!formData.loanAmount) newErrors.loanAmount = 'Loan amount is required';
        if (!formData.loanPurpose) newErrors.loanPurpose = 'Loan purpose is required';
        if (!formData.repaymentPlan) newErrors.repaymentPlan = 'Repayment plan is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 7) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArraySelection = (field: string, value: string) => {
    setFormData(prev => {
      const currentArray = [...(prev[field as keyof typeof prev] as string[])];
      if (currentArray.includes(value)) {
        return {
          ...prev,
          [field]: currentArray.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [field]: [...currentArray, value]
        };
      }
    });
  };

  const handleSubmit = () => {
    if (validateStep(7)) {
      // Show success alert with SMS notification message
      Alert.alert(
        'Cooperative Loan Application Submitted Successfully!',
        `Thank you for your cooperative loan application for ${loanData?.title || 'agricultural loan'}.\n\n` +
        `📱 You will receive an SMS message within 24 hours with your application reference number: COOP-${Math.random().toString(36).substr(2, 9).toUpperCase()}\n\n` +
        `✅ Our field officer in Kasungu will contact ${formData.representativeName} for cooperative verification.\n` +
        `📋 Keep your cooperative documents ready for the verification visit.\n` +
        `💳 If approved, funds will be disbursed within ${loanData?.processingTime || '7-10 working days'}.\n\n` +
        `For cooperative inquiries, call: +265 887 123 456`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back to loans screen
              router.back();
            }
          }
        ]
      );

      // Here you would typically send the data to your backend
      console.log('Cooperative Loan Application Data:', {
        ...formData,
        loanType: loanData?.type,
        loanProvider: loanData?.provider,
        appliedDate: new Date().toISOString(),
        region: 'Kasungu',
        applicantType: 'cooperative'
      });
    }
  };

  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicator}>
        {[1, 2, 3, 4, 5, 6, 7].map(step => (
          <View key={step} style={styles.stepContainer}>
            <View style={[
              styles.stepCircle,
              currentStep >= step && styles.stepCircleActive
            ]}>
              <ThemedText style={[
                styles.stepText,
                currentStep >= step && styles.stepTextActive
              ]}>
                {step}
              </ThemedText>
            </View>
            {step < 7 && (
              <View style={[
                styles.stepLine,
                currentStep > step && styles.stepLineActive
              ]} />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.cooperativeHeader}>
        <FontAwesome5 name="users" size={24} color="#059669" />
        <ThemedText style={styles.cooperativeTitle}>Cooperative Representative</ThemedText>
      </View>
      <ThemedText style={styles.stepSubtitle}>
        Information about the person applying on behalf of the cooperative
      </ThemedText>

      <TextInput
        style={[styles.input, errors.representativeName && styles.inputError]}
        placeholder="Full Name of Representative *"
        value={formData.representativeName}
        onChangeText={(text) => handleInputChange('representativeName', text)}
      />
      {errors.representativeName && <ThemedText style={styles.errorText}>{errors.representativeName}</ThemedText>}

      <TextInput
        style={[styles.input, errors.representativeNationalId && styles.inputError]}
        placeholder="National ID Number *"
        value={formData.representativeNationalId}
        onChangeText={(text) => handleInputChange('representativeNationalId', text)}
        keyboardType="numeric"
        maxLength={9}
      />
      {errors.representativeNationalId && <ThemedText style={styles.errorText}>{errors.representativeNationalId}</ThemedText>}

      <TextInput
        style={[styles.input, errors.representativePosition && styles.inputError]}
        placeholder="Position in Cooperative *"
        value={formData.representativePosition}
        onChangeText={(text) => handleInputChange('representativePosition', text)}
      />
      {errors.representativePosition && <ThemedText style={styles.errorText}>{errors.representativePosition}</ThemedText>}

      <TextInput
        style={[styles.input, errors.representativePhoneNumber && styles.inputError]}
        placeholder="Phone Number *"
        value={formData.representativePhoneNumber}
        onChangeText={(text) => handleInputChange('representativePhoneNumber', text)}
        keyboardType="phone-pad"
      />
      {errors.representativePhoneNumber && <ThemedText style={styles.errorText}>{errors.representativePhoneNumber}</ThemedText>}

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={formData.representativeEmail}
        onChangeText={(text) => handleInputChange('representativeEmail', text)}
        keyboardType="email-address"
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.cooperativeHeader}>
        <FontAwesome5 name="file-contract" size={24} color="#059669" />
        <ThemedText style={styles.cooperativeTitle}>Cooperative Registration</ThemedText>
      </View>

      <TextInput
        style={[styles.input, errors.cooperativeName && styles.inputError]}
        placeholder="Cooperative Name *"
        value={formData.cooperativeName}
        onChangeText={(text) => handleInputChange('cooperativeName', text)}
      />
      {errors.cooperativeName && <ThemedText style={styles.errorText}>{errors.cooperativeName}</ThemedText>}

      <TextInput
        style={[styles.input, errors.cooperativeRegistrationId && styles.inputError]}
        placeholder="Cooperative Registration ID *"
        value={formData.cooperativeRegistrationId}
        onChangeText={(text) => handleInputChange('cooperativeRegistrationId', text)}
      />
      {errors.cooperativeRegistrationId && <ThemedText style={styles.errorText}>{errors.cooperativeRegistrationId}</ThemedText>}

      <TextInput
        style={[styles.input, errors.cooperativeRegistrationDate && styles.inputError]}
        placeholder="Registration Date (DD/MM/YYYY) *"
        value={formData.cooperativeRegistrationDate}
        onChangeText={(text) => handleInputChange('cooperativeRegistrationDate', text)}
      />
      {errors.cooperativeRegistrationDate && <ThemedText style={styles.errorText}>{errors.cooperativeRegistrationDate}</ThemedText>}

      <TextInput
        style={styles.input}
        placeholder="Establishment Date (DD/MM/YYYY)"
        value={formData.cooperativeEstablishmentDate}
        onChangeText={(text) => handleInputChange('cooperativeEstablishmentDate', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Cooperative Address"
        value={formData.cooperativeAddress}
        onChangeText={(text) => handleInputChange('cooperativeAddress', text)}
        multiline
      />
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.cooperativeHeader}>
        <FontAwesome5 name="map-marker-alt" size={24} color="#059669" />
        <ThemedText style={styles.cooperativeTitle}>Cooperative Location</ThemedText>
      </View>
      <ThemedText style={styles.stepSubtitle}>Kasungu District</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Region"
        value="Kasungu"
        editable={false}
      />

      <TextInput
        style={styles.input}
        placeholder="District"
        value="Kasungu"
        editable={false}
      />

      <View style={styles.pickerContainer}>
        <ThemedText style={styles.label}>Traditional Authority *</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.taContainer}>
            {kasunguData.traditionalAuthorities.map(ta => (
              <TouchableOpacity
                key={ta}
                style={[
                  styles.taButton,
                  formData.traditionalAuthority === ta && styles.taButtonActive
                ]}
                onPress={() => handleInputChange('traditionalAuthority', ta)}
              >
                <ThemedText style={[
                  styles.taButtonText,
                  formData.traditionalAuthority === ta && styles.taButtonTextActive
                ]}>
                  {ta}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {errors.traditionalAuthority && <ThemedText style={styles.errorText}>{errors.traditionalAuthority}</ThemedText>}
      </View>

      <TextInput
        style={[styles.input, errors.village && styles.inputError]}
        placeholder="Village *"
        value={formData.village}
        onChangeText={(text) => handleInputChange('village', text)}
      />
      {errors.village && <ThemedText style={styles.errorText}>{errors.village}</ThemedText>}

      <TextInput
        style={styles.input}
        placeholder="Full Physical Address"
        value={formData.fullPhysicalAddress}
        onChangeText={(text) => handleInputChange('fullPhysicalAddress', text)}
        multiline
      />
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.cooperativeHeader}>
        <FontAwesome5 name="user-friends" size={24} color="#059669" />
        <ThemedText style={styles.cooperativeTitle}>Membership & Structure</ThemedText>
      </View>

      <TextInput
        style={[styles.input, errors.totalMembers && styles.inputError]}
        placeholder="Total Number of Members *"
        value={formData.totalMembers}
        onChangeText={(text) => handleInputChange('totalMembers', text)}
        keyboardType="numeric"
      />
      {errors.totalMembers && <ThemedText style={styles.errorText}>{errors.totalMembers}</ThemedText>}

      <TextInput
        style={[styles.input, errors.activeMembers && styles.inputError]}
        placeholder="Number of Active Members *"
        value={formData.activeMembers}
        onChangeText={(text) => handleInputChange('activeMembers', text)}
        keyboardType="numeric"
      />
      {errors.activeMembers && <ThemedText style={styles.errorText}>{errors.activeMembers}</ThemedText>}

      <TextInput
        style={styles.input}
        placeholder="Number of Women Members"
        value={formData.womenMembers}
        onChangeText={(text) => handleInputChange('womenMembers', text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Youth Members (under 35)"
        value={formData.youthMembers}
        onChangeText={(text) => handleInputChange('youthMembers', text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Management Committee Members (comma separated)"
        value={formData.managementCommittee.join(', ')}
        onChangeText={(text) => handleInputChange('managementCommittee', text.split(',').map(item => item.trim()))}
        multiline
      />
    </View>
  );

  const renderStep5 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.cooperativeHeader}>
        <FontAwesome5 name="tractor" size={24} color="#059669" />
        <ThemedText style={styles.cooperativeTitle}>Farming Operations</ThemedText>
      </View>

      <View style={styles.pickerContainer}>
        <ThemedText style={styles.label}>Main Crops Grown *</ThemedText>
        <View style={styles.cropsGrid}>
          {kasunguData.mainCrops.map(crop => (
            <TouchableOpacity
              key={crop}
              style={[
                styles.cropButton,
                formData.mainCrops.includes(crop) && styles.cropButtonActive
              ]}
              onPress={() => handleArraySelection('mainCrops', crop)}
            >
              <ThemedText style={[
                styles.cropButtonText,
                formData.mainCrops.includes(crop) && styles.cropButtonTextActive
              ]}>
                {crop}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        {errors.mainCrops && <ThemedText style={styles.errorText}>{errors.mainCrops}</ThemedText>}
      </View>

      <TextInput
        style={[styles.input, errors.totalFarmSize && styles.inputError]}
        placeholder="Total Farm Size (Acres/Hectares) *"
        value={formData.totalFarmSize}
        onChangeText={(text) => handleInputChange('totalFarmSize', text)}
      />
      {errors.totalFarmSize && <ThemedText style={styles.errorText}>{errors.totalFarmSize}</ThemedText>}

      <TextInput
        style={styles.input}
        placeholder="Average Land per Member (Acres/Hectares)"
        value={formData.averageLandPerMember}
        onChangeText={(text) => handleInputChange('averageLandPerMember', text)}
      />

      <TextInput
        style={[styles.input, errors.farmingExperience && styles.inputError]}
        placeholder="Years of Cooperative Farming Experience *"
        value={formData.farmingExperience}
        onChangeText={(text) => handleInputChange('farmingExperience', text)}
        keyboardType="numeric"
      />
      {errors.farmingExperience && <ThemedText style={styles.errorText}>{errors.farmingExperience}</ThemedText>}

      <TextInput
        style={styles.input}
        placeholder="Storage Facilities Available"
        value={formData.storageFacilities}
        onChangeText={(text) => handleInputChange('storageFacilities', text)}
      />

      <View style={styles.pickerContainer}>
        <ThemedText style={styles.label}>Equipment Owned</ThemedText>
        <View style={styles.cropsGrid}>
          {kasunguData.equipmentOptions.map(equipment => (
            <TouchableOpacity
              key={equipment}
              style={[
                styles.cropButton,
                formData.equipmentOwned.includes(equipment) && styles.cropButtonActive
              ]}
              onPress={() => handleArraySelection('equipmentOwned', equipment)}
            >
              <ThemedText style={[
                styles.cropButtonText,
                formData.equipmentOwned.includes(equipment) && styles.cropButtonTextActive
              ]}>
                {equipment}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep6 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.cooperativeHeader}>
        <FontAwesome5 name="chart-line" size={24} color="#059669" />
        <ThemedText style={styles.cooperativeTitle}>Financial Information</ThemedText>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Previous Loans (Amounts & Providers)"
        value={formData.previousLoans}
        onChangeText={(text) => handleInputChange('previousLoans', text)}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Loan Repayment History"
        value={formData.loanRepaymentHistory}
        onChangeText={(text) => handleInputChange('loanRepaymentHistory', text)}
        multiline
      />

      <TextInput
        style={[styles.input, errors.savingsAmount && styles.inputError]}
        placeholder="Current Cooperative Savings (MWK) *"
        value={formData.savingsAmount}
        onChangeText={(text) => handleInputChange('savingsAmount', text)}
        keyboardType="numeric"
      />
      {errors.savingsAmount && <ThemedText style={styles.errorText}>{errors.savingsAmount}</ThemedText>}

      <TextInput
        style={styles.input}
        placeholder="Annual Turnover (MWK)"
        value={formData.annualTurnover}
        onChangeText={(text) => handleInputChange('annualTurnover', text)}
        keyboardType="numeric"
      />
    </View>
  );

  const renderStep7 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.cooperativeHeader}>
        <FontAwesome5 name="hand-holding-usd" size={24} color="#059669" />
        <ThemedText style={styles.cooperativeTitle}>Loan Request Details</ThemedText>
      </View>

      {loanData && (
        <View style={styles.loanSummary}>
          <ThemedText style={styles.loanProvider}>{loanData.provider}</ThemedText>
          <ThemedText style={styles.loanTitle}>{loanData.title}</ThemedText>
          <ThemedText style={styles.loanAmount}>{loanData.amount}</ThemedText>
          <ThemedText style={styles.loanInterest}>{loanData.interest} interest</ThemedText>
        </View>
      )}

      <TextInput
        style={[styles.input, errors.loanAmount && styles.inputError]}
        placeholder="Requested Loan Amount (MWK) *"
        value={formData.loanAmount}
        onChangeText={(text) => handleInputChange('loanAmount', text)}
        keyboardType="numeric"
      />
      {errors.loanAmount && <ThemedText style={styles.errorText}>{errors.loanAmount}</ThemedText>}

      <TextInput
        style={[styles.input, errors.loanPurpose && styles.inputError]}
        placeholder="Specific Loan Purpose *"
        value={formData.loanPurpose}
        onChangeText={(text) => handleInputChange('loanPurpose', text)}
        multiline
      />
      {errors.loanPurpose && <ThemedText style={styles.errorText}>{errors.loanPurpose}</ThemedText>}

      <View style={styles.pickerContainer}>
        <ThemedText style={styles.label}>Preferred Repayment Plan *</ThemedText>
        <View style={styles.optionsRow}>
          {['After Harvest', 'Monthly', 'Quarterly', 'Bi-Annual', 'Custom'].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                formData.repaymentPlan === option && styles.optionButtonActive
              ]}
              onPress={() => handleInputChange('repaymentPlan', option)}
            >
              <ThemedText style={[
                styles.optionButtonText,
                formData.repaymentPlan === option && styles.optionButtonTextActive
              ]}>
                {option}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        {errors.repaymentPlan && <ThemedText style={styles.errorText}>{errors.repaymentPlan}</ThemedText>}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Collateral Offered"
        value={formData.collateral}
        onChangeText={(text) => handleInputChange('collateral', text)}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Guarantors (Names & Contacts)"
        value={formData.guarantors.join(', ')}
        onChangeText={(text) => handleInputChange('guarantors', text.split(',').map(item => item.trim()))}
        multiline
      />

      <View style={styles.documentsSection}>
        <ThemedText style={styles.documentsTitle}>Required Documents</ThemedText>
        <View style={styles.documentsList}>
          <View style={styles.documentItem}>
            <FontAwesome5 name="file-contract" size={16} color="#059669" />
            <ThemedText style={styles.documentText}>Cooperative Registration Certificate</ThemedText>
          </View>
          <View style={styles.documentItem}>
            <FontAwesome5 name="users" size={16} color="#059669" />
            <ThemedText style={styles.documentText}>List of All Members with IDs</ThemedText>
          </View>
          <View style={styles.documentItem}>
            <FontAwesome5 name="chart-pie" size={16} color="#059669" />
            <ThemedText style={styles.documentText}>Financial Statements (2 years)</ThemedText>
          </View>
          <View style={styles.documentItem}>
            <FontAwesome5 name="map" size={16} color="#059669" />
            <ThemedText style={styles.documentText}>Farm Location Maps</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      case 7: return renderStep7();
      default: return renderStep1();
    }
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
            <ThemedText style={styles.greeting}>Cooperative Loan Application</ThemedText>
            <ThemedText style={styles.userName}>
              Step {currentStep} of 7 - {loanData?.title || 'Cooperative Agricultural Loan'}
            </ThemedText>
          </View>
        </View>
        {renderStepIndicator()}
      </LinearGradient>

      <ScrollView style={styles.scrollView}>
        {renderCurrentStep()}
        
        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          {currentStep > 1 && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handlePreviousStep}
            >
              <Feather name="arrow-left" size={20} color="#059669" />
              <ThemedText style={styles.backButtonText}>Back</ThemedText>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNextStep}
          >
            <ThemedText style={styles.nextButtonText}>
              {currentStep === 7 ? 'Submit Cooperative Application' : 'Next Step'}
            </ThemedText>
            <Feather name="arrow-right" size={20} color="#FFF" />
          </TouchableOpacity>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    marginBottom: 20,
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
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#FFF',
  },
  stepText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
  },
  stepTextActive: {
    color: '#059669',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 5,
  },
  stepLineActive: {
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    padding: 20,
  },
  cooperativeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cooperativeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#064E3B',
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    fontSize: 14,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginBottom: 8,
    marginTop: -8,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 8,
  },
  taContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  taButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  taButtonActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  taButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  taButtonTextActive: {
    color: '#FFF',
  },
  cropsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cropButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cropButtonActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  cropButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  cropButtonTextActive: {
    color: '#FFF',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  optionButtonActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  optionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  optionButtonTextActive: {
    color: '#FFF',
  },
  loanSummary: {
    backgroundColor: '#F0FDF9',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 16,
  },
  loanProvider: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  loanTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#064E3B',
    marginTop: 4,
  },
  loanAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#064E3B',
    marginTop: 4,
  },
  loanInterest: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  documentsSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  documentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 12,
  },
  documentsList: {
    gap: 8,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  documentText: {
    fontSize: 12,
    color: '#64748B',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 0,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#059669',
  },
  backButtonText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#059669',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});