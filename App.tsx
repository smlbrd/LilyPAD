import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { MainView } from 'components/MainView';
import { StatusBar } from 'expo-status-bar';

import './global.css';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      dicefont: require('./public/fonts/dicefont.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <MainView />
      <StatusBar style="auto" />
    </>
  );
}
