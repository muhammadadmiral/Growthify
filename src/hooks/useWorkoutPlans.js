// src/services/workoutService.js
import { 
    collection, 
    doc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    getDocs, 
    getDoc, 
    query, 
    where, 
    serverTimestamp,
    increment 
  } from 'firebase/firestore';
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { db, storage } from '../config/firebase'
  
  /**
   * Get all workout plans for a specific user
   */
  const useWorkoutPlans = () => {
    try {
        const q = query(collection(db, 'workoutPlans'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching workout plans:', error);
      throw new Error('Failed to fetch workout plans');
    }
  };
  
  /**
   * Save a new workout plan
   */
  export const saveWorkoutPlan = async (userId, planData) => {
    try {
      // Add metadata
      const dataToSave = {
        ...planData,
        userId,
        created: serverTimestamp(),
        lastUsed: serverTimestamp(),
        completedSessions: 0
      };
      
      // Save to Firestore
      const docRef = await addDoc(collection(db, 'workoutPlans'), dataToSave);
      
      // Return saved plan with ID
      return {
        id: docRef.id,
        ...dataToSave,
        // Convert timestamps to ISO strings for client use
        created: new Date().toISOString(),
        lastUsed: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error saving workout plan:', error);
      throw new Error('Failed to save workout plan');
    }
  };
  
  /**
   * Update an existing workout plan
   */
  export const updateWorkoutPlan = async (planId, updateData) => {
    try {
      const planRef = doc(db, 'workoutPlans', planId);
      
      // Add updated timestamp
      const dataToUpdate = {
        ...updateData,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(planRef, dataToUpdate);
      
      // Get updated document
      const updatedDoc = await getDoc(planRef);
      
      if (!updatedDoc.exists()) {
        throw new Error('Workout plan not found');
      }
      
      return {
        id: updatedDoc.id,
        ...updatedDoc.data()
      };
    } catch (error) {
      console.error('Error updating workout plan:', error);
      throw new Error('Failed to update workout plan');
    }
  };
  
  /**
   * Delete a workout plan
   */
  export const deleteWorkoutPlan = async (planId) => {
    try {
      const planRef = doc(db, 'workoutPlans', planId);
      await deleteDoc(planRef);
      return true;
    } catch (error) {
      console.error('Error deleting workout plan:', error);
      throw new Error('Failed to delete workout plan');
    }
  };
  
  /**
   * Track a completed workout session
   */
  export const trackWorkoutSession = async (userId, planId) => {
    try {
      const planRef = doc(db, 'workoutPlans', planId);
      
      // Increment completed sessions counter and update last used timestamp
      await updateDoc(planRef, {
        completedSessions: increment(1),
        lastUsed: serverTimestamp()
      });
      
      // Optionally, you can also track session history in a separate collection
      await addDoc(collection(db, 'workoutSessions'), {
        userId,
        planId,
        completedAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Error tracking workout session:', error);
      throw new Error('Failed to track workout session');
    }
  };
  
  /**
   * Upload workout plan image
   */
  export const uploadWorkoutImage = async (userId, imageFile) => {
    try {
      // Create a storage reference
      const storageRef = ref(storage, `workout_images/${userId}/${Date.now()}_${imageFile.name}`);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, imageFile);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading workout image:', error);
      throw new Error('Failed to upload workout image');
    }
  };
  
  /**
   * Get featured/recommended workout plans
   */
  export const getFeaturedWorkoutPlans = async (limit = 5) => {
    try {
      // This is a simplified example - in a real app, you might have a field like 'featured: true'
      // or order by popularity, rating, etc.
      const q = query(collection(db, 'workoutPlans'), where('isPublic', '==', true));
      const querySnapshot = await getDocs(q);
      
      const plans = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Return limited number of plans
      return plans.slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured workout plans:', error);
      throw new Error('Failed to fetch featured workout plans');
    }
  };
  export default useWorkoutPlans;
