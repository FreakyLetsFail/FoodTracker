import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  <span className="block text-green-600 dark:text-green-400">Track Your Nutrition.</span>
                  <span className="block">Achieve Your Goals.</span>
                </h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                  FoodTracker helps you monitor your daily nutrition, discover new recipes, and reach your health goals with personalized insights.
                </p>
                <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="/sign-up"
                    className="rounded-md bg-green-600 px-6 py-3 text-center text-base font-medium text-white shadow-md hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                  >
                    Get Started - It's Free
                  </Link>
                  <Link
                    href="/about"
                    className="rounded-md border border-gray-300 bg-white px-6 py-3 text-center text-base font-medium text-gray-700 shadow-md hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="mt-10 hidden lg:mt-0 lg:block lg:w-1/2 lg:pl-10">
                <div className="relative h-64 w-full rounded-lg shadow-lg sm:h-72 md:h-96">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-center text-lg text-gray-700 dark:text-gray-300">
                      [App Screenshot Placeholder]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                Powerful Features
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                Everything you need to take control of your nutrition
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Food Logging
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Easily log your meals using our extensive food database or by scanning barcodes with your phone.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Nutrition Insights
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Get detailed information about your macro and micronutrient intake with visual analytics.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
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
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  AI Recipe Suggestions
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Get personalized recipe recommendations based on your dietary preferences and nutrition goals.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Goal Tracking
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Set personal nutrition and health goals, and track your progress over time with detailed reports.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
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
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Barcode Scanner
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Quickly add foods by scanning product barcodes with your device's camera for instant nutrition info.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300">
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
                      d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Offline Access
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Use the app anywhere with full offline functionality. Your data syncs when you're back online.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-600 py-16 dark:bg-green-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-3/4">
                <h2 className="text-3xl font-extrabold text-white">
                  Ready to start your healthy journey?
                </h2>
                <p className="mt-4 text-lg text-green-100">
                  Sign up today and get access to all features for free during our beta period.
                </p>
              </div>
              <div className="mt-8 lg:mt-0">
                <Link
                  href="/sign-up"
                  className="inline-block rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-green-600 shadow hover:bg-green-50 dark:text-green-800"
                >
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );