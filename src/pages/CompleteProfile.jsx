// src/pages/CompleteProfile.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db, auth, updateUserProfile, uploadProfileImage } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function CompleteProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  
  // Steps of profile setup
  const STEPS = ['basics', 'personal', 'interests', 'goals'];

  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic info
    name: '',
    email: '',
    phone: '',
    profileImage: null,
    profileImageURL: '',
    
    // Personal info
    birthDate: '',
    gender: '',
    occupation: '',
    location: '',
    
    // Interests
    interests: [],
    
    // Goals
    fitnessGoal: '',
    weightGoal: '',
    mindsetGoal: '',
    habitGoal: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Initialize with data from auth provider if available
  useEffect(() => {
    const loadUserData = async () => {
      // Check if we have data from location state (from social login)
      if (location.state?.name || location.state?.email) {
        setFormData(prev => ({
          ...prev,
          name: location.state.name || '',
          email: location.state.email || ''
        }));
      } else if (auth.currentUser) {
        // Otherwise try to get from current user
        const user = auth.currentUser;
        setFormData(prev => ({
          ...prev,
          name: user.displayName || '',
          email: user.email || '',
          phone: user.phoneNumber || '',
          profileImageURL: user.photoURL || ''
        }));
      } else {
        // If no user, redirect to login
        navigate('/login');
      }
    };
    
    loadUserData();
  }, [location.state, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Handle checkbox interests
      setFormData(prev => {
        if (checked) {
          return { ...prev, interests: [...prev.interests, value] };
        } else {
          return { 
            ...prev, 
            interests: prev.interests.filter(interest => interest !== value) 
          };
        }
      });
    } else if (type === 'file') {
      // Handle file upload
      const file = e.target.files[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          profileImage: file,
          // Create a temp URL for preview
          profileImageURL: URL.createObjectURL(file)
        }));
      }
    } else {
      // Handle regular inputs
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate the current step
  const validateCurrentStep = () => {
    const newErrors = {};
    
    // Validate based on current step
    if (STEPS[currentStep] === 'basics') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    else if (STEPS[currentStep] === 'personal') {
      if (!formData.birthDate) {
        newErrors.birthDate = 'Birth date is required';
      }
      
      if (!formData.gender) {
        newErrors.gender = 'Please select your gender';
      }
    }
    else if (STEPS[currentStep] === 'interests') {
      if (formData.interests.length === 0) {
        newErrors.interests = 'Please select at least one interest';
      }
    }
    else if (STEPS[currentStep] === 'goals') {
      // All goals are optional, but at least one is required
      if (!formData.fitnessGoal && !formData.weightGoal && 
          !formData.mindsetGoal && !formData.habitGoal) {
        newErrors.goals = 'Please set at least one goal';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Go to next step
  const handleNextStep = () => {
    if (!validateCurrentStep()) return;
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(((currentStep + 1) / (STEPS.length - 1)) * 100);
    } else {
      handleSubmit();
    }
  };

  // Go to previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress(((currentStep - 1) / (STEPS.length - 1)) * 100);
    }
  };

  // Submit form
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    setIsLoading(true);
    
    try {
      // Get current authenticated user
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No authenticated user');
      }
      
      // Upload profile image if present
      let profileImageURL = formData.profileImageURL;
      if (formData.profileImage) {
        profileImageURL = await uploadProfileImage(currentUser.uid, formData.profileImage);
      }
      
      // Update user profile
      await updateUserProfile(currentUser, {
        displayName: formData.name,
        photoURL: profileImageURL
      });

      // Update document in Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        name: formData.name,
        phone: formData.phone,
        birthDate: formData.birthDate,
        gender: formData.gender,
        occupation: formData.occupation,
        location: formData.location,
        interests: formData.interests,
        goals: {
          fitness: formData.fitnessGoal,
          weight: formData.weightGoal,
          mindset: formData.mindsetGoal,
          habit: formData.habitGoal
        },
        profileImage: profileImageURL,
        profileCompleted: true,
        lastProfileUpdateAt: new Date()
      });

      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Error completing profile:', error);
      setErrors({
        form: 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Available interest options
  const interestOptions = [
    'Personal Development', 
    'Fitness', 
    'Nutrition', 
    'Mental Health', 
    'Career Growth', 
    'Financial Planning', 
    'Technology', 
    'Arts', 
    'Reading', 
    'Travel'
  ];

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (STEPS[currentStep]) {
      case 'basics':
        return (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
              Basic Information
            </h3>
            
            {/* Profile Image Upload */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                Profile Picture
              </label>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {formData.profileImageURL ? (
                    <img 
                      src={formData.profileImageURL} 
                      alt="Profile preview" 
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary-300"
                    />
                  ) : (
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-semibold ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  
                  <label 
                    htmlFor="profileImage" 
                    className={`absolute bottom-0 right-0 p-1 rounded-full cursor-pointer ${
                      isDarkMode ? 'bg-gray-700 text-primary-400 hover:bg-gray-600' : 'bg-white text-primary-600 hover:bg-primary-50'
                    } border ${isDarkMode ? 'border-gray-600' : 'border-neutral-200'} shadow-sm`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input 
                      id="profileImage" 
                      name="profileImage" 
                      type="file" 
                      accept="image/*" 
                      className="sr-only" 
                      onChange={handleChange}
                    />
                  </label>
                </div>
                
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
                  <p>Add a profile picture (optional)</p>
                  <p className="text-xs mt-1">JPG, PNG or GIF, max 5MB</p>
                </div>
              </div>
            </div>
            
            {/* Name Field */}
            <div className="mb-4">
              <label 
                htmlFor="name" 
                className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                Full Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm 
                  ${errors.name 
                    ? isDarkMode ? 'border-red-700 bg-red-900/10' : 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
                  }
                  focus:outline-none sm:text-sm
                `}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className={`mt-1 text-xs ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>{errors.name}</p>
              )}
            </div>
            
            {/* Email Field - read only since it comes from auth */}
            <div className="mb-4">
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                Email Address
              </label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                readOnly
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm 
                  ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-neutral-300 bg-neutral-50 text-neutral-500'}
                  focus:outline-none sm:text-sm cursor-not-allowed
                `}
              />
              <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                Email address cannot be changed
              </p>
            </div>
            
            {/* Phone Field */}
            <div className="mb-4">
              <label 
                htmlFor="phone" 
                className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                Phone Number
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm 
                  ${errors.phone 
                    ? isDarkMode ? 'border-red-700 bg-red-900/10' : 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
                  }
                  focus:outline-none sm:text-sm
                `}
                placeholder="+1 (123) 456-7890"
              />
              {errors.phone ? (
                <p className={`mt-1 text-xs ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>{errors.phone}</p>
              ) : (
                <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                  Include country code (e.g., +1 for US)
                </p>
              )}
            </div>
          </motion.div>
        );
      
      case 'personal':
        return (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
              Personal Information
            </h3>
            
            {/* Birth Date Field */}
            <div className="mb-4">
              <label 
                htmlFor="birthDate" 
                className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                Birth Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input 
                type="date" 
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm 
                  ${errors.birthDate 
                    ? isDarkMode ? 'border-red-700 bg-red-900/10' : 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
                  }
                  focus:outline-none sm:text-sm
                `}
              />
              {errors.birthDate && (
                <p className={`mt-1 text-xs ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>{errors.birthDate}</p>
              )}
            </div>
            
            {/* Gender Field */}
            <div className="mb-4">
              <label 
                className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                Gender
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className={`mt-1 flex flex-wrap gap-4 ${errors.gender ? 'pb-1' : ''}`}>
                {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(gender => (
                  <label 
                    key={gender} 
                    className={`relative flex items-center px-3 py-2 rounded-md border cursor-pointer ${
                      formData.gender === gender
                        ? isDarkMode 
                          ? 'bg-primary-900/30 border-primary-500 text-primary-400' 
                          : 'bg-primary-50 border-primary-500 text-primary-700'
                        : isDarkMode
                          ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                          : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    } transition-colors`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-sm">{gender}</span>
                    {formData.gender === gender && (
                      <svg className={`ml-2 h-4 w-4 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className={`mt-1 text-xs ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>{errors.gender}</p>
              )}
            </div>
            
            {/* Occupation Field */}
            <div className="mb-4">
              <label 
                htmlFor="occupation" 
                className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                Occupation
              </label>
              <input 
                type="text" 
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm 
                  ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'}
                  focus:outline-none sm:text-sm
                `}
                placeholder="e.g., Software Engineer, Teacher, Student..."
              />
            </div>
            
            {/* Location Field */}
            <div className="mb-4">
              <label 
                htmlFor="location" 
                className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                Location
              </label>
              <input 
                type="text" 
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm 
                  ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'}
                  focus:outline-none sm:text-sm
                `}
                placeholder="City, Country"
              />
            </div>
          </motion.div>
        );
      
      case 'interests':
        return (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
              Your Interests
            </h3>
            
            <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
              Select areas that interest you. This helps us personalize your growth journey.
            </p>
            
            {/* Interests Selection */}
            <div className="mb-4">
              <div className={`mt-1 grid grid-cols-2 gap-3 ${errors.interests ? 'pb-1' : ''}`}>
                {interestOptions.map(interest => (
                  <label 
                    key={interest} 
                    className={`relative flex items-center px-3 py-2 rounded-md border cursor-pointer ${
                      formData.interests.includes(interest)
                        ? isDarkMode 
                          ? 'bg-primary-900/30 border-primary-500 text-primary-400' 
                          : 'bg-primary-50 border-primary-500 text-primary-700'
                        : isDarkMode
                          ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                          : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    } transition-colors`}
                  >
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-sm">{interest}</span>
                    {formData.interests.includes(interest) && (
                      <svg className={`ml-auto h-4 w-4 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
              {errors.interests && (
                <p className={`mt-1 text-xs ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>{errors.interests}</p>
              )}
            </div>
          </motion.div>
        );
      
      case 'goals':
        return (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
              Set Your Growth Goals
            </h3>
            
            <p className={`mb-6 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
              Define the goals you want to achieve. These help us customize your dashboard and recommendations.
            </p>
            
            {errors.goals && (
              <div className={`mb-4 ${
                isDarkMode ? 'bg-red-900/20 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
              } px-4 py-3 rounded-md text-sm border`}>
                {errors.goals}
              </div>
            )}
            
            {/* Fitness Goal */}
            <div className="mb-4">
              <label 
                htmlFor="fitnessGoal" 
                className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                Fitness Goal
              </label>
              <select
                id="fitnessGoal"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm 
                  ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'}
                  focus:outline-none sm:text-sm
                `}
              >
                <option value="">Select a fitness goal</option>
                <option value="build_muscle">Build Muscle</option>
                <option value="lose_weight">Lose Weight</option>
                <option value="increase_endurance">Increase Endurance</option>
                <option value="improve_flexibility">Improve Flexibility</option>
                <option value="maintain_fitness">Maintain Current Fitness</option>
              </select>
            </div>
            
            {/* Weight Goal */}
            <div className="mb-4">
              <label 
                htmlFor="weightGoal" 
                className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                Weight Goal
              </label>
              <select
                id="weightGoal"
                name="weightGoal"
                value={formData.weightGoal}
                onChange={handleChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm 
                  ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'}
                  focus:outline-none sm:text-sm
                `}
              >
                <option value="">Select a weight goal</option>
                <option value="lose">Lose Weight</option>
                <option value="gain">Gain Weight</option>
                <option value="maintain">Maintain Current Weight</option>
              </select>
            </div>
            
            {/* Mindset Goal */}
            <div className="mb-4">
              <label 
                htmlFor="mindsetGoal" 
                className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                Mindset Goal
              </label>
              <select
                id="mindsetGoal"
                name="mindsetGoal"
                value={formData.mindsetGoal}
                onChange={handleChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm 
                  ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'}
                  focus:outline-none sm:text-sm
                `}
              >
                <option value="">Select a mindset goal</option>
                <option value="reduce_stress">Reduce Stress</option>
                <option value="increase_focus">Increase Focus</option>
                <option value="improve_sleep">Improve Sleep</option>
                <option value="build_confidence">Build Confidence</option>
                <option value="overcome_negativity">Overcome Negative Thinking</option>
              </select>
            </div>
            
            {/* Habit Goal */}
            <div className="mb-4">
              <label 
                htmlFor="habitGoal" 
                className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                Habit Goal
              </label>
              <select
                id="habitGoal"
                name="habitGoal"
                value={formData.habitGoal}
                onChange={handleChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm 
                  ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'}
                  focus:outline-none sm:text-sm
                `}
              >
                <option value="">Select a habit goal</option>
                <option value="morning_routine">Build a Morning Routine</option>
                <option value="break_bad_habit">Break a Bad Habit</option>
                <option value="consistent_exercise">Exercise Consistently</option>
                <option value="