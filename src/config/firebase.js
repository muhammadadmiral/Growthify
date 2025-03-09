// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { 
  updateProfile ,
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword as firebaseSignIn,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  signInWithCredential,
  RecaptchaVerifier,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Update user profile in Firebase Auth
export const updateUserProfile = async (user, profileData) => {
  try {
    await updateProfile(user, profileData);
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Upload profile image to Firebase Storage
export const uploadProfileImage = async (userId, imageFile) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${userId}/${Date.now()}_${imageFile.name}`);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, imageFile);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Email/Password Registration
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Send email verification
    await sendEmailVerification(user);
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      email,
      emailVerified: false,
      profileCompleted: false,
      createdAt: new Date(),
      lastLogin: new Date(),
      role: 'user',
      status: 'active'
    });
    
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Email/Password Login
const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await firebaseSignIn(auth, email, password);
    const user = userCredential.user;
    
    // Update last login timestamp in Firestore
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      lastLogin: new Date()
    });
    
    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Google Sign In
const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Store/update user data in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      // Create new user document if it doesn't exist
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || 'Google User',
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        profileCompleted: false,
        createdAt: new Date(),
        lastLogin: new Date(),
        role: 'user',
        status: 'active'
      });
    } else {
      // Update last login if user already exists
      await updateDoc(userRef, {
        lastLogin: new Date()
      });
    }
    
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Facebook Sign In
const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Get additional user data from Facebook
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    
    // Store/update user data in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      // Create new user document if it doesn't exist
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || 'Facebook User',
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        profileCompleted: false,
        createdAt: new Date(),
        lastLogin: new Date(),
        role: 'user',
        status: 'active'
      });
    } else {
      // Update last login if user already exists
      await updateDoc(userRef, {
        lastLogin: new Date()
      });
    }
    
    return user;
  } catch (error) {
    console.error('Error signing in with Facebook:', error);
    throw error;
  }
};

// Apple Sign In
const signInWithApple = async () => {
  try {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Store/update user data in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Create new user document if it doesn't exist
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || 'Apple User', // Apple might not provide name
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        profileCompleted: false,
        createdAt: new Date(),
        lastLogin: new Date(),
        role: 'user',
        status: 'active'
      });
    } else {
      // Update last login if user already exists
      await updateDoc(userRef, {
        lastLogin: new Date()
      });
    }

    return user;
  } catch (error) {
    console.error('Error signing in with Apple:', error);
    throw error;
  }
};

// Phone authentication - Step 1: Initialize reCAPTCHA verifier
const initializeRecaptcha = (containerId) => {
  try {
    // Create a new RecaptchaVerifier instance
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow sending verification code
        console.log('reCAPTCHA verified');
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        console.log('reCAPTCHA expired');
      }
    });
    
    return window.recaptchaVerifier;
  } catch (error) {
    console.error('Error initializing reCAPTCHA:', error);
    throw error;
  }
};

// Phone authentication - Step 2: Send verification code
const sendPhoneVerificationCode = async (phoneNumber) => {
  try {
    // Initialize reCAPTCHA if not already initialized
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }
    
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    
    // Save confirmation result to window to access it later
    window.confirmationResult = confirmationResult;
    
    return confirmationResult.verificationId;
  } catch (error) {
    console.error('Error sending verification code:', error);
    
    // Reset reCAPTCHA if there's an error
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
    
    throw error;
  }
};

// Phone authentication - Step 3: Verify code and sign in
const verifyPhoneCode = async (verificationId, verificationCode) => {
  try {
    // If using window.confirmationResult from previous step
    if (window.confirmationResult) {
      const result = await window.confirmationResult.confirm(verificationCode);
      const user = result.user;
      
      // Create or update user in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Create new user record
        await setDoc(userRef, {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          name: `User ${user.phoneNumber.slice(-4)}`, // Default name based on last 4 digits
          createdAt: new Date(),
          lastLogin: new Date(),
          profileCompleted: false,
          role: 'user',
          status: 'active'
        });
      } else {
        // Update existing user
        await updateDoc(userRef, {
          lastLogin: new Date(),
          phoneNumber: user.phoneNumber // Update in case it changed
        });
      }
      
      return user;
    } else {
      // If not using window.confirmationResult, use PhoneAuthProvider
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const userCredential = await signInWithCredential(auth, credential);
      return userCredential.user;
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    throw error;
  }
};

// Password reset with custom redirect URL
const sendPasswordResetWithRedirect = async (email, redirectUrl) => {
  try {
    const actionCodeSettings = {
      url: redirectUrl,
      handleCodeInApp: true
    };
    
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Verify password reset code
const verifyPasswordResetCode = async (code) => {
  try {
    // Verify the password reset code is valid
    const email = await auth.verifyPasswordResetCode(code);
    return email;
  } catch (error) {
    console.error('Error verifying password reset code:', error);
    throw error;
  }
};

// Complete password reset
const confirmPasswordReset = async (code, newPassword) => {
  try {
    // Confirm the password reset
    await auth.confirmPasswordReset(code, newPassword);
    return true;
  } catch (error) {
    console.error('Error confirming password reset:', error);
    throw error;
  }
};

// Check if user exists by email
const checkUserExists = async (email) => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
};

// Wrapper function for phone authentication (to match import in SocialLogin.jsx)
const initiatePhoneAuth = async (phoneNumber, containerId = 'recaptcha-container') => {
  try {
    // Initialize reCAPTCHA first
    const recaptchaVerifier = initializeRecaptcha(containerId);
    
    // Then send verification code
    const verificationId = await sendPhoneVerificationCode(phoneNumber);
    
    return {
      verificationId,
      recaptchaVerifier
    };
  } catch (error) {
    console.error('Error initiating phone authentication:', error);
    throw error;
  }
};

export {
  // Firebase services
  auth,
  db,
  
  // Email/Password authentication
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  
  // Social authentication
  signInWithGoogle,
  signInWithFacebook,
  signInWithApple,
  
  // Phone authentication
  initiatePhoneAuth,
  initializeRecaptcha,
  sendPhoneVerificationCode,
  verifyPhoneCode,
  
  // Password reset
  sendPasswordResetWithRedirect,
  verifyPasswordResetCode,
  confirmPasswordReset,
  
  // Utility functions
  checkUserExists,
};