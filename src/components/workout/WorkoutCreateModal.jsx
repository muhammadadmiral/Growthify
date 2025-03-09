import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, setDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext';
import { db, storage } from '../../config/firebaseConfig';
import { useWorkoutPlans } from '../../hooks/useWorkoutPlans';


const WorkoutCreateModal = ({ 
    isOpen, 
    onClose, 
    initialPlan = null, 
    isDarkMode, 
    language 
  }) => {
    const { createWorkoutPlan } = useWorkoutPlans();
  
    // In your handleSubmit method
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!validateForm()) return;
  
      setIsSubmitting(true);
  
      try {
        // Use the createWorkoutPlan method from the hook
        const newPlan = await createWorkoutPlan(formData);
        
        // Optional: you can pass the new plan back to parent component
        onSave && onSave(newPlan);
        
        // Close the modal
        onClose();
      } catch (error) {
        // Handle error (show error message)
        console.error('Error creating workout plan:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
  
  // Translation content
  const translations = {
    en: {
      title: "Create New Workout Plan",
      basicInfo: "Basic Information",
      planTitle: "Plan Title",
      planTitlePlaceholder: "Enter plan title",
      description: "Description",
      descriptionPlaceholder: "Briefly describe this workout plan",
      category: "Category",
      categoryOptions: {
        strength: "Strength",
        cardio: "Cardio",
        flexibility: "Flexibility"
      },
      level: "Fitness Level",
      levelOptions: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        all: "All Levels"
      },
      frequency: "Weekly Frequency",
      timesPerWeek: "times per week",
      duration: "Duration (minutes)",
      schedule: "Schedule",
      days: {
        monday: "Monday",
        tuesday: "Tuesday", 
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday"
      },
      addExercise: "Add Exercise",
      exerciseName: "Exercise Name",
      exerciseNamePlaceholder: "Enter exercise name",
      sets: "Sets",
      reps: "Reps",
      rest: "Rest (seconds)",
      notes: "Notes",
      notesPlaceholder: "Any special instructions",
      cancel: "Cancel",
      save: "Save Plan",
      requiredField: "This field is required",
      selectDays: "Select at least one day",
      addExercises: "Add at least one exercise",
      coverImage: "Cover Image",
      customImage: "Custom Image",
      recommendedImage: "Recommended Image",
      systemImages: [
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
      ]
    },
    id: {
      title: "Buat Rencana Latihan Baru",
      // ... (rest of the Indonesian translations, similar to English structure)
    }
  };

  const t = translations[language] || translations.en;
  const { currentUser } = useAuth();

  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'strength',
    level: 'beginner',
    frequency: 3,
    duration: 45,
    schedule: [],
    exercises: [],
    image: null
  });

  // State for form validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect to populate form if editing an existing plan
  useEffect(() => {
    if (initialPlan) {
      setFormData({
        ...initialPlan,
        category: initialPlan.category || 'strength',
        level: initialPlan.level || 'beginner',
        frequency: initialPlan.frequency || 3,
        duration: initialPlan.duration || 45,
        schedule: initialPlan.schedule || [],
        exercises: initialPlan.exercises || [],
        image: initialPlan.image || null
      });
    }
  }, [initialPlan]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle schedule day toggle
  const toggleScheduleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.includes(day)
        ? prev.schedule.filter(d => d !== day)
        : [...prev.schedule, day]
    }));
  };

  // Handle exercise management
  const addExercise = () => {
    setFormData(prev => ({
      ...prev,
      exercises: [...prev.exercises, {
        id: `ex${prev.exercises.length + 1}`,
        name: '',
        sets: 3,
        reps: 10,
        rest: 60,
        notes: ''
      }]
    }));
  };

  const updateExercise = (index, updates) => {
    const newExercises = [...formData.exercises];
    newExercises[index] = { ...newExercises[index], ...updates };
    setFormData(prev => ({
      ...prev,
      exercises: newExercises
    }));
  };

  const removeExercise = (index) => {
    const newExercises = formData.exercises.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      exercises: newExercises
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert(t.imageTypeError);
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert(t.imageSizeLimit);
      return;
    }

    try {
      // Upload to Firebase Storage
      const storageRef = ref(storage, `workout_plan_images/${currentUser.uid}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setFormData(prev => ({
        ...prev,
        image: downloadURL
      }));
    } catch (error) {
      console.error('Image upload error:', error);
      alert(t.imageUploadError);
    }
  };

  // Select system image
  const selectSystemImage = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = t.requiredField;
    }

    if (!formData.description.trim()) {
      newErrors.description = t.requiredField;
    }

    if (formData.schedule.length === 0) {
      newErrors.schedule = t.selectDays;
    }

    if (formData.exercises.length === 0) {
      newErrors.exercises = t.addExercises;
    } else {
      // Validate each exercise
      formData.exercises.forEach((exercise, index) => {
        if (!exercise.name.trim()) {
          newErrors[`exercise${index}`] = t.requiredField;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare workout plan data
      const workoutPlanData = {
        ...formData,
        created: new Date().toISOString(),
        lastUsed: new Date().toISOString(),
        completedSessions: 0,
        userId: currentUser.uid // Associate with user
      };

      // Save to Firestore
      const workoutPlansRef = collection(db, 'workoutPlans');
      const newDocRef = doc(workoutPlansRef);
      await setDoc(newDocRef, {
        ...workoutPlanData,
        id: newDocRef.id // Use Firestore's auto-generated ID
      });

      // Call onSave callback (if provided)
      onSave && onSave(workoutPlanData);

      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        category: 'strength',
        level: 'beginner',
        frequency: 3,
        duration: 45,
        schedule: [],
        exercises: [],
        image: null
      });
      onClose();
    } catch (error) {
      console.error('Error saving workout plan:', error);
      // Handle error (show error message, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render exercise list
  const renderExercises = () => {
    return formData.exercises.map((exercise, index) => (
      <div 
        key={exercise.id} 
        className={`p-4 rounded-lg border ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-neutral-200'
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            Exercise {index + 1}
          </h4>
          <button
            type="button"
            onClick={() => removeExercise(index)}
            className={`text-red-500 hover:bg-red-50 p-1 rounded-full ${
              isDarkMode 
                ? 'hover:bg-red-900/20' 
                : 'hover:bg-red-50'
            }`}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </button>
        </div>

        {/* Exercise Name */}
        <div className="mb-3">
          <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
            {t.exerciseName}
          </label>
          <input
            type="text"
            value={exercise.name}
            onChange={(e) => updateExercise(index, { name: e.target.value })}
            placeholder={t.exerciseNamePlaceholder}
            className={`w-full p-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-neutral-300 text-neutral-900'
            } ${errors[`exercise${index}`] ? 'border-red-500' : ''}`}
          />
          {errors[`exercise${index}`] && (
            <p className="text-red-500 text-sm mt-1">{errors[`exercise${index}`]}</p>
          )}
        </div>

        {/* Exercise Details */}
        <div className="grid grid-cols-3 gap-3">
          {/* Sets */}
          <div>
            <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
              {t.sets}
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={exercise.sets}
              onChange={(e) => updateExercise(index, { sets: parseInt(e.target.value) })}
              className={`w-full p-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-neutral-300 text-neutral-900'
              }`}
            />
          </div>

          {/* Reps */}
          <div>
            <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
              {t.reps}
            </label>
            <input
              type="text"
              value={exercise.reps}
              onChange={(e) => updateExercise(index, { reps: e.target.value })}
              placeholder="10"
              className={`w-full p-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-neutral-300 text-neutral-900'
              }`}
            />
          </div>

          {/* Rest */}
          <div>
            <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
              {t.rest}
            </label>
            <input
              type="number"
              min="0"
              max="300"
              value={exercise.rest}
              onChange={(e) => updateExercise(index, { rest: parseInt(e.target.value) })}
              className={`w-full p-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-neutral-300 text-neutral-900'
              }`}
            />
          </div>
        </div>

      {/* Notes */}
<div className="mt-3">
  <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
    {t.notes}
  </label>
  <textarea
    value={exercise.notes}
    onChange={(e) => updateExercise(index, { notes: e.target.value })}
    placeholder={t.notesPlaceholder}
    rows={2}
    className={`w-full p-2 rounded-lg border ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700 text-white' 
        : 'bg-white border-neutral-300 text-neutral-900'
    }`}
  />
</div>
              