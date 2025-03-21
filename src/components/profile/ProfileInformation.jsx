// src/components/profile/ProfileInformation.jsx
import React, { useState } from 'react';
import { auth, db } from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile as updateFirebaseProfile } from 'firebase/auth';
import { useLocation } from 'react-router-dom';

const ProfileInformation = ({ user, isDarkMode, onUserUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user.displayName || '',
    bio: user.bio || '',
    location: user.location || '',
    goals: user.goals || '',
    dateOfBirth: user.dateOfBirth || '',
    height: user.height || '',
    weight: user.weight || '',
    gender: user.gender || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Validate required fields
      if (!formData.displayName) {
        alert("Display name is required");
        setSaving(false);
        return;
      }

      // Update Firebase Auth profile
      await updateFirebaseProfile(auth.currentUser, {
        displayName: formData.displayName
      });

      // Update Firestore document
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        name: formData.displayName,
        bio: formData.bio,
        location: formData.location,
        goals: formData.goals,
        dateOfBirth: formData.dateOfBirth,
        height: formData.height ? parseFloat(formData.height) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        gender: formData.gender,
        updatedAt: new Date()
      });

      // Update parent component's user state
      onUserUpdate({
        displayName: formData.displayName,
        bio: formData.bio,
        location: formData.location,
        goals: formData.goals,
        dateOfBirth: formData.dateOfBirth,
        height: formData.height,
        weight: formData.weight,
        gender: formData.gender
      });

      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`rounded-xl shadow-sm overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-6`}>
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        {editing ? (
          <span className="text-primary-500 text-sm">Editing</span>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className={`px-4 py-2 rounded-lg flex items-center text-sm ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
          >
            <span className="material-symbols-rounded mr-1">edit</span>
            Edit
          </button>
        )}
      </div>
      
      {editing ? (
        <form className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="displayName">
                Display Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="height">
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="weight">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="2"
              value={formData.bio}
              onChange={handleChange}
              className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="goals">
              Personal Goals
            </label>
            <textarea
              id="goals"
              name="goals"
              rows="2"
              value={formData.goals}
              onChange={handleChange}
              className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
              placeholder="What are you hoping to achieve?"
            ></textarea>
          </div>
          
          <div className="flex space-x-2 justify-end">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors flex items-center"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                  Saving...
                </>
              ) : "Save Changes"}
            </button>
          </div>
        </form>
      ) : (
        <div className="p-6 space-y-6">
          {user.bio && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Bio</h3>
              <p>{user.bio}</p>
            </div>
          )}
          
          {user.goals && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Personal Goals</h3>
              <p>{typeof user.goals === 'object' ? JSON.stringify(user.goals) : user.goals}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h3>
              <p>{user.email}</p>
            </div>
            
            {user.dateOfBirth && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date of Birth</h3>
                <p>{user.dateOfBirth}</p>
              </div>
            )}
            
            {user.gender && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Gender</h3>
                <p>{user.gender === 'male' ? 'Male' : 'Female'}</p>
              </div>
            )}
            
            {user.height && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Height</h3>
                <p>{user.height} cm</p>
              </div>
            )}
            
            {user.weight && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Weight</h3>
                <p>{user.weight} kg</p>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Member Since</h3>
              <p>{new Date(user.createdAt.toDate ? user.createdAt.toDate() : user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInformation;