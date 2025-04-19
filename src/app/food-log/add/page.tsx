'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BarcodeScanner from '@/components/BarcodeScanner';

// Food categories
const foodCategories = [
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'lunch', name: 'Lunch' },
  { id: 'dinner', name: 'Dinner' },
  { id: 'snack', name: 'Snack' },
];

// Mock food database for initial development
const mockFoodItems = [
  { 
    id: 1, 
    name: 'Apple', 
    category: 'fruit', 
    calories: 95, 
    protein: 0.5, 
    carbs: 25, 
    fat: 0.3,
    serving_size: '1 medium (182g)',
    serving_unit: 'g',
    serving_weight: 182
  },
  { 
    id: 2, 
    name: 'Banana', 
    category: 'fruit', 
    calories: 105, 
    protein: 1.3, 
    carbs: 27, 
    fat: 0.4,
    serving_size: '1 medium (118g)',
    serving_unit: 'g',
    serving_weight: 118
  },
  { 
    id: 3, 
    name: 'Chicken Breast (Cooked)', 
    category: 'meat', 
    calories: 165, 
    protein: 31, 
    carbs: 0, 
    fat: 3.6,
    serving_size: '100g',
    serving_unit: 'g',
    serving_weight: 100
  },
  { 
    id: 4, 
    name: 'Brown Rice', 
    category: 'grain', 
    calories: 215, 
    protein: 5, 
    carbs: 45, 
    fat: 1.8,
    serving_size: '1 cup cooked (195g)',
    serving_unit: 'g',
    serving_weight: 195
  },
  { 
    id: 5, 
    name: 'Greek Yogurt', 
    category: 'dairy', 
    calories: 100, 
    protein: 17, 
    carbs: 6, 
    fat: 0.4,
    serving_size: '170g container',
    serving_unit: 'g',
    serving_weight: 170
  },
];

type FoodItem = typeof mockFoodItems[0];

export default function AddFoodLog() {
  const [activeCategory, setActiveCategory] = useState(foodCategories[0].id);
  const [selectedMealTime, setSelectedMealTime] = useState<Date | null>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servingSize, setServingSize] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle barcode detection
  const handleBarcodeDetected = async (barcode: string) => {
    setShowScanner(false);
    setError(null);
    
    // In a real app, you would fetch product information from OpenFoodFacts API
    console.log(`Barcode detected: ${barcode}`);
    
    // Simulate an API call with a delay
    setLoading(true);
    
    // For demo purposes, just use a mock food item
    setTimeout(() => {
      // Pretend we found something for any barcode
      setSelectedFood(mockFoodItems[Math.floor(Math.random() * mockFoodItems.length)]);
      setLoading(false);
    }, 1500);
  };
  
  // Filter food items based on search query
  const filteredFoods = mockFoodItems.filter(food => 
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Select a food item
  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setServingSize(1);
  };
  
  // Calculate nutrition based on serving size
  const calculateNutrition = (value: number) => {
    if (!selectedFood) return 0;
    return Math.round(value * servingSize * 10) / 10;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFood || !selectedMealTime) {
      setError('Please select a food and meal time');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to add food');
      }
      
      // Calculate nutrition values based on serving size
      const calories = calculateNutrition(selectedFood.calories);
      const protein = calculateNutrition(selectedFood.protein);
      const carbs = calculateNutrition(selectedFood.carbs);
      const fat = calculateNutrition(selectedFood.fat);
      
      // In a real app, you would save to Supabase here
      /*
      const { error } = await supabase.from('food_logs').insert({
        user_id: user.id,
        food_name: selectedFood.name,
        meal_category: activeCategory,
        serving_size: servingSize,
        calories,
        protein,
        carbs,
        fat,
        logged_at: selectedMealTime.toISOString(),
      });
      
      if (error) throw error;
      */
      
      // Simulate successful save
      console.log('Food logged:', {
        food_name: selectedFood.name,
        meal_category: activeCategory,
        serving_size: servingSize,
        calories,
        protein,
        carbs,
        fat,
        logged_at: selectedMealTime?.toISOString(),
      });
      
      setSuccess(true);
      setSelectedFood(null);
      setServingSize(1);
      setSearchQuery('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (error: any) {
      setError(error.message || 'An error occurred while saving your food log');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Add Food to Log
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Track your meals and nutrition intake
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
                    Food added to your log successfully!
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
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Meal Category */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Meal
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {foodCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        className={`flex items-center justify-center rounded-md py-3 px-4 text-sm font-medium ${
                          activeCategory === category.id
                            ? 'bg-green-600 text-white dark:bg-green-700'
                            : 'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Date and Time */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                    value={selectedMealTime ? selectedMealTime.toISOString().slice(0, 16) : ''}
                    onChange={(e) => setSelectedMealTime(e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
                
                {/* Food Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Search Food
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 pr-10 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                      placeholder="Search for food..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        className="h-5 w-5 text-gray-400 dark:text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Barcode Scanner Button */}
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={() => setShowScanner(!showScanner)}
                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-green-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1