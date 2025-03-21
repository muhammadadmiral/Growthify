// src/components/profile/ProfileMembership.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileMembership = ({ isDarkMode }) => {
  const navigate = useNavigate();
  
  return (
    <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
      <div className="relative h-40">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
          }}></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm opacity-80 font-medium">Membership</p>
              <h3 className="text-xl font-bold">Free Plan</h3>
            </div>
            <div className="flex items-center">
              <span className="material-symbols-rounded mr-1">workspace_premium</span>
              <span className="text-sm">Basic</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-medium mb-2">Free Plan Features:</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-sm">
              <span className="material-symbols-rounded mr-2 text-green-500">check_circle</span>
              <span>Basic workout tracking</span>
            </li>
            <li className="flex items-center text-sm">
              <span className="material-symbols-rounded mr-2 text-green-500">check_circle</span>
              <span>Limited habit tracking</span>
            </li>
            <li className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="material-symbols-rounded mr-2">cancel</span>
              <span>Advanced body analytics</span>
            </li>
            <li className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="material-symbols-rounded mr-2">cancel</span>
              <span>Personalized recommendations</span>
            </li>
          </ul>
        </div>
        <button 
          onClick={() => navigate('/pricing')}
          className="w-full py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
        >
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default ProfileMembership;