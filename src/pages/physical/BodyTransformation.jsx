import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  BarChart2, 
  Target, 
  Camera, 
  Heart, 
  Zap 
} from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  doc, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';

// Translations
const translations = {
  en: {
    title: "Body Transformation",
    subtitle: "Track your fitness journey and progress",
    addMeasurement: "Add Measurement",
    currentStats: "Current Stats",
    progressGoals: "Progress Goals",
    bodyComposition: "Body Composition",
    measurements: "Measurements",
    progressPhotos: "Progress Photos",
    noMeasurements: "No measurements recorded yet",
    noPhotos: "No progress photos uploaded",
    statsLabels: {
      weight: "Current Weight",
      bodyFat: "Body Fat %",
      muscleMass: "Muscle Mass",
      bmi: "BMI"
    },
    goals: {
      weightLoss: "Weight Loss",
      muscleGain: "Muscle Gain",
      bodyFatReduction: "Body Fat Reduction"
    }
  },
  id: {
    title: "Transformasi Tubuh",
    subtitle: "Lacak perjalanan dan kemajuan kebugaran Anda",
    addMeasurement: "Tambah Pengukuran",
    currentStats: "Statistik Saat Ini",
    progressGoals: "Tujuan Kemajuan",
    bodyComposition: "Komposisi Tubuh",
    measurements: "Pengukuran",
    progressPhotos: "Foto Progres",
    noMeasurements: "Belum ada pengukuran yang dicatat",
    noPhotos: "Belum ada foto progres yang diunggah",
    statsLabels: {
      weight: "Berat Badan",
      bodyFat: "Persentase Lemak",
      muscleMass: "Massa Otot",
      bmi: "BMI"
    },
    goals: {
      weightLoss: "Penurunan Berat",
      muscleGain: "Penambahan Massa Otot",
      bodyFatReduction: "Penurunan Lemak Tubuh"
    }
  }
};

export default function BodyTransformation() {
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const t = translations[language] || translations.en;

  // State management
  const [bodyStats, setBodyStats] = useState({
    weight: null,
    bodyFat: null,
    muscleMass: null,
    bmi: null
  });
  const [measurements, setMeasurements] = useState([]);
  const [progressPhotos, setProgressPhotos] = useState([]);
  const [goals, setGoals] = useState({
    weightLoss: null,
    muscleGain: null,
    bodyFatReduction: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('stats'); // 'stats', 'measurement', 'photo', 'goal'

  // Fetch user body transformation data
  useEffect(() => {
    const fetchBodyTransformationData = async () => {
      if (!currentUser) return;

      try {
        // Fetch body stats
        const statsRef = doc(db, 'users', currentUser.uid, 'bodyTransformation', 'currentStats');
        // Fetch measurements
        const measurementsQuery = query(
          collection(db, 'users', currentUser.uid, 'bodyTransformation', 'measurements'),
          where('userId', '==', currentUser.uid)
        );
        
        // Fetch progress photos
        const photosQuery = query(
          collection(db, 'users', currentUser.uid, 'bodyTransformation', 'progressPhotos'),
          where('userId', '==', currentUser.uid)
        );

        // Fetch goals
        const goalsRef = doc(db, 'users', currentUser.uid, 'bodyTransformation', 'goals');

        // Implement data fetching logic
        // ...

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching body transformation data:', error);
        setIsLoading(false);
      }
    };

    fetchBodyTransformationData();
  }, [currentUser]);

  // Modal for adding/editing body stats
  const renderStatsModal = () => (
    <AnimatePresence>
      {isModalOpen && modalType === 'stats' && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={`w-full max-w-md rounded-xl p-6 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-neutral-900'
            } shadow-2xl`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-xl font-bold mb-4">{t.currentStats}</h2>
            
            {/* Input fields for body stats */}
            <div className="space-y-4">
              {Object.entries(t.statsLabels).map(([key, label]) => (
                <div key={key}>
                  <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                    {label}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={bodyStats[key] || ''}
                    onChange={(e) => setBodyStats(prev => ({
                      ...prev,
                      [key]: parseFloat(e.target.value)
                    }))}
                    className={`w-full p-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-neutral-300 text-neutral-900'
                    }`}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`flex-1 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save body stats logic
                  setIsModalOpen(false);
                }}
                className={`flex-1 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render current body stats section
  const renderCurrentStats = () => (
    <motion.div 
      className={`rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-200'} border shadow-sm overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`px-6 py-4 border-b flex justify-between items-center ${
        isDarkMode ? 'border-gray-700' : 'border-neutral-200'
      }`}>
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          {t.currentStats}
        </h2>
        <button 
          onClick={() => {
            setModalType('stats');
            setIsModalOpen(true);
          }}
          className={`p-1.5 rounded-full ${
            isDarkMode 
              ? 'text-gray-300 hover:bg-gray-700' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6">
        {Object.entries(t.statsLabels).map(([key, label]) => (
          <div 
            key={key}
            className={`p-4 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-neutral-50 border-neutral-200'
            } border text-center`}
          >
            <div className={`mb-2 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
              {label}
            </div>
            <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              {bodyStats[key] !== null ? bodyStats[key] : '-'}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Render progress goals section
  const renderProgressGoals = () => (
    <motion.div 
      className={`rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-200'} border shadow-sm overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`px-6 py-4 border-b flex justify-between items-center ${
        isDarkMode ? 'border-gray-700' : 'border-neutral-200'
      }`}>
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          {t.progressGoals}
        </h2>
        <button 
          onClick={() => {
            setModalType('goal');
            setIsModalOpen(true);
          }}
          className={`p-1.5 rounded-full ${
            isDarkMode 
              ? 'text-gray-300 hover:bg-gray-700' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
        {Object.entries(t.goals).map(([key, label]) => {
          const progress = goals[key] ? (goals[key].current / goals[key].target) * 100 : 0;
          
          return (
            <div 
              key={key}
              className={`p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-neutral-50 border-neutral-200'
              } border`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                  {label}
                </h3>
                <Target className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`} />
              </div>
              
              <div className="relative pt-1">
                <div className={`overflow-hidden h-2 mb-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-600' 
                    : 'bg-neutral-200'
                }`}>
                  <div 
                    style={{ width: `${progress}%` }}
                    className={`h-full ${
                      progress < 50 
                        ? 'bg-red-500' 
                        : progress < 75 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                    } rounded-full`}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
                    {goals[key] ? goals[key].current : 0}
                  </span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
                    {goals[key] ? goals[key].target : 0}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  const renderMeasurements = () => (
    <motion.div 
      className={`rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-200'} border shadow-sm overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`px-6 py-4 border-b flex justify-between items-center ${
        isDarkMode ? 'border-gray-700' : 'border-neutral-200'
      }`}>
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          {t.measurements}
        </h2>
        <button 
          onClick={() => {
            setModalType('measurement');
            setIsModalOpen(true);
          }}
          className={`p-1.5 rounded-full ${
            isDarkMode 
              ? 'text-gray-300 hover:bg-gray-700' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6">
        {measurements.length > 0 ? (
          <div className="space-y-4">
            {measurements.map((measurement, index) => (
              <motion.div
                key={measurement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border flex justify-between items-center ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <div>
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                    {measurement.date}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm">
                    {Object.entries(measurement.details).map(([key, value]) => (
                      <span 
                        key={key}
                        className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}
                      >
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => {
                      // Edit measurement logic
                      setSelectedMeasurement(measurement);
                      setModalType('measurement');
                      setIsModalOpen(true);
                    }}
                    className={`p-1.5 rounded-full ${
                      isDarkMode 
                        ? 'text-gray-300 hover:bg-gray-600' 
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      // Delete measurement logic
                      handleDeleteMeasurement(measurement.id);
                    }}
                    className={`p-1.5 rounded-full ${
                      isDarkMode 
                        ? 'text-red-400 hover:bg-red-900/20' 
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
            <BarChart2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{t.noMeasurements}</p>
          </div>
        )}
      </div>
    </motion.div>
  );