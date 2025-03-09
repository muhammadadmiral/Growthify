// src/components/skincare/skincareService.js
import { 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    collection, 
    query, 
    where, 
    getDocs,
    addDoc,
    deleteDoc
  } from 'firebase/firestore';
  import { db } from '../../config/firebase';
  import { skincareProductMockData } from './skincareProductMockData';
  
  export const skincareService = {
    // User Skin Profile Operations
    async createSkinProfile(userId, skinProfile) {
      try {
        const profileRef = doc(db, 'users', userId, 'skincare', 'profile');
        await setDoc(profileRef, skinProfile, { merge: true });
        return skinProfile;
      } catch (error) {
        console.error('Error creating skin profile:', error);
        throw error;
      }
    },
  
    async getSkinProfile(userId) {
      try {
        const profileRef = doc(db, 'users', userId, 'skincare', 'profile');
        const profileSnap = await getDoc(profileRef);
        return profileSnap.exists() ? profileSnap.data() : null;
      } catch (error) {
        console.error('Error fetching skin profile:', error);
        throw error;
      }
    },
  
    async updateSkinProfile(userId, updates) {
      try {
        const profileRef = doc(db, 'users', userId, 'skincare', 'profile');
        await updateDoc(profileRef, updates);
        return { ...updates };
      } catch (error) {
        console.error('Error updating skin profile:', error);
        throw error;
      }
    },
  
    // Skincare Routine Operations
    async addRoutineStep(userId, step) {
      try {
        const routineRef = collection(db, 'users', userId, 'skincare', 'routine');
        const docRef = await addDoc(routineRef, {
          ...step,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        return { id: docRef.id, ...step };
      } catch (error) {
        console.error('Error adding routine step:', error);
        throw error;
      }
    },
  
    async getSkincareRoutine(userId) {
      try {
        const routineRef = collection(db, 'users', userId, 'skincare', 'routine');
        const routineQuery = query(routineRef, where('userId', '==', userId));
        const routineSnapshot = await getDocs(routineQuery);
        return routineSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching skincare routine:', error);
        throw error;
      }
    },
  
    async updateRoutineStep(userId, stepId, updates) {
      try {
        const stepRef = doc(db, 'users', userId, 'skincare', 'routine', stepId);
        await updateDoc(stepRef, {
          ...updates,
          updatedAt: new Date()
        });
        return { id: stepId, ...updates };
      } catch (error) {
        console.error('Error updating routine step:', error);
        throw error;
      }
    },
  
    async deleteRoutineStep(userId, stepId) {
      try {
        const stepRef = doc(db, 'users', userId, 'skincare', 'routine', stepId);
        await deleteDoc(stepRef);
        return stepId;
      } catch (error) {
        console.error('Error deleting routine step:', error);
        throw error;
      }
    },
  
    // Product Recommendations
    async getPersonalizedRecommendations(userId) {
      try {
        // Fetch user's skin profile
        const skinProfile = await this.getSkinProfile(userId);
        
        // If no profile, return mock data
        if (!skinProfile) {
          return skincareProductMockData;
        }
  
        // Filter products based on skin profile
        const recommendations = skincareProductMockData.filter(product => 
          // Check skin type compatibility
          product.suitableSkinTypes.some(type => 
            skinProfile.skinType.toLowerCase().includes(type.toLowerCase())
          ) &&
          // Check target concerns
          product.targetConcerns.some(concern => 
            skinProfile.concerns?.some(userConcern => 
              concern.toLowerCase().includes(userConcern.toLowerCase())
            )
          )
        ).map(product => ({
          ...product,
          matchPercentage: this.calculateProductMatch(skinProfile, product)
        }))
        .sort((a, b) => b.matchPercentage - a.matchPercentage);
  
        return recommendations;
      } catch (error) {
        console.error('Error fetching personalized recommendations:', error);
        return skincareProductMockData; // Fallback to mock data
      }
    },
  
    // Calculate product match percentage
    calculateProductMatch(skinProfile, product) {
      let matchScore = 0;
      const totalPossibleScore = 100;
  
      // Skin Type Match (30%)
      const skinTypeMatch = product.suitableSkinTypes.some(type => 
        skinProfile.skinType.toLowerCase().includes(type.toLowerCase())
      );
      matchScore += skinTypeMatch ? 30 : 0;
  
      // Concerns Match (40%)
      const concernsMatch = product.targetConcerns.filter(concern => 
        skinProfile.concerns?.some(userConcern => 
          concern.toLowerCase().includes(userConcern.toLowerCase())
        )
      ).length;
      matchScore += (concernsMatch / product.targetConcerns.length) * 40;
  
      // Sensitivities Check (30%)
      const sensitivityCheck = skinProfile.sensitivities?.every(sensitivity => 
        !product.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(sensitivity.toLowerCase())
        )
      ) ?? true;
      matchScore += sensitivityCheck ? 30 : 0;
  
      return Math.min(Math.round(matchScore), 100);
    }
  };  