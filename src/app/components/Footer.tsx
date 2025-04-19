import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white p-4 shadow-inner dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
          <div>
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-green-600 dark:text-green-400">FoodTracker</span>
            </Link>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Track your meals, achieve your nutrition goals
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4 dark:border-gray-700">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            © {currentYear} FoodTracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );