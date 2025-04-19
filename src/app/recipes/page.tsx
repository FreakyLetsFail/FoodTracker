'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Recipe categories
const recipeCategories = [
  { id: 'all', name: 'All Recipes' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'lunch', name: 'Lunch' },
  { id: 'dinner', name: 'Dinner' },
  { id: 'snack', name: 'Snacks' },
  { id: 'dessert', name: 'Desserts' },
];

// Mock recipe data for initial UI development
const mockRecipes = [
  {
    id: 1,
    title: 'Overnight Oats with Mixed Berries',
    category: 'breakfast',
    prepTime: '5 min',
    cookTime: '0 min (+ overnight)',
    calories: 350,
    protein: 12,
    carbs: 55,
    fat: 8,
    imageUrl: '/api/placeholder/600/400',
    ingredients: [
      '1/2 cup rolled oats',
      '1/2 cup Greek yogurt',
      '1/2 cup milk of choice',
      '1 tablespoon honey or maple syrup',
      '1/2 cup mixed berries',
      '1 tablespoon chia seeds',
      'Pinch of cinnamon'
    ],
    instructions: [
      'In a jar or container, combine oats, yogurt, milk, and sweetener.',
      'Stir well to combine.',
      'Add chia seeds and cinnamon, stir again.',
      'Top with berries, cover, and refrigerate overnight.',
      'Enjoy cold in the morning or warm up if preferred.'
    ],
    tags: ['vegetarian', 'high-protein', 'meal-prep'],
    isFavorite: false
  },
  {
    id: 2,
    title: 'Grilled Chicken Salad with Avocado',
    category: 'lunch',
    prepTime: '15 min',
    cookTime: '10 min',
    calories: 420,
    protein: 35,
    carbs: 20,
    fat: 22,
    imageUrl: '/api/placeholder/600/400',
    ingredients: [
      '6 oz chicken breast',
      '4 cups mixed greens',
      '1/2 avocado, sliced',
      '1/4 cup cherry tomatoes, halved',
      '1/4 cucumber, sliced',
      '2 tablespoons olive oil',
      '1 tablespoon balsamic vinegar',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Season chicken breast with salt and pepper.',
      'Grill chicken for 5-6 minutes per side until fully cooked.',
      'Let chicken rest for 5 minutes, then slice.',
      'In a large bowl, combine greens, tomatoes, cucumber, and avocado.',
      'Whisk together olive oil and balsamic vinegar for dressing.',
      'Top salad with sliced chicken and drizzle with dressing.',
      'Season with additional salt and pepper if needed.'
    ],
    tags: ['high-protein', 'low-carb', 'gluten-free'],
    isFavorite: true
  },
  {
    id: 3,
    title: 'Baked Salmon with Roasted Vegetables',
    category: 'dinner',
    prepTime: '15 min',
    cookTime: '25 min',
    calories: 520,
    protein: 38,
    carbs: 42,
    fat: 22,
    imageUrl: '/api/placeholder/600/400',
    ingredients: [
      '6 oz salmon fillet',
      '1 cup broccoli florets',
      '1 cup cauliflower florets',
      '1 bell pepper, chopped',
      '1/2 red onion, chopped',
      '2 tablespoons olive oil',
      '1 lemon',
      '2 cloves garlic, minced',
      'Fresh herbs (dill, parsley)',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Toss vegetables with 1 tablespoon olive oil, salt, and pepper.',
      'Spread vegetables on a baking sheet and roast for 10 minutes.',
      'Place salmon on top of vegetables, drizzle with remaining oil.',
      'Season with salt, pepper, and minced garlic.',
      'Return to oven and bake for 12-15 minutes until salmon is cooked.',
      'Squeeze lemon juice over everything and garnish with fresh herbs.'
    ],
    tags: ['high-protein', 'pescatarian', 'gluten-free'],
    isFavorite: false
  },
  {
    id: 4,
    title: 'Chocolate Protein Smoothie',
    category: 'snack',
    prepTime: '5 min',
    cookTime: '0 min',
    calories: 280,
    protein: 20,
    carbs: 30,
    fat: 9,
    imageUrl: '/api/placeholder/600/400',
    ingredients: [
      '1 scoop chocolate protein powder',
      '1 banana',
      '1 tablespoon almond butter',
      '1 cup almond milk',
      '1/2 cup ice cubes',
      '1 teaspoon cocoa powder',
      '1/2 teaspoon vanilla extract'
    ],
    instructions: [
      'Add all ingredients to a blender.',
      'Blend until smooth and creamy.',
      'Add more liquid if needed to reach desired consistency.',
      'Pour into a glass and enjoy immediately.'
    ],
    tags: ['vegetarian', 'high-protein', 'quick'],
    isFavorite: true
  },
];

type Recipe = typeof mockRecipes[0];

export default function Recipes() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [generatingRecipe, setGeneratingRecipe] = useState(false);
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    
    getUser();
    
    // In a real app, you would fetch recipes from Supabase
    // For now, we'll use the mock data
  }, []);
  
  // Filter recipes based on active category and search query
  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = activeCategory === 'all' || recipe.category === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  // Toggle favorite status
  const toggleFavorite = (recipeId: number) => {
    setRecipes(prevRecipes => 
      prevRecipes.map(recipe => 
        recipe.id === recipeId ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
    
    // In a real app, you would update the favorite status in Supabase
  };
  
  // Generate a recipe with OpenAI
  const generateRecipe = async () => {
    setGeneratingRecipe(true);
    
    // This would be where you call your API to generate a recipe with OpenAI
    // For now, we'll simulate it with a setTimeout
    
    setTimeout(() => {
      // Add a new mock recipe
      const newRecipe: Recipe = {
        id: recipes.length + 1,
        title: 'AI-Generated Vegetable Stir Fry with Tofu',
        category: 'dinner',
        prepTime: '15 min',
        cookTime: '15 min',
        calories: 380,
        protein: 22,
        carbs: 40,
        fat: 15,
        imageUrl: '/api/placeholder/600/400',
        ingredients: [
          '14 oz firm tofu, pressed and cubed',
          '2 cups mixed vegetables (bell peppers, broccoli, carrots)',
          '2 tablespoons soy sauce',
          '1 tablespoon sesame oil',
          '2 cloves garlic, minced',
          '1 inch ginger, grated',
          '1 tablespoon cornstarch',
          '2 tablespoons water',
          '2 green onions, sliced',
          '1 tablespoon sesame seeds'
        ],
        instructions: [
          'Press tofu to remove excess water, then cut into cubes.',
          'Heat sesame oil in a large pan or wok over medium-high heat.',
          'Add tofu and cook until golden brown on all sides, about 5-7 minutes.',
          'Add garlic and ginger, stir for 30 seconds until fragrant.',
          'Add vegetables and stir-fry for 5-7 minutes until crisp-tender.',
          'Mix soy sauce, cornstarch, and water in a small bowl.',
          'Pour sauce over the tofu and vegetables, stir until thickened.',
          'Garnish with green onions and sesame seeds before serving.'
        ],
        tags: ['vegetarian', 'vegan', 'quick', 'high-protein'],
        isFavorite: false
      };
      
      setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
      setGeneratingRecipe(false);
    }, 3000);
  };
  
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-green-600 mx-auto"></div>
            <p>Loading recipes...</p>
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
              Recipes
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Discover healthy and delicious meals tailored to your preferences
            </p>
          </div>
          
          {/* AI Generate Recipe Button */}
          <div className="mb-8">
            <button
              onClick={generateRecipe}
              disabled={generatingRecipe}
              className="flex items-center rounded-md bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 dark:bg-purple-700 dark:hover:bg-purple-600"
            >
              {generatingRecipe ? (
                <>
                  <svg className="mr-2 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Recipe...
                </>
              ) : (
                <>
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
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  Generate AI Recipe
                </>
              )}
            </button>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Our AI will generate a recipe based on your preferences and nutrition goals
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pr-10 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
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
            
            <div>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
              >
                {recipeCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Recipe Cards */}
          {filteredRecipes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md dark:bg-gray-800"
                >
                  <div className="relative h-48">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => toggleFavorite(recipe.id)}
                      className="absolute top-2 right-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${
                          recipe.isFavorite
                            ? 'text-red-500'
                            : 'text-gray-400 dark:text-gray-300'
                        }`}
                        fill={recipe.isFavorite ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {recipe.title}
                    </h3>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{recipe.prepTime} prep • {recipe.cookTime} cook</span>
                    </div>
                    
                    <div className="mt-4 flex justify-between">
                      <div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          CALORIES
                        </span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {recipe.calories}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          PROTEIN
                        </span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {recipe.protein}g
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          CARBS
                        </span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {recipe.carbs}g
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          FAT
                        </span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {recipe.fat}g
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {recipe.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <button
                        className="w-full rounded-md bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                        onClick={() => alert('View recipe details (to be implemented)')}
                      >
                        View Recipe
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
              <p className="text-gray-600 dark:text-gray-400">
                No recipes found. Try a different search term or category.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );