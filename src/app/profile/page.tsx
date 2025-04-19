'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Diet preferences
const dietPreferences = [
  { id: 'omnivore', label: 'Omnivore (Everything)' },
  { id: 'flexitarian', label: 'Flexitarian (Mostly Plant-Based)' },
  { id: 'pescatarian', label: 'Pescatarian (Vegetarian + Fish)' },
  { id: 'vegetarian', label: 'Vegetarian (No Meat)' },
  { id: 'vegan', label: 'Vegan (No Animal Products)' },
  { id: 'keto', label: 'Keto (Low Carb, High Fat)' },
  { id: 'paleo', label: 'Paleo' },
];

// Activity levels
const activityLevels = [
  { id: 'sedentary', label: 'Sedentary (Little to no exercise)' },
  { id: 'light', label: 'Light (Light exercise 1-3 days/week)' },
  { id: 'moderate', label: 'Moderate (Moderate exercise 3-5 days/week)' },
  { id: 'active', label: 'Active (Hard exercise 6-7 days/week)' },
  { id: 'very_active', label: 'Very Active (Hard daily exercise & physical job)' },
];

// Health goals
const healthGoals = [
  { id: 'lose_weight', label: 'Lose Weight' },
  { id: 'maintain_weight', label: 'Maintain Weight' },
  { id: 'gain_weight', label: 'Gain Weight' },
  { id: 'build_muscle', label: 'Build Muscle' },
  { id: 'improve_health', label: 'Improve Overall Health' },
];

interface ProfileFormData {
  age: string;
  gender: string;
  height_cm: string;
  weight_kg: string;
  diet_preference: string;
  activity_level: string;
  health_goal: string;
  calorie_target: string;
  protein_target: string;
  carbs_target: string;
  fat_target: string;
}

// Mock user profile data
const mockUserProfile: ProfileFormData = {
  age: '32',
  gender: 'female',
  height_cm: '168',
  weight_kg: '65',
  diet_preference: 'flexitarian',
  activity_level: 'moderate',
  health_goal: 'lose_weight',
  calorie_target: '2200',
  protein_target: '120',
  carbs_target: '250',
  fat_target: '70',
};

export default function Profile() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>(mockUserProfile);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
      
      // In a real app, you would fetch the user's profile data from Supabase
      // For now, we'll use the mock data
      /*
      if (data.user) {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single();
          
        if (!error && profileData) {
          setFormData(profileData);
        }
      }
      */
    };
    
    getUser();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      // In a real app, you would save to Supabase here
      /*
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...formData,
          updated_at: new Date()
        });
        
      if (error) throw error;
      */
      
      // Simulate successful save
      console.log('Profile saved:', formData);
      setSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error: any) {
      setError(error.message || 'An error occurred while saving your profile');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-green-600 mx-auto"></div>
            <p>Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Your Profile
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Update your personal information and nutrition goals
            </p>
          </div>
          
          {success && (
            <div className="mb-6 rounded-md bg-green-50 p-4 dark:bg-green-900/30">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Profile updated successfully!
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4 dark:bg-red-900/30">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400 dark:text-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Personal Information
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        min="18"
                        max="120"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="height_cm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        id="height_cm"
                        name="height_cm"
                        value={formData.height_cm}
                        onChange={handleInputChange}
                        min="100"
                        max="250"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="weight_kg" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        id="weight_kg"
                        name="weight_kg"
                        value={formData.weight_kg}
                        onChange={handleInputChange}
                        min="30"
                        max="300"
                        step="0.1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Diet and Activity */}
                <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Diet and Activity
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="diet_preference" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Diet Preference
                      </label>
                      <select
                        id="diet_preference"
                        name="diet_preference"
                        value={formData.diet_preference}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                      >
                        {dietPreferences.map(diet => (
                          <option key={diet.id} value={diet.id}>
                            {diet.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="activity_level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Activity Level
                      </label>
                      <select
                        id="activity_level"
                        name="activity_level"
                        value={formData.activity_level}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                      >
                        {activityLevels.map(level => (
                          <option key={level.id} value={level.id}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="health_goal" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Health Goal
                      </label>
                      <select
                        id="health_goal"
                        name="health_goal"
                        value={formData.health_goal}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                      >
                        {healthGoals.map(goal => (
                          <option key={goal.id} value={goal.id}>
                            {goal.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Nutrition Targets */}
                <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Nutrition Targets
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Set your daily nutrition goals
                  </p>
                  
                  <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="calorie_target" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Daily Calories (kcal)
                      </label>
                      <input
                        type="number"
                        id="calorie_target"
                        name="calorie_target"
                        value={formData.calorie_target}
                        onChange={handleInputChange}
                        min="1000"
                        max="5000"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="protein_target" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Protein (g)
                      </label>
                      <input
                        type="number"
                        id="protein_target"
                        name="protein_target"
                        value={formData.protein_target}
                        onChange={handleInputChange}
                        min="30"
                        max="300"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="carbs_target" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Carbohydrates (g)
                      </label>
                      <input
                        type="number"
                        id="carbs_target"
                        name="carbs_target"
                        value={formData.carbs_target}
                        onChange={handleInputChange}
                        min="50"
                        max="500"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="fat_target" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fat (g)
                      </label>
                      <input
                        type="number"
                        id="fat_target"
                        name="fat_target"
                        value={formData.fat_target}
                        onChange={handleInputChange}
                        min="20"
                        max="200"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-green-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 dark:bg-green-700 dark:hover:bg-green-600"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );