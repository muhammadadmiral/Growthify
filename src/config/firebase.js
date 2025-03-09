// Enhanced auth methods to add to firebase.js

// Import additional Firebase auth providers
import { 
  RecaptchaVerifier,
  signInWithPopup, 
  OAuthProvider,
  PhoneAuthProvider,
  signInWithPhoneNumber
} from 'firebase/auth';

// Apple Sign In
export const signInWithApple = async () => {
  try {
    const provider = new OAuthProvider('apple.com');
    // Add scopes if needed
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
export const initializeRecaptcha = (containerId) => {
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
export const sendPhoneVerificationCode = async (phoneNumber) => {
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
export const verifyPhoneCode = async (verificationId, verificationCode) => {
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
export const sendPasswordResetWithRedirect = async (email, redirectUrl) => {
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
export const verifyPasswordResetCode = async (code) => {
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
export const confirmPasswordReset = async (code, newPassword) => {
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
export const checkUserExists = async (email) => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
};