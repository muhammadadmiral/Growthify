// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc
} from 'firebase/firestore';


console.log('Firebase Config:', {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
  });
  
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Provider untuk login sosial
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


// src/config/firebase.js
export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      // Validasi input
      if (!name || name.trim() === '') {
        throw new Error('Nama harus diisi');
      }
  
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Email tidak valid');
      }
  
      if (!password || password.length < 8) {
        throw new Error('Password minimal 8 karakter');
      }
  
      // Buat user dengan email dan password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Kirim email verifikasi
      await sendEmailVerification(user);
  
      // Simpan data tambahan ke Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name.trim(),
        email,
        photoURL: user.photoURL || null,
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
  
      // Tangani error spesifik dari Firebase
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('Email sudah terdaftar. Gunakan email lain.');
        case 'auth/invalid-email':
          throw new Error('Format email tidak valid.');
        case 'auth/weak-password':
          throw new Error('Password terlalu lemah. Gunakan password yang lebih kuat.');
        default:
          // Jika error kustom yang sudah ditambahkan sebelumnya
          if (error.message) {
            throw error;
          }
          
          // Error umum
          throw new Error('Registrasi gagal. Silakan coba lagi.');
      }
    }
  };
  
  // Tambahkan fungsi untuk memeriksa status profil
  export const checkProfileCompletion = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        const userData = userSnap.data();
        return userData.profileCompleted || false;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking profile completion:', error);
      return false;
    }
  };


// Fungsi login
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update last login di Firestore
    await updateDoc(doc(db, 'users', user.uid), {
      lastLogin: new Date()
    });

    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Login dengan Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Simpan/update data user ke Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Buat dokumen baru jika user belum ada
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        createdAt: new Date(),
        lastLogin: new Date(),
        role: 'user',
        status: 'active'
      });
    } else {
      // Update last login jika user sudah ada
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

// Login dengan Facebook (serupa dengan Google)
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        createdAt: new Date(),
        lastLogin: new Date(),
        role: 'user',
        status: 'active'
      });
    } else {
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

// Fungsi reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Fungsi logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan detail user dari Firestore
export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};


export default app;