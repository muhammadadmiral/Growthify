import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, setDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useAuth } from '../../hooks/useAuth';
import { db, storage } from '../../config/firebase';
import { useWorkoutPlans } from '../../hooks/useWorkoutPlans';


const WorkoutCreateModal = ({ 
    isOpen, 
    onClose, 
    initialPlan = null, 
    isDarkMode, 
    language 
  }) => {
    const { createWorkoutPlan } = useWorkoutPlans();
  
   
  
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
</div>
    ));
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' } 
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95,
      transition: { duration: 0.2, ease: 'easeIn' } 
    }
  };

  // Only render the modal when it's open
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          ></motion.div>
          
          {/* Modal */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div 
              className={`w-full max-w-4xl rounded-xl p-6 ${
                isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-neutral-900'
              } shadow-2xl relative max-h-[90vh] overflow-y-auto`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex justify-between items-center mb-6 sticky top-0 z-10 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold">
                  {initialPlan ? `Edit: ${initialPlan.title}` : t.title}
                </h2>
                <button 
                  onClick={onClose}
                  className={`p-2 rounded-lg ${
                    isDarkMode 
                      ? 'text-gray-400 hover:bg-gray-800 hover:text-white' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="mb-6">
                  <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-neutral-800'}`}>
                    {t.basicInfo}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Plan Title */}
                    <div className="col-span-2">
                      <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                        {t.planTitle}
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder={t.planTitlePlaceholder}
                        className={`w-full p-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-white border-neutral-300 text-neutral-900'
                        } ${errors.title ? 'border-red-500' : ''}`}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                      <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                        {t.description}
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder={t.descriptionPlaceholder}
                        rows={3}
                        className={`w-full p-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-white border-neutral-300 text-neutral-900'
                        } ${errors.description ? 'border-red-500' : ''}`}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                      )}
                    </div>

                    {/* Category */}
                    <div>
                      <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                        {t.category}
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full p-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-white border-neutral-300 text-neutral-900'
                        }`}
                      >
                        {Object.entries(t.categoryOptions).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Level */}
                    <div>
                      <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                        {t.level}
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className={`w-full p-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-white border-neutral-300 text-neutral-900'
                        }`}
                      >
                        {Object.entries(t.levelOptions).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Frequency & Duration */}
                    <div>
                      <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                        {t.frequency}
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          name="frequency"
                          min="1"
                          max="7"
                          value={formData.frequency}
                          onChange={handleChange}
                          className={`w-16 p-2 rounded-lg border ${
                            isDarkMode 
                              ? 'bg-gray-800 border-gray-700 text-white' 
                              : 'bg-white border-neutral-300 text-neutral-900'
                          }`}
                        />
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {t.timesPerWeek}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                        {t.duration}
                      </label>
                      <input
                        type="number"
                        name="duration"
                        min="5"
                        max="180"
                        value={formData.duration}
                        onChange={handleChange}
                        className={`w-full p-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-white border-neutral-300 text-neutral-900'
                        }`}
                      />
                    </div>
                    
                    {/* Schedule */}
                    <div className="col-span-2">
                      <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                        {t.schedule}
                      </label>
                      <div className="grid grid-cols-7 gap-2">
                        {Object.entries(t.days).map(([day, label]) => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleScheduleDay(day)}
                            className={`p-2 rounded-lg text-xs ${
                              formData.schedule.includes(day)
                                ? isDarkMode 
                                  ? 'bg-primary-700 text-white' 
                                  : 'bg-primary-100 text-primary-800'
                                : isDarkMode
                                  ? 'bg-gray-800 text-gray-400 border border-gray-700' 
                                  : 'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}
                          >
                            {label.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                      {errors.schedule && (
                        <p className="text-red-500 text-sm mt-1">{errors.schedule}</p>
                      )}
                    </div>

                    {/* Cover Image */}
                    <div className="col-span-2">
                      <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                        {t.coverImage}
                      </label>
                      
                      {/* Current Image Preview */}
                      {formData.image && (
                        <div className="mb-3">
                          <img 
                            src={formData.image} 
                            alt="Cover" 
                            className="h-40 w-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                      
                      {/* Image Upload */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
                            {t.customImage}
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className={`w-full p-2 rounded-lg border ${
                              isDarkMode 
                                ? 'bg-gray-800 border-gray-700 text-white' 
                                : 'bg-white border-neutral-300 text-neutral-900'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
                            {t.recommendedImage}
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {t.systemImages.map((imageUrl, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => selectSystemImage(imageUrl)}
                                className={`h-16 rounded-lg overflow-hidden border-2 ${
                                  formData.image === imageUrl
                                    ? 'border-primary-500'
                                    : isDarkMode 
                                      ? 'border-gray-700' 
                                      : 'border-gray-200'
                                }`}
                              >
                                <img
                                  src={imageUrl}
                                  alt={`Option ${index + 1}`}
                                  className="h-full w-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Exercises */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-neutral-800'}`}>
                      Exercises
                    </h3>
                    <button
                      type="button"
                      onClick={addExercise}
                      className={`px-3 py-2 rounded-lg text-sm flex items-center ${
                        isDarkMode 
                          ? 'bg-primary-700 text-white hover:bg-primary-600' 
                          : 'bg-primary-500 text-white hover:bg-primary-600'
                      }`}
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      {t.addExercise}
                    </button>
                  </div>
                  
                  {errors.exercises && (
                    <p className="text-red-500 text-sm mb-3">{errors.exercises}</p>
                  )}
                  
                  <div className="space-y-4">
                    {renderExercises()}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex justify-end space-x-4 sticky bottom-0 pt-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <button
                    type="button"
                    onClick={onClose}
                    className={`px-4 py-2 rounded-lg ${
                      isDarkMode 
                        ? 'bg-gray-800 text-white hover:bg-gray-700' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-lg ${
                      isDarkMode 
                        ? 'bg-primary-700 text-white hover:bg-primary-600' 
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    } disabled:opacity-50`}
                  >
                    {isSubmitting ? 'Saving...' : t.save}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WorkoutCreateModal;