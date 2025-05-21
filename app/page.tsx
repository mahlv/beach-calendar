'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ConvexClientProvider from './ConvexClientProvider';
import { useIsClient, useLocalStorage } from '../hooks/use-is-client';

// Import the client component dynamically
const BeachHouseCalendarClient = dynamic(
  () => import('./BeachHouseCalendarClient'),
  { ssr: false }
);

export default function Home() {
  const isClient = useIsClient();
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [mounted, setMounted] = useState(false);
  const isDarkMode = theme === 'dark';

  // Initialize theme on client side
  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference or use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (!theme) {
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, [theme, setTheme]);

  // Update theme when it changes
  useEffect(() => {
    if (!mounted) return;
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode, mounted]);
  
  // Don't render theme-dependent content until after mounting on client
  if (!mounted) {
    return (
      <ConvexClientProvider>
        <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-[1rem] mt-[1rem]">
              <h1 className="text-3xl font-semilight text-center font-nothing text-[5rem] text-[#6CD4FF] dark:text-[#90cdf4]">
                Praia
              </h1>
            </div>
          </div>
        </main>
      </ConvexClientProvider>
    );
  }

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };
  return (
    <ConvexClientProvider>
      <main className={`min-h-screen p-4 md:p-8 bg-gradient-to-b ${isDarkMode ? 'from-gray-900 to-gray-800' : 'from-sky-50 to-white'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-[1rem] mt-[1rem]">
            <h1 className={`text-3xl font-semilight text-center font-nothing text-[5rem] ${isDarkMode ? 'text-[#90cdf4]' : 'text-[#6CD4FF]'}`}>
              Praia
            </h1>
            <div className="flex flex-col items-center relative">
              <button 
                onClick={toggleTheme} 
                className="transition-transform hover:scale-110 relative group"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <img 
                  src={isDarkMode ? "/assets/gifs/moon.gif" : "/assets/gifs/Summer-sun.gif"} 
                  alt="" 
                  className="w-20 h-20" 
                  aria-hidden="true"
                />
              </button>
              <div className="flex flex-col items-center mt-1">
                <svg 
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 mb-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 15l7-7 7 7" 
                  />
                </svg>
                <span className="text-sm font-nothing text-gray-500 dark:text-gray-400">
                  clique aqui
                </span>
              </div>
            </div>
          </div>
          <BeachHouseCalendarClient isDarkMode={isDarkMode} />
          <div className="flex justify-center mt-8">
            <img 
              src={isDarkMode ? "/assets/gifs/bat.gif" : "/assets/gifs/crab.gif"} 
              alt={isDarkMode ? "Bat flying" : "Crab walking"} 
              className="w-32 h-auto" 
            />
          </div>
        </div>
      </main>
    </ConvexClientProvider>
  );
}
