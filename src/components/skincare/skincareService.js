// src/components/skincare/skincareService.js

// Import the mock data correctly
import skincareProductMockData from './skincareProductMockData';

// Define sample skin profiles
const sampleSkinProfiles = [
  {
    id: 'profile1',
    skinType: 'Dry',
    concerns: ['Dryness', 'Sensitivity', 'Fine Lines'],
    allergies: ['Fragrance', 'Alcohol'],
    currentProducts: ['Gentle Cleanser', 'Hydrating Serum', 'Rich Moisturizer'],
    skinGoals: 'Increase hydration and reduce sensitivity'
  },
  {
    id: 'profile2',
    skinType: 'Oily',
    concerns: ['Acne', 'Blackheads', 'Oiliness'],
    allergies: ['Coconut Oil'],
    currentProducts: ['Salicylic Acid Cleanser', 'Clay Mask', 'Oil-Free Moisturizer'],
    skinGoals: 'Reduce breakouts and control oil'
  },
  {
    id: 'profile3',
    skinType: 'Combination',
    concerns: ['T-Zone Oiliness', 'Dry Cheeks', 'Occasional Breakouts'],
    allergies: [],
    currentProducts: ['Balancing Cleanser', 'Hyaluronic Acid Serum', 'Lightweight Moisturizer'],
    skinGoals: 'Balance skin without over-drying'
  }
];

// Sample skincare routines
const sampleSkincareRoutines = [
  {
    id: 'routine1',
    userId: 'user1',
    name: 'Morning Routine',
    steps: [
      { order: 1, product: 'Gentle Cleanser', instructions: 'Massage onto damp skin and rinse with lukewarm water.' },
      { order: 2, product: 'Vitamin C Serum', instructions: 'Apply 3-4 drops to face and neck, avoiding eye area.' },
      { order: 3, product: 'Moisturizer with SPF', instructions: 'Apply generously to face and neck.' }
    ],
    time: 'morning',
    frequency: 'daily',
    notes: 'If skin feels extra dry, add facial oil to moisturizer.'
  },
  {
    id: 'routine2',
    userId: 'user1',
    name: 'Evening Routine',
    steps: [
      { order: 1, product: 'Oil Cleanser', instructions: 'Apply to dry skin to remove makeup and sunscreen.' },
      { order: 2, product: 'Gentle Cleanser', instructions: 'Second cleanse to remove remaining impurities.' },
      { order: 3, product: 'Retinol Serum', instructions: 'Use only 2-3 times per week to start.' },
      { order: 4, product: 'Night Cream', instructions: 'Apply a generous amount to face and neck.' }
    ],
    time: 'evening',
    frequency: 'daily',
    notes: 'Skip retinol on nights when using exfoliating products.'
  }
];

// Mock service functions that would normally connect to Firebase
const skincareService = {
  // Skin Profile methods
  getSkinProfile: async (userId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return first profile as sample data
    return sampleSkinProfiles[0];
  },
  
  createSkinProfile: async (userId, profileData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Return the created profile with an ID
    return {
      id: 'new-profile-' + Date.now(),
      userId,
      ...profileData,
      createdAt: new Date().toISOString()
    };
  },
  
  updateSkinProfile: async (userId, profileId, profileData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return the updated profile
    return {
      id: profileId,
      userId,
      ...profileData,
      updatedAt: new Date().toISOString()
    };
  },
  
  // Skincare Routine methods
  getSkincareRoutine: async (userId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return sample routines
    return sampleSkincareRoutines;
  },
  
  addRoutineStep: async (userId, stepData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return the new step
    return {
      id: 'step-' + Date.now(),
      ...stepData,
      createdAt: new Date().toISOString()
    };
  },
  
  // Product Recommendations
  getPersonalizedRecommendations: async (userId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter products based on user's skin profile
    // In a real app, this would use an algorithm based on the user's skin profile
    return skincareProductMockData.slice(0, 3);
  },
  
  getAllProducts: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Return all products
    return skincareProductMockData;
  },
  
  getProductsByCategory: async (category) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter products by category
    return skincareProductMockData.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  },
  
  getProductsByConcern: async (concern) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter products by skin concern
    return skincareProductMockData.filter(product => 
      product.concerns.includes(concern)
    );
  }
};

export { skincareService };