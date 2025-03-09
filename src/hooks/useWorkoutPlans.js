// src/hooks/useWorkoutPlans.js
import { useState, useEffect } from 'react';
import { 
  getUserWorkoutPlans, 
  saveWorkoutPlan, 
  updateWorkoutPlan, 
  deleteWorkoutPlan,
  trackWorkoutSession
} from '../services/workoutService';
import { useAuth } from './useAuth';

export const useWorkoutPlans = () => {
  const { user } = useAuth();
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's workout plans
  const fetchWorkoutPlans = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const plans = await getUserWorkoutPlans(user.uid);
      setWorkoutPlans(plans);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new workout plan
  const createWorkoutPlan = async (planData) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const newPlan = await saveWorkoutPlan(user.uid, planData);
      setWorkoutPlans(prev => [...prev, newPlan]);
      return newPlan;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // Update an existing workout plan
  const updatePlan = async (planId, updateData) => {
    try {
      await updateWorkoutPlan(planId, updateData);
      await fetchWorkoutPlans(); // Refresh plans
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // Delete a workout plan
  const removePlan = async (planId) => {
    try {
      await deleteWorkoutPlan(planId);
      setWorkoutPlans(prev => prev.filter(plan => plan.id !== planId));
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // Track a workout session
  const logWorkoutSession = async (planId) => {
    if (!user) throw new Error('User not authenticated');

    try {
      await trackWorkoutSession(user.uid, planId);
      await fetchWorkoutPlans(); // Refresh to update session count
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchWorkoutPlans();
  }, [user]);

  return {
    workoutPlans,
    loading,
    error,
    createWorkoutPlan,
    updatePlan,
    removePlan,
    logWorkoutSession,
    fetchWorkoutPlans
  };
};