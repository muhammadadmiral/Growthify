// src/pages/CompleteProfile.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputForm from '../components/login/InputForm';
import SubmitButton from '../components/login/SubmitButton';
import { db, auth } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function CompleteProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    birthDate: '',
    gender: '',
    occupation: '',
    interests: []
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Prapopulasi data dari social login jika ada
  useEffect(() => {
    if (location.state?.name) {
      setFormData(prev => ({
        ...prev,
        name: location.state.name || ''
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Untuk checkbox interests
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
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Hapus error saat pengguna mulai mengisi
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.occupation.trim()) {
      newErrors.occupation = 'Occupation is required';
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Dapatkan user saat ini
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No authenticated user');
      }

      // Update dokumen di Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        ...formData,
        profileCompleted: true,
        lastProfileUpdateAt: new Date()
      });

      // Redirect ke dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing profile:', error);
      setErrors({
        form: 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Daftar minat yang tersedia
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

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold font-heading bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Help us personalize your Growthify experience
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-elegant sm:rounded-lg sm:px-10">
          {errors.form && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {errors.form}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputForm
              label="Full Name"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <InputForm
              label="Phone Number"
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
              placeholder="+62 (contoh: +62812345678)"
            />

            <div>
              <label 
                htmlFor="birthDate" 
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Birth Date
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
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'}
                  focus:outline-none sm:text-sm
                `}
              />
              {errors.birthDate && (
                <p className="mt-1 text-xs text-red-500">{errors.birthDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Gender
              </label>
              <div className="flex space-x-4">
                {['Male', 'Female', 'Other'].map(gender => (
                  <label key={gender} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="text-primary-600 focus:ring-primary-500 border-neutral-300"
                    />
                    <span className="ml-2 text-sm text-neutral-700">{gender}</span>
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
              )}
            </div>

            <InputForm
              label="Occupation"
              id="occupation"
              name="occupation"
              type="text"
              value={formData.occupation}
              onChange={handleChange}
              error={errors.occupation}
              required
              placeholder="Your current job or role"
            />

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Select Your Interests
              </label>
              <div className="grid grid-cols-3 gap-2">
                {interestOptions.map(interest => (
                  <label 
                    key={interest} 
                    className="inline-flex items-center text-sm"
                  >
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={handleChange}
                      className="text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <span className="ml-2">{interest}</span>
                  </label>
                ))}
              </div>
              {errors.interests && (
                <p className="mt-1 text-xs text-red-500">{errors.interests}</p>
              )}
            </div>

            <SubmitButton
              text="Complete Profile"
              isLoading={isLoading}
            />
          </form>
        </div>
      </div>
      
      {/* Informative Banner */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gradient-premium from-primary-50 to-secondary-50 p-4 rounded-lg shadow-sm border border-primary-100">
          <h3 className="text-sm font-medium text-neutral-800">💡 Why we need this information</h3>
          <p className="text-xs text-neutral-700 mt-1">
            By sharing these details, we can create a more personalized growth experience tailored just for you.
          </p>
        </div>
      </div>
    </div>
  );
}