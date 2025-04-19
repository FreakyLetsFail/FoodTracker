'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock data for food logs
const mockFoodLogs = [
  {
    id: 1,
    date: '2025-04-19',
    meals: [
      {
        id: 101,
        category: 'breakfast',
        name: 'Overnight Oats with Berries',
        time: '08:30',
        calories: 350,
        protein: 12,
        carbs: 55,
        fat: 8
      },
      {
        id: 102,
        category: 'lunch',
        name: 'Grilled Chicken Salad',
        time: '12:45',
        calories: 420,
        protein: 35,
        carbs: 20,
        fat: 22
      },
      {
        id: 103,
        category: 'snack',
        name: 'Greek Yogurt with Honey',
        time: '16:15',
        calories: 180,
        protein: 15,
        carbs: 20,
        fat: 2
      },
      {
        id: 104,
        category: 'dinner',
        name: 'Salmon with Quinoa and Vegetables',
        time: '19:30',
        calories: 520,
        protein: 38,
        carbs: 42,
        fat: 22
      }
    ],
    totalNutrition: {
      calories: 1470,
      protein: 100,
      carbs: 137,
      fat: 54
    }
  },
  {
    id: 2,
    date: '2025-04-18',
    meals: [
      {
        id: 201,
        category: 'breakfast',
        name: 'Avocado Toast with Egg',
        time: '07:45',
        calories: 380,
        protein: 15,
        carbs: 30,
        fat: 22
      },
      {
        id: 202,
        category: 'lunch',
        name: 'Turkey Sandwich with Vegetables',
        time: '13:15',
        calories: 450,
        protein: 28,
        carbs: 48,
        fat: 14
      },
      {
        id: 203,
        category: 'snack',
        name: 'Apple with Peanut Butter',
        time: '15:45',
        calories: 220,
        protein: 6,
        carbs: 30,
        fat: 10
      },
      {
        id: 204,
        category: 'dinner',
        name: 'Vegetable Stir Fry with Tofu',
        time: '19:00',
        calories: 380,
        protein: 22,
        carbs: 40,
        fat: 15
      }
    ],
    totalNutrition: {
      calories: 1430,
      protein: 71,
      carbs: 148,
      fat: 61
    }
  }
];

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function getMealCategoryDisplayName(category: string) {
  const categories: Record<string, string> = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack'
  };
  
  return categories[category] || category;
}

export default function FoodLog() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [foodLogs, setFoodLogs] = useState(mockFoodLogs);
  const [activeDate, setActiveDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    
    getUser();
    
    // In a real application, you would fetch the food logs from Supabase here
    // For now, we'll use the mock data
    // Example:
    /*
    const fetchFoodLogs = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('food_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('logged_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching food logs:', error);
        return;
      }
      
      // Process the data to group by date
      // ...
      
      setFoodLogs(processedLogs);
    };
    
    fetchFoodLogs();
    */
  }, [user]);
  
  // Function to delete a food log entry
  const handleDelete = async (mealId: number) => {
    // This is a mock implementation. In a real app, you would delete from Supabase
    const updatedLogs = foodLogs.map(dayLog => {
      return {
        ...dayLog,
        meals: dayLog.meals.filter(meal => meal.id !== mealId),
        totalNutrition: dayLog.meals.filter(meal => meal.id !== mealId).reduce(
          (acc, meal) => ({
            calories: acc.calories + meal.calories,
            protein: acc.protein + meal.protein,
            carbs: acc.carbs + meal.carbs,
            fat: acc.fat + meal.fat
          }),
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        )
      };
    });
    
    setFoodLogs(updatedLogs);
    
    // Example Supabase delete:
    /*
    const { error } = await supabase
      .from('food_logs')
      .delete()
      .eq('id', mealId);
      
    if (error) {
      console.error('Error deleting food log:', error);
    }
    */
  };
  
  // Filter logs for the active date
  const activeDayLog = foodLogs.find(log => log.date === activeDate);
  
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-green-600 mx-auto"></div>
            <p>Loading your food logs...</p>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Food Log
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Track and manage your daily nutrition
              </p>
            </div>
            <Link
              href="/food-log/add"
              className="flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Food
            </Link>
          </div>
          
          {/* Date Selector */}
          <div className="mb-6 overflow-x-auto">
            <div className="inline-flex space-x-2">
              {foodLogs.map(log => (
                <button
                  key={log.id}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${
                    activeDate === log.date
                      ? 'bg-green-600 text-white dark:bg-green-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveDate(log.date)}
                >
                  {new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </button>
              ))}
            </div>
          </div>
          
          {activeDayLog ? (
            <div>
              <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {formatDate(activeDayLog.date)}
                </h2>
                
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">Calories</p>
                    <p className="mt-1 text-2xl font-bold text-green-900 dark:text-green-200">
                      {activeDayLog.totalNutrition.calories}
                      <span className="ml-1 text-sm font-normal">kcal</span>
                    </p>
                  </div>
                  
                  <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Protein</p>
                    <p className="mt-1 text-2xl font-bold text-blue-900 dark:text-blue-200">
                      {activeDayLog.totalNutrition.protein}
                      <span className="ml-1 text-sm font-normal">g</span>
                    </p>
                  </div>
                  
                  <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Carbs</p>
                    <p className="mt-1 text-2xl font-bold text-yellow-900 dark:text-yellow-200">
                      {activeDayLog.totalNutrition.carbs}
                      <span className="ml-1 text-sm font-normal">g</span>
                    </p>
                  </div>
                  
                  <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">Fat</p>
                    <p className="mt-1 text-2xl font-bold text-red-900 dark:text-red-200">
                      {activeDayLog.totalNutrition.fat}
                      <span className="ml-1 text-sm font-normal">g</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Meals List */}
              <div className="space-y-6">
                {['breakfast', 'lunch', 'dinner', 'snack'].map(category => {
                  const meals = activeDayLog.meals.filter(meal => meal.category === category);
                  if (meals.length === 0) return null;
                  
                  return (
                    <div key={category} className="rounded-lg bg-white shadow dark:bg-gray-800">
                      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {getMealCategoryDisplayName(category)}
                        </h3>
                      </div>
                      
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {meals.map(meal => (
                          <li key={meal.id} className="p-6">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {meal.name}
                                </h4>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                  {meal.time}
                                </p>
                                
                                <div className="mt-2 flex space-x-4 text-sm">
                                  <div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      {meal.calories}
                                    </span>
                                    <span className="ml-1 text-gray-500 dark:text-gray-400">kcal</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      {meal.protein}
                                    </span>
                                    <span className="ml-1 text-gray-500 dark:text-gray-400">g protein</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      {meal.carbs}
                                    </span>
                                    <span className="ml-1 text-gray-500 dark:text-gray-400">g carbs</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      {meal.fat}
                                    </span>
                                    <span className="ml-1 text-gray-500 dark:text-gray-400">g fat</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleDelete(meal.id)}
                                  className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-red-400"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
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
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
              <p className="text-gray-600 dark:text-gray-400">No food logs found for this date.</p>
              <Link
                href="/food-log/add"
                className="mt-4 inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              >
                Add your first meal
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}