import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { bookService, getServiceById } from '../services/firestoreService';
import { getCurrentUser } from '../services/authService';
import { PRIMARY, TEXT_PRIMARY, TEXT_SECONDARY, SURFACE, BACKGROUND } from '../constants/colors';

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { serviceId, category } = route.params || {};

  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  useEffect(() => {
    const loadServiceDetails = async () => {
      try {
        const serviceData = await getServiceById(serviceId);
        setService(serviceData);
        
        // Pre-fill user data if available
        const userData = await getCurrentUser();
        if (userData) {
          setName(userData.name || '');
          setEmail(userData.email || '');
          setPhone(userData.phone || '');
          setAddress(userData.address || '');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load service details');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadServiceDetails();
  }, [serviceId]);

  const handleDateChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Check if user is authenticated
      const userData = await getCurrentUser();
      if (!userData) {
        Alert.alert(
          'Authentication Required', 
          'Please login to book a service',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Login', onPress: () => navigation.navigate('login')}
          ]
        );
        return;
      }
      
      // Format date for booking
      const bookingDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
      
      // Format time for booking
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

      const bookingDetails = {
        date: bookingDate,
        time: formattedTime,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        customerAddress: address,
        description,
        status: 'pending'
      };

      const result = await bookService(serviceId, bookingDetails);
      setBookingResult(result);
      setShowConfirmation(true);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to submit booking. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    navigation.navigate('home');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={styles.loadingText}>Loading service details...</Text>
      </View>
    );
  }

  if (!service) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={60} color="#F44336" />
        <Text style={styles.errorText}>Service not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Book Service</Text>
          <Text style={styles.serviceName}>{service.name}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          
          <View style={styles.serviceInfoContainer}>
            <View style={styles.serviceInfoItem}>
              <Ionicons name="pricetag-outline" size={20} color={TEXT_SECONDARY} />
              <Text style={styles.serviceInfoText}>Price Range: {service.price}</Text>
            </View>
            
            <View style={styles.serviceInfoItem}>
              <Ionicons name="star-outline" size={20} color={TEXT_SECONDARY} />
              <Text style={styles.serviceInfoText}>Rating: {service.rating} ({service.reviewCount} reviews)</Text>
            </View>
            
            <View style={styles.serviceInfoItem}>
              <Ionicons name="location-outline" size={20} color={TEXT_SECONDARY} />
              <Text style={styles.serviceInfoText}>Distance: {service.distance} km</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Appointment Details</Text>
          
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color={TEXT_SECONDARY} />
              <Text style={styles.dateTimeText}>
                {date.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.timePickerButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Ionicons name="time-outline" size={20} color={TEXT_SECONDARY} />
              <Text style={styles.dateTimeText}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Custom Date Picker Modal */}
          <Modal
            visible={showDatePicker}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowDatePicker(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.pickerModal}>
                <Text style={styles.pickerTitle}>Select Date</Text>
                <View style={styles.pickerButtonsRow}>
                  <TouchableOpacity 
                    style={styles.pickerButton} 
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.pickerButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.pickerButton, styles.confirmButton]} 
                    onPress={() => {
                      handleDateChange(date);
                    }}
                  >
                    <Text style={[styles.pickerButtonText, styles.confirmButtonText]}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Custom Time Picker Modal */}
          <Modal
            visible={showTimePicker}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowTimePicker(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.pickerModal}>
                <Text style={styles.pickerTitle}>Select Time</Text>
                <View style={styles.pickerButtonsRow}>
                  <TouchableOpacity 
                    style={styles.pickerButton} 
                    onPress={() => setShowTimePicker(false)}
                  >
                    <Text style={styles.pickerButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.pickerButton, styles.confirmButton]} 
                    onPress={() => {
                      handleTimeChange(time);
                    }}
                  >
                    <Text style={[styles.pickerButtonText, styles.confirmButtonText]}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Text style={styles.sectionTitle}>Your Information</Text>
          
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color={TEXT_SECONDARY} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color={TEXT_SECONDARY} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={TEXT_SECONDARY} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color={TEXT_SECONDARY} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Service Address"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Describe what you need help with..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.bookButton, isSubmitting && styles.bookButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.bookButtonText}>Book Now</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={showConfirmation}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <View style={styles.confirmationHeader}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
              <Text style={styles.confirmationTitle}>Booking Confirmed!</Text>
            </View>
            
            <View style={styles.confirmationContent}>
              <Text style={styles.confirmationText}>
                Your booking has been successfully submitted.
              </Text>
              
              <View style={styles.referenceContainer}>
                <Text style={styles.referenceLabel}>Booking Reference:</Text>
                <Text style={styles.referenceNumber}>{bookingResult?.bookingReference}</Text>
              </View>
              
              <Text style={styles.confirmationDetails}>
                We've sent a confirmation to your email. The service provider will contact you shortly to confirm your appointment.
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleCloseConfirmation}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: TEXT_SECONDARY,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: TEXT_PRIMARY,
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    padding: 20,
    backgroundColor: SURFACE,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 18,
    color: TEXT_SECONDARY,
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginTop: 20,
    marginBottom: 15,
  },
  serviceInfoContainer: {
    backgroundColor: SURFACE,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  serviceInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceInfoText: {
    marginLeft: 10,
    fontSize: 16,
    color: TEXT_PRIMARY,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  datePickerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
  },
  timePickerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 8,
    padding: 15,
  },
  dateTimeText: {
    marginLeft: 10,
    fontSize: 16,
    color: TEXT_PRIMARY,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: TEXT_PRIMARY,
  },
  textAreaContainer: {
    backgroundColor: SURFACE,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  textArea: {
    fontSize: 16,
    color: TEXT_PRIMARY,
    minHeight: 100,
  },
  footer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: SURFACE,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: TEXT_PRIMARY,
    fontWeight: '500',
  },
  bookButton: {
    flex: 2,
    backgroundColor: PRIMARY,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  bookButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pickerModal: {
    backgroundColor: SURFACE,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  pickerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: PRIMARY,
  },
  pickerButtonText: {
    fontSize: 16,
    color: TEXT_PRIMARY,
    fontWeight: '500',
  },
  confirmButtonText: {
    color: '#fff',
  },
  confirmationModal: {
    backgroundColor: SURFACE,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  confirmationHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginTop: 10,
  },
  confirmationContent: {
    marginBottom: 20,
  },
  confirmationText: {
    fontSize: 16,
    color: TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: 20,
  },
  referenceContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  referenceLabel: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    marginBottom: 5,
  },
  referenceNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PRIMARY,
  },
  confirmationDetails: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 20,
  },
  doneButton: {
    backgroundColor: PRIMARY,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BookingScreen;
