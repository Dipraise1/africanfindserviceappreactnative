<<<<<<< HEAD
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { loginUser } from '../services/authService';

import Button from '../components/Button';
import Input from '../components/Input';
import ResponsiveContainer from '../components/ResponsiveContainer';
import { theme } from '../constants/theme';
import { isTablet } from '../utils/responsive';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
=======
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
  StatusBar, ActivityIndicator, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { loginUser, demoSignIn } from '../services/authService';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const goToTabs = () => router.replace('/(tabs)');

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
<<<<<<< HEAD
      // Login with mock auth service
      const userData = await loginUser(email, password);
      
      Alert.alert('Success', 'Logged in successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to home screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'home' }],
            });
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'Something went wrong');
=======
      await loginUser(email.trim(), password);
      goToTabs();
    } catch (err) {
      Alert.alert('Login failed', err.message || 'Something went wrong.');
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    setDemoLoading(true);
    try {
<<<<<<< HEAD
      setIsLoading(true);
      // Mock Google sign-in
      Alert.alert('Google Sign-In', 'Google sign-in would be implemented here');
    } catch (error) {
      Alert.alert('Google Sign-In Failed', error.message || 'Something went wrong');
=======
      await demoSignIn();
      goToTabs();
    } catch {
      Alert.alert('Error', 'Could not start demo session.');
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
    } finally {
      setDemoLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <ResponsiveContainer style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} translucent />
      
      {/* Background Gradient Overlay */}
      <View style={styles.backgroundGradient} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
=======
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F4" />
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
<<<<<<< HEAD
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoWrapper}>
                <Image 
                  source={require('../../assets/icon.png')} 
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.heroTitle}>Welcome Back</Text>
              <Text style={styles.heroSubtitle}>
                Sign in to access thousands of trusted service providers
              </Text>
            </View>
          </View>
          
          {/* Login Form */}
          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Sign In</Text>
              <Text style={styles.formSubtitle}>Enter your credentials to continue</Text>
            </View>
            
            <View style={styles.formFields}>
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
              
              <View style={styles.passwordContainer}>
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  icon="lock-closed-outline"
                  style={styles.inputField}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={theme.colors.textSecondary} 
                  />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={styles.forgotPasswordContainer}
                onPress={() => navigation.navigate('reset-password')}
              >
                <Text style={styles.forgotPasswordText}>
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <Button
                title={isLoading ? "Signing in..." : "Sign In"}
                onPress={handleLogin}
                disabled={isLoading}
                loading={isLoading}
                type="primary"
                size="large"
                fullWidth
                gradient
                style={styles.loginButton}
              />
              
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>
              
              <Button
                title="Google"
                onPress={handleGoogleSignIn}
                type="secondary"
                size="large"
                icon="logo-google"
                fullWidth
                style={styles.socialButton}
              />
              
              {/* Alternative Social Login Options */}
              <View style={styles.socialAlternatives}>
                <TouchableOpacity style={styles.socialAltButton}>
                  <Ionicons name="logo-apple" size={24} color={theme.colors.textPrimary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialAltButton}>
                  <Ionicons name="logo-facebook" size={24} color={theme.colors.info} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialAltButton}>
                  <Ionicons name="logo-twitter" size={24} color={theme.colors.info} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={styles.footerLink}>Create Account</Text>
            </TouchableOpacity>
          </View>
          
          {/* Quick Demo Access */}
          <View style={styles.demoAccess}>
            <Text style={styles.demoTitle}>Demo Access</Text>
            <Text style={styles.demoText}>
              Customer: john@example.com / password123{'\n'}
              Provider: jane@example.com / password123
            </Text>
=======
          {/* Brand */}
          <View style={styles.brand}>
            <View style={styles.logoRing}>
              <Ionicons name="globe-outline" size={36} color="#FFFFFF" />
            </View>
            <Text style={styles.appName}>African Service Finder</Text>
            <Text style={styles.tagline}>Trusted professionals, near you</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome back</Text>
            <Text style={styles.cardSub}>Sign in to continue</Text>

            {/* Email */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Email address</Text>
              <View style={[styles.inputRow, focusedField === 'email' && styles.inputFocused]}>
                <Ionicons name="mail-outline" size={18} color={focusedField === 'email' ? '#1B4D3E' : '#9A9A9A'} />
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor="#9A9A9A"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.inputRow, focusedField === 'pw' && styles.inputFocused]}>
                <Ionicons name="lock-closed-outline" size={18} color={focusedField === 'pw' ? '#1B4D3E' : '#9A9A9A'} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  placeholderTextColor="#9A9A9A"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPw}
                  onFocus={() => setFocusedField('pw')}
                  onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity onPress={() => setShowPw(v => !v)}>
                  <Ionicons name={showPw ? 'eye-off-outline' : 'eye-outline'} size={18} color="#9A9A9A" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgot} onPress={() => {}}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Sign In */}
            <TouchableOpacity
              style={[styles.btn, styles.btnPrimary, loading && styles.btnDisabled]}
              onPress={handleLogin}
              disabled={loading || demoLoading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color="#FFFFFF" />
                : <Text style={styles.btnPrimaryText}>Sign In</Text>
              }
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.divLine} />
              <Text style={styles.divText}>or</Text>
              <View style={styles.divLine} />
            </View>

            {/* Demo */}
            <TouchableOpacity
              style={[styles.btn, styles.btnDemo, demoLoading && styles.btnDisabled]}
              onPress={handleDemo}
              disabled={loading || demoLoading}
              activeOpacity={0.85}
            >
              {demoLoading ? (
                <ActivityIndicator color="#1B4D3E" />
              ) : (
                <>
                  <Ionicons name="play-circle-outline" size={20} color="#1B4D3E" style={{ marginRight: 8 }} />
                  <Text style={styles.btnDemoText}>Try Demo — No sign up needed</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.footerLink}>Create one</Text>
            </TouchableOpacity>
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.5,
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoWrapper: {
    width: isTablet ? 100 : 80,
    height: isTablet ? 100 : 80,
    borderRadius: isTablet ? 50 : 40,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  logo: {
    width: isTablet ? 60 : 48,
    height: isTablet ? 60 : 48,
  },
  heroTitle: {
    ...theme.typography.display,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...theme.typography.bodySecondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.md,
    lineHeight: 24,
  },
  formCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.large,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  formTitle: {
    ...theme.typography.title,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  formSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  formFields: {
    marginBottom: theme.spacing.xl,
  },
  inputField: {
    marginBottom: theme.spacing.lg,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordToggle: {
    position: 'absolute',
    right: theme.spacing.md,
    top: 42, // Adjust based on input height
    padding: theme.spacing.xs,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: theme.spacing.sm,
  },
  forgotPasswordText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  actionButtons: {
    gap: theme.spacing.lg,
  },
  loginButton: {
    ...theme.shadows.medium,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    ...theme.typography.caption,
    color: theme.colors.textTertiary,
    paddingHorizontal: theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  socialButton: {
    borderColor: theme.colors.border,
    backgroundColor: 'transparent',
  },
  socialAlternatives: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  socialAltButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  footerText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  footerLink: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  demoAccess: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  demoTitle: {
    ...theme.typography.subtitle,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  demoText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
=======
  safe:     { flex: 1, backgroundColor: '#FAF7F4' },
  scroll:   { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)

  brand: { alignItems: 'center', paddingTop: 48, paddingBottom: 32 },
  logoRing: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#1B4D3E',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#1B4D3E', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, shadowRadius: 16, elevation: 8,
  },
  appName:  { fontSize: 20, fontWeight: '800', color: '#1A1A1A', letterSpacing: -0.3 },
  tagline:  { fontSize: 13, color: '#6B6B6B', marginTop: 4 },

  card: {
    backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24,
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 16, elevation: 5,
  },
  cardTitle: { fontSize: 24, fontWeight: '800', color: '#1A1A1A', letterSpacing: -0.5 },
  cardSub:   { fontSize: 14, color: '#6B6B6B', marginTop: 4, marginBottom: 24 },

  fieldWrap: { marginBottom: 16 },
  label:     { fontSize: 13, fontWeight: '600', color: '#4A4A4A', marginBottom: 8 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FAF7F4', borderRadius: 14,
    borderWidth: 1.5, borderColor: '#E8E0D5',
    paddingHorizontal: 14, paddingVertical: 13, gap: 10,
  },
  inputFocused: { borderColor: '#1B4D3E', backgroundColor: '#F0F7F4' },
  input:    { flex: 1, fontSize: 15, color: '#1A1A1A' },

  forgot:     { alignItems: 'flex-end', marginBottom: 24, marginTop: -4 },
  forgotText: { fontSize: 13, color: '#1B4D3E', fontWeight: '600' },

  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderRadius: 14, paddingVertical: 16,
  },
  btnPrimary:     { backgroundColor: '#1B4D3E' },
  btnPrimaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  btnDemo: {
    backgroundColor: '#F0F7F4', borderWidth: 1.5,
    borderColor: '#1B4D3E', marginTop: 0,
  },
  btnDemoText:  { color: '#1B4D3E', fontSize: 15, fontWeight: '700' },
  btnDisabled:  { opacity: 0.6 },

  divider:  { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  divLine:  { flex: 1, height: 1, backgroundColor: '#E8E0D5' },
  divText:  { marginHorizontal: 12, fontSize: 13, color: '#9A9A9A', fontWeight: '500' },

  footer:     { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  footerText: { fontSize: 14, color: '#6B6B6B' },
  footerLink: { fontSize: 14, color: '#1B4D3E', fontWeight: '700' },
});
