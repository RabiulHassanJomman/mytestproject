# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `cuet-cse24` (or any name you prefer)
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location closest to your users
5. Click "Done"

## Step 3: Get Your Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "CUET CSE-24 Website")
6. Copy the configuration object

## Step 4: Update Configuration

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};
```

## Step 5: Set Up Security Rules (Optional)

1. In Firestore Database, go to "Rules" tab
2. Update the rules to allow read/write access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // For development only
    }
  }
}
```

## Step 6: Test Your Setup

1. Open your website
2. Go to the admin panel
3. Try adding/editing events
4. Check if data appears in Firebase Console

## Security Notes

⚠️ **For Production:**

- Update Firestore rules to restrict access
- Add proper authentication
- Use environment variables for API keys

## Troubleshooting

- **"Firebase not defined"**: Check if Firebase scripts are loaded
- **"Permission denied"**: Check Firestore security rules
- **"Network error"**: Check internet connection and API key

## Free Tier Limits

- 1GB stored data
- 50,000 reads/day
- 20,000 writes/day
- Perfect for your CT events project!

## Step 7: Enable Authentication (Google Sign-In)

1. In Firebase Console, go to Authentication → Sign-in method
2. Enable Google provider
3. Add your site origin to Authorized domains (e.g., localhost, your domain)
4. Optionally restrict sign-in to the CUET student domain in the app code (already handled via validation)
