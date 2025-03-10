// src/components/profile/ProfileHeader.jsx
import React from 'react';

const ProfileHeader = ({ user, isDarkMode, onImageEdit }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="relative group">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              onClick={onImageEdit}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary-500 cursor-pointer group-hover:opacity-70 transition-opacity"
            />
          ) : (
            <div 
              onClick={onImageEdit}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold cursor-pointer group-hover:opacity-70 transition-opacity ${isDarkMode ? 'bg-primary-700 text-white' : 'bg-primary-500 text-white'}`}
            >
              {user.displayName.charAt(0).toUpperCase()}
            </div>
          )}
          
          {/* Edit overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
            onClick={onImageEdit}
          >
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-rounded">edit</span>
            </span>
          </div>

          <span className="absolute bottom-0 right-0 bg-green-500 p-1 rounded-full border-2 border-white">
            <span className="material-symbols-rounded text-white text-sm">verified</span>
          </span>
        </div>
        
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{user.displayName}</h1>
          <div className="flex items-center mt-1">
            <span className="material-symbols-rounded mr-1 text-primary-500">
              military_tech
            </span>
            <span className="text-sm">Level {user.level} • {user.points} points</span>
          </div>
          {user.location && (
            <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
              <span className="material-symbols-rounded mr-1">location_on</span>
              <span>{user.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;