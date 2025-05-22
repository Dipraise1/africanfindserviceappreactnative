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
  Dimensions,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { loginUser, signInWithGoogle } from '../services/authService';

import ResponsiveContainer from '../components/ResponsiveContainer';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../constants/theme';
import { isTablet, scaleWidth, scaleHeight, fontSize, spacing, borderRadius } from '../utils/responsive';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // Login with Firebase
      const userData = await loginUser(email, password);
      
      // Navigate to home screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'home' }],
      });
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      // Sign in with Google using Firebase
      const userData = await signInWithGoogle();
      
      // Navigate to home screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'home' }],
      });
    } catch (error) {
      Alert.alert('Google Sign-In Failed', error.message || 'Something went wrong');
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
            <Text style={styles.tagline}>Find trusted local services</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            
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
            
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              icon="lock-closed-outline"
              style={styles.inputField}
            />
            
            <View style={styles.forgotPasswordContainer}>
              <Text 
                style={styles.forgotPasswordText}
                onPress={() => navigation.navigate('reset-password')}
              >
                Forgot Password?
              </Text>
            </View>
            
            <Button
              title={isLoading ? "Logging in..." : "Login"}
              onPress={handleLogin}
              disabled={isLoading}
              loading={isLoading}
              type="primary"
              size="large"
              fullWidth
              style={styles.loginButton}
            />
            
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>
            
            <Button
              title="Continue with Google"
              onPress={handleGoogleSignIn}
              type="outline"
              size="large"
              icon="logo-google"
              fullWidth
              style={styles.socialButton}
              textStyle={styles.socialButtonText}
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Text 
              style={styles.footerLink}
              onPress={() => navigation.navigate('signup')}
            >
              Sign Up
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
  tagline: {
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    color: theme.colors.textSecondary,
  },
  formContainer: {
    width: isTablet ? '70%' : '100%',
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: isTablet ? fontSize.xxl : fontSize.xl,
    fontWeight: 'bold',
    marginBottom: spacing.xl,
    color: theme.colors.textPrimary,
    textAlign: isTablet ? 'center' : 'left',
  },
  inputField: {
    marginBottom: spacing.lg,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: spacing.xl,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: fontSize.sm,
  },
  loginButton: {
    marginBottom: spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: theme.colors.textSecondary,
    fontSize: fontSize.sm,
  },
  socialButton: {
    marginBottom: spacing.xl,
  },
  socialButtonText: {
    color: theme.colors.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: fontSize.sm,
  },
  footerLink: {
    color: theme.colors.primary,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
