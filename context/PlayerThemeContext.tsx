import React, { createContext, useState, useContext } from 'react';
import lilypadTheme from '../themes/lilypadTheme';
import darkTheme from '../themes/darkTheme';

const themes = { lilypad: lilypadTheme, dark: darkTheme };

type PlayerThemeContextType = {
  player1Theme: typeof lilypadTheme;
  player2Theme: typeof lilypadTheme;
  setPlayer1Theme: (themeName: 'lilypad' | 'dark') => void;
  setPlayer2Theme: (themeName: 'lilypad' | 'dark') => void;
};

const PlayerThemeContext = createContext<PlayerThemeContextType | undefined>(
  undefined
);

export const PlayerThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [player1ThemeName, setPlayer1ThemeName] = useState<'lilypad' | 'dark'>(
    'lilypad'
  );
  const [player2ThemeName, setPlayer2ThemeName] = useState<'lilypad' | 'dark'>(
    'lilypad'
  );

  const setPlayer1Theme = (themeName: 'lilypad' | 'dark') => {
    setPlayer1ThemeName(themeName);
  };

  const setPlayer2Theme = (themeName: 'lilypad' | 'dark') => {
    setPlayer2ThemeName(themeName);
  };

  return (
    <PlayerThemeContext.Provider
      value={{
        player1Theme: themes[player1ThemeName],
        player2Theme: themes[player2ThemeName],
        setPlayer1Theme,
        setPlayer2Theme,
      }}
    >
      {children}
    </PlayerThemeContext.Provider>
  );
};

export const usePlayerTheme = () => {
  const context = useContext(PlayerThemeContext);
  if (!context) {
    throw new Error('usePlayerTheme must be used within a PlayerThemeProvider');
  }
  return context;
};
