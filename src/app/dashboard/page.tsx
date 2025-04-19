'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock data for initial UI development
const mockNutrition = {
  calories: { consumed: 1850, target: 2200 },
  protein: { consumed: 85, target: 120, unit: 'g' },
  carbs: { consumed: 210, target: 250, unit: 'g' },
  fat: { consumed: 62, target: 70, unit: 'g' },
};

const mockRecentMeals = [
  { id: 1, name: 'Overnight Oats with Berries', time: '8:30 AM', calories: 350 },
  { id: 2, name: 'Grilled Chicken Salad', time: '12:45 PM', calories: 420 },
  { id: 3, name: 'Greek Yogurt with Honey', time: '4:15 PM', calories: 180 },
];

export default function Dashboard() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [waterIntake, setWaterIntake] = useState(3); // in cups

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, []);

  const increaseWater = () => {
    setWaterIntake(prev => Math.min(prev + 1, 10));
  };

  const decreaseWater = () => {
    setWaterIntake(prev => Math.max(prev - 1, 0));
  };

  // Calculate nutrition progress percentages
  const getProgressPercentage = (consumed: number, target: number) => {
    const percentage = (consumed / target) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-green-600 mx-auto"></div>
            <p>Loading your dashboard...</p>
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Here's your nutrition summary for today
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/food-log/add"
              className="flex items-center justify-center rounded-lg bg-green-600 px-4 py-6 text-white transition-colors hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
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
              <span className="font-medium">Log Food</span>
            </Link>
            <Link
              href="/recipes"
              className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-6 text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span className="font-medium">Find Recipes</span>
            </Link>
            <Link
              href="/progress"
              className="flex items-center justify-center rounded-lg bg-purple-600 px-4 py-6 text-white transition-colors hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="font-medium">View Progress</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center justify-center rounded-lg bg-gray-600 px-4 py-6 text-white transition-colors hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-medium">Edit Profile</span>
            </Link>
          </div>

          {/* Nutrition Summary */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left: Macro Nutrients */}
            <div className="col-span-2 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Today's Nutrition
              </h2>
              <div className="space-y-6">
                {/* Calories */}
                <div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Calories
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {mockNutrition.calories.consumed} / {mockNutrition.calories.target} kcal
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{
                        width: `${getProgressPercentage(
                          mockNutrition.calories.consumed,
                          mockNutrition.calories.target
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Protein */}
                <div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Protein
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {mockNutrition.protein.consumed} / {mockNutrition.protein.target} {mockNutrition.protein.unit}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{
                        width: `${getProgressPercentage(
                          mockNutrition.protein.consumed,
                          mockNutrition.protein.target
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Carbs */}
                <div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Carbohydrates
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {mockNutrition.carbs.consumed} / {mockNutrition.carbs.target} {mockNutrition.carbs.unit}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-yellow-500"
                      style={{
                        width: `${getProgressPercentage(
                          mockNutrition.carbs.consumed,
                          mockNutrition.carbs.target
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Fat */}
                <div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Fat
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {mockNutrition.fat.consumed} / {mockNutrition.fat.target} {mockNutrition.fat.unit}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-red-500"
                      style={{
                        width: `${getProgressPercentage(
                          mockNutrition.fat.consumed,
                          mockNutrition.fat.target
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Water Intake */}
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Water Intake
              </h2>
              <div className="flex flex-col items-center">
                <div className="relative mb-4 h-32 w-32">
                  <svg viewBox="0 0 36 36" className="h-32 w-32">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                      className="dark:stroke-gray-700"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeDasharray={`${(waterIntake / 8) * 100}, 100`}
                      className="dark:stroke-blue-400"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-semibold text-gray-900 dark:text-white">{waterIntake}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">of 8 cups</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={decreaseWater}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={increaseWater}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                  </button>
                </div>

                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  Add a cup each time you drink water
                </p>
              </div>
            </div>
          </div>

          {/* Recent Meals */}
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Meals
              </h2>
              <Link
                href="/food-log"
                className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                View All
              </Link>
            </div>

            <div className="mt-4 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockRecentMeals.map(meal => (
                    <li key={meal.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {meal.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {meal.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {meal.calories} kcal
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/food-log/add"
                className="flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
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
                Add New Meal
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}