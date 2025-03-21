// src/components/profile/ProfileImageModal.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Trash2 } from 'lucide-react';
import { 
  auth, 
  db, 
  storage, 
  ref as storageRef, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from '../../config/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const ProfileImageModal = ({ 
  isOpen, 
  onClose, 
  currentPhotoURL, 
  isDarkMode 
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Please upload JPG, PNG, or WebP.');
        return;
      }

      if (file.size > maxSize) {
        setError('File is too large. Maximum size is 5MB.');
        return;
      }

      setError(null);
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async () => {
    if (!imageFile) return;
    setUploading(true);
    setError(null);

    try {
      // Delete previous profile image if it exists
      if (currentPhotoURL && currentPhotoURL.includes('firebase')) {
        try {
          // Extract the path from the URL
          const oldImageRef = storageRef(storage, currentPhotoURL);
          await deleteObject(oldImageRef);
        } catch (deleteError) {
          console.log('Previous image not found or already deleted');
        }
      }

      // Upload to Firebase Storage
      const imageRef = storageRef(
        storage, 
        `profileImages/${auth.currentUser.uid}/${Date.now()}_${imageFile.name}`
      );
      
      const snapshot = await uploadBytes(imageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, { photoURL: downloadURL });

      // Update Firestore
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        photoURL: downloadURL,
        updatedAt: new Date()
      });

      // Close modal
      onClose();
    } catch (error) {
      console.error('Error uploading profile image:', error);
      setError('Failed to upload profile image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeProfileImage = async () => {
    if (!currentPhotoURL) return;
    setUploading(true);
    setError(null);

    try {
      // Delete image from storage if it exists
      if (currentPhotoURL && currentPhotoURL.includes('firebase')) {
        try {
          const imageRef = storageRef(storage, currentPhotoURL);
          await deleteObject(imageRef);
        } catch (deleteError) {
          console.log('Image not found or already deleted');
        }
      }

      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, { photoURL: null });

      // Update Firestore
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        photoURL: null,
        updatedAt: new Date()
      });

      // Close modal
      onClose();
    } catch (error) {
      console.error('Error removing profile image:', error);
      setError('Failed to remove profile image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div 
            className={`w-full max-w-md rounded-xl p-6 ${
              isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
            } shadow-2xl relative`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className={`absolute top-4 right-4 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              } p-2 rounded-full transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-4">Edit Profile Picture</h2>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />

            {/* Image Preview or Upload Button */}
            {imagePreview || currentPhotoURL ? (
              <div className="mb-4">
                <img 
                  src={imagePreview || currentPhotoURL} 
                  alt="Profile" 
                  className="w-full max-h-64 object-cover rounded-lg"
                />
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current.click()}
                className={`
                  border-2 border-dashed rounded-lg p-6 text-center cursor-pointer 
                  ${isDarkMode 
                    ? 'border-gray-700 hover:border-primary-600 bg-gray-800' 
                    : 'border-gray-300 hover:border-primary-500 bg-gray-50'
                  }
                `}
              >
                <Upload className={`mx-auto mb-2 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`} />
                <p>Click to upload profile picture</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => fileInputRef.current.click()}
                className={`flex-1 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                disabled={uploading}
              >
                Choose File
              </button>
              
              {imageFile && (
                <button
                  onClick={uploadProfileImage}
                  className={`flex-1 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  } flex items-center justify-center`}
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                      Uploading...
                    </>
                  ) : "Upload"}
                </button>
              )}
            </div>

            {/* Remove Image Button */}
            {currentPhotoURL && (
              <button
                onClick={removeProfileImage}
                className={`w-full mt-4 py-2 rounded-lg flex items-center justify-center ${
                  isDarkMode 
                    ? 'text-red-400 hover:bg-red-900/20' 
                    : 'text-red-600 hover:bg-red-50'
                }`}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <span className="animate-spin h-4 w-4 mr-2 border-2 border-red-500 border-t-transparent rounded-full"></span>
                    Removing...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2" /> Remove Profile Picture
                  </>
                )}
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileImageModal;