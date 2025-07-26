import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// Context to share theme data across the app
const ThemeContext = createContext({
  theme: 'system',
  setTheme: () => {},
});

// Custom ThemeProvider component
export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'app-theme',
  ...props
}) => {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Update both state and localStorage
  const setTheme = (newTheme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }} {...props}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to consume the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }
  return context;
};
