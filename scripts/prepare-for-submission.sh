#!/bin/bash

# Script to prepare African Service Finder app for app store submission
# This script helps with the final steps before building for production

echo "===== African Service Finder: App Store Preparation ====="
echo "This script will help prepare your app for submission to app stores."

# Check if required tools are installed
echo "Checking required tools..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js before continuing."
    exit 1
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm before continuing."
    exit 1
fi

# Check for Expo CLI
if ! command -v expo &> /dev/null; then
    echo "Expo CLI is not installed. Installing now..."
    npm install -g expo-cli
fi

# Check for EAS CLI
if ! command -v eas &> /dev/null; then
    echo "EAS CLI is not installed. Installing now..."
    npm install -g eas-cli
fi

echo "All required tools are installed."

# Install dependencies
echo "Installing project dependencies..."
npm install
echo "Dependencies installed successfully."

# Verify Firebase configuration
echo "Checking Firebase configuration..."
if [ ! -f "./google-services.json" ]; then
    echo "WARNING: google-services.json is missing. This is required for Android builds."
    echo "Please download this file from your Firebase console and place it in the project root."
fi

if [ ! -f "./GoogleService-Info.plist" ]; then
    echo "WARNING: GoogleService-Info.plist is missing. This is required for iOS builds."
    echo "Please download this file from your Firebase console and place it in the project root."
fi

# Check Firebase config in code
if grep -q "YOUR_API_KEY" "./src/config/firebase.js"; then
    echo "WARNING: Firebase configuration in src/config/firebase.js contains placeholder values."
    echo "Please update with your actual Firebase configuration."
fi

# Check app.json configuration
echo "Checking app.json configuration..."
if grep -q "YOUR_GOOGLE_MAPS" "./app.json"; then
    echo "WARNING: app.json contains placeholder Google Maps API keys."
    echo "Please update with your actual API keys before building."
fi

# Check EAS configuration
echo "Checking EAS configuration..."
if grep -q "YOUR_APPLE_ID" "./eas.json"; then
    echo "WARNING: eas.json contains placeholder values for app store submission."
    echo "Please update with your actual credentials before submitting."
fi

# Create necessary directories for app store assets
echo "Setting up app store assets..."
mkdir -p ./store-assets/screenshots/ios
mkdir -p ./store-assets/screenshots/android
mkdir -p ./store-assets/promotional

echo "App store asset directories created. Please add your screenshots and promotional materials."

# Prepare for building
echo "Preparing for building..."
echo "1. Run 'expo prebuild' to generate native projects"
echo "2. Run 'eas build --platform ios --profile production' to build for iOS"
echo "3. Run 'eas build --platform android --profile production' to build for Android"
echo "4. Run 'eas submit' to submit your app to the stores"

echo "===== Preparation Complete ====="
echo "Your app is now ready for final configuration before submission."
echo "Please review the warnings above and complete any missing steps."
echo "Refer to the README.md for detailed submission instructions."
