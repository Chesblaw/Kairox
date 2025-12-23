'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="relative overflow-hidden transition-all duration-500 hover:scale-105 border-primary/20 hover:border-primary/40"
    >
      <div className="relative flex items-center gap-1 sm:gap-2">
        <Sun
          className={`h-4 w-4 transition-all duration-700 ${
            theme === 'dark'
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          className={`h-4 w-4 absolute transition-all duration-700 ${
            theme === 'dark'
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
        <span className="ml-4 sm:ml-6 text-xs font-medium">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </span>
      </div>

      {/* Cool gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </Button>
  );
}
