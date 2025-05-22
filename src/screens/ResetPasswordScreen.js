import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import ResponsiveContainer from '../components/ResponsiveContainer';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../constants/theme';
import { isTablet, scaleWidth, scaleHeight, fontSize, spacing } from '../utils/responsive';
import { resetPassword } from '../services/authService';

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      // Call Firebase password reset
      await resetPassword(email);
      setResetSent(true);
    } catch (error) {
      Alert.alert('Password Reset Failed', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResponsiveContainer style={styles.container} backgroundColor={theme.colors.background}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/icon.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>African Service Finder</Text>
          </View>
          
          <View style={styles.formContainer}>
            {!resetSent ? (
              <>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>
                  Enter your email address and we'll send you instructions to reset your password.
                </Text>
                
                <Input
                  label="Email Address"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon="mail-outline"
                  style={styles.inputField}
                />
                
                <Button
                  title={isLoading ? "Sending..." : "Send Reset Link"}
                  onPress={handleResetPassword}
                  disabled={isLoading}
                  loading={isLoading}
                  type="primary"
                  size="large"
                  fullWidth
                  style={styles.resetButton}
                />
              </>
            ) : (
              <View style={styles.successContainer}>
                <Ionicons name="checkmark-circle" size={80} color={theme.colors.success} />
                <Text style={styles.successTitle}>Email Sent</Text>
                <Text style={styles.successMessage}>
                  We've sent password reset instructions to {email}. Please check your email.
                </Text>
                <Button
                  title="Back to Login"
                  onPress={() => navigation.navigate('login')}
                  type="primary"
                  size="large"
                  fullWidth
                  style={styles.backButton}
                />
              </View>
            )}
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Remember your password? </Text>
            <Text 
              style={styles.footerLink}
              onPress={() => navigation.navigate('login')}
            >
              Login
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xxl,
    paddingHorizontal: isTablet ? spacing.xxl : spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: isTablet ? scaleHeight(80) : scaleHeight(60),
    marginBottom: isTablet ? scaleHeight(60) : scaleHeight(40),
  },
  logo: {
    width: isTablet ? scaleWidth(120) : scaleWidth(80),
    height: isTablet ? scaleWidth(120) : scaleWidth(80),
    marginBottom: spacing.md,
  },
  appName: {
    fontSize: isTablet ? fontSize.xxl : fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: spacing.xs,
  },
  formContainer: {
    width: isTablet ? '70%' : '100%',
    alignSelf: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: isTablet ? fontSize.xl : fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputField: {
    marginBottom: spacing.lg,
  },
  resetButton: {
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    color: theme.colors.textSecondary,
  },
  footerLink: {
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  successTitle: {
    fontSize: isTablet ? fontSize.xl : fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  successMessage: {
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  backButton: {
    marginTop: spacing.lg,
  },
});

export default ResetPasswordScreen;
