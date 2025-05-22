# African Service Finder App

A mobile application built with React Native and Expo that helps users discover, book, and rate local service providers across Africa. The app allows users to find services based on their location, view service provider details, book appointments, and leave ratings and reviews.

## Features

- **Authentication**: Login and signup screens for users to register as customers or service providers
- **Service Discovery**: Home screen with categorized services and search functionality
- **Service Details**: Detailed service provider information with ratings, reviews, and location
- **Booking System**: Ability to book services with date and time selection
- **Booking History**: Screen to view past and upcoming service appointments
- **Notifications**: System to alert users about booking confirmations, reminders, and promotions
- **Favorites**: Feature to save and quickly access preferred service providers
- **User Profiles**: Personal profile management for both customers and service providers
- **Reviews & Ratings**: Ability to rate and review service providers
- **Firebase Integration**: Full backend integration with Firebase for authentication, database, and storage

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- Expo CLI installed globally (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/african-service-finder.git
   cd african-service-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run the app:
   - **On Android**: Scan the QR code with the Expo Go app
   - **On iOS**: Use the built-in QR code scanner in the Camera app
   - **On Emulator**: Press 'a' for Android or 'i' for iOS in the terminal

## Project Structure

```
african-service-finder/
├── src/
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.js
│   │   ├── ServiceListScreen.js
│   │   └── ServiceDetailScreen.js
│   ├── components/        # Reusable components
│   ├── services/          # API and service files
│   └── navigation/        # Navigation configuration
├── assets/                # Images, fonts, etc.
├── App.js                # Main application component
└── package.json          # Project dependencies and scripts
```

## Dependencies

- React Native
- Expo
- React Navigation
- React Native Maps
- React Native Ratings
- Expo Location
- React Native Vector Icons

## Configuration

1. **Google Maps API Key**: 
   - Get an API key from the [Google Cloud Console](https://cloud.google.com/console/google/maps-apis/overview)
   - Add it to your `app.json`:
     ```json
     "android": {
       "config": {
         "googleMaps": {
           "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
         }
       }
     }
     ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.

## Deployment to App Stores

### Prerequisites

1. **Firebase Setup**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google Sign-in)
   - Set up Firestore Database
   - Configure Firebase Storage
   - Update the Firebase configuration in `src/config/firebase.js`
   - Add the Google Services files:
     - For Android: Place `google-services.json` in the project root
     - For iOS: Place `GoogleService-Info.plist` in the project root

2. **EAS Setup**:
   - Install EAS CLI: `npm install -g eas-cli`
   - Login to your Expo account: `eas login`
   - Configure your project: `eas build:configure`

### Building for App Stores

#### iOS App Store

1. **Prepare your app**:
   - Update app.json with your Apple Developer Team ID and bundle identifier
   - Ensure you have an Apple Developer account ($99/year)

2. **Create a build**:
   ```bash
   eas build --platform ios --profile production
   ```

3. **Submit to App Store**:
   ```bash
   eas submit --platform ios
   ```

4. **Complete App Store Connect setup**:
   - Log in to [App Store Connect](https://appstoreconnect.apple.com/)
   - Complete app information, pricing, and availability
   - Add screenshots and app preview videos
   - Submit for review

#### Google Play Store

1. **Prepare your app**:
   - Update app.json with your package name
   - Create a Google Play Developer account ($25 one-time fee)
   - Create a service account for API access

2. **Create a build**:
   ```bash
   eas build --platform android --profile production
   ```

3. **Submit to Play Store**:
   ```bash
   eas submit --platform android
   ```

4. **Complete Play Console setup**:
   - Log in to [Google Play Console](https://play.google.com/console/)
   - Complete store listing, content rating, and pricing & distribution
   - Add screenshots and promotional graphics
   - Submit for review

### App Store Assets

We've prepared store assets in the `store-assets` directory:

- App store descriptions
- Privacy Policy
- Terms of Service

You'll need to create and add the following assets:

- Screenshots (various device sizes)
- App preview videos (optional)
- Feature graphic (Play Store)
- Promotional graphics

### Production Checklist

- [ ] Firebase configuration is complete with proper API keys
- [ ] App icon and splash screen are properly configured
- [ ] All API keys and sensitive information are secured
- [ ] App has been tested on multiple devices and screen sizes
- [ ] Privacy Policy and Terms of Service are accessible in the app
- [ ] Analytics and crash reporting are configured
- [ ] Push notifications are properly set up
- [ ] App passes App Store and Play Store guidelines
- [ ] Content ratings are appropriate
- [ ] In-app purchases (if any) are properly configured

