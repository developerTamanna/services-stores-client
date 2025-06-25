// ThemeToggle.jsx
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react'; // optional icons

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
      title={`Switch to ${darkMode ? 'Light' : 'Dark'} mode`}
    >
      {darkMode ? (
        <Sun className="text-yellow-300 w-6 h-6" />
      ) : (
        <Moon className="text-gray-800 w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
