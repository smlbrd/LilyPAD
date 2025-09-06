import { MainView } from 'components/MainView';
import { StatusBar } from 'expo-status-bar';

import './global.css';

export default function App() {
  return (
    <>
      <MainView />
      <StatusBar style="auto" />
    </>
  );
}
