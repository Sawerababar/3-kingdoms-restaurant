import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'day' | 'night';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'night',
  setMode: () => {},
  toggleMode: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to night mode as featured in the reference image, but allow toggling
  const [mode, setMode] = useState<ThemeMode>('night');

  const toggleMode = () => {
    setMode((prev) => (prev === 'day' ? 'night' : 'day'));
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      <div className={mode === 'night' ? 'dark' : 'light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
