import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import GenericCounter from './GenericCounter';
import CreditIcon from '../assets/NSG_CREDIT.svg';
import { useReset } from '../contexts/ResetContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CreditCounterProps {
  defaultCredits?: number;
  playerId: string;
}

const STORAGE_KEY = (id: string) => `credits_${id}`;

const loadCredits = async (playerId: string, defaultCredits: number) => {
  const value = await AsyncStorage.getItem(STORAGE_KEY(playerId));
  return value !== null ? Number(value) : defaultCredits;
};

const saveCredits = async (playerId: string, credits: number) => {
  await AsyncStorage.setItem(STORAGE_KEY(playerId), String(credits));
};

const CreditCounter = ({ defaultCredits = 5, playerId }: CreditCounterProps) => {
  const [credits, setCredits] = useState(defaultCredits);
  const { resetCount } = useReset();

  useEffect(() => {
    loadCredits(playerId, defaultCredits).then(setCredits);
  }, [playerId, defaultCredits]);

  useEffect(() => {
    setCredits(defaultCredits);
    saveCredits(playerId, defaultCredits);
  }, [resetCount, defaultCredits, playerId]);

  useEffect(() => {
    saveCredits(playerId, credits);
  }, [credits, playerId]);

  return (
    <GenericCounter
      value={credits}
      min={0}
      onChange={setCredits}
      renderDisplay={(credits) => (
        <View className="pointer-events-none absolute left-0 right-0 z-10 h-full flex-row items-center justify-center">
          <CreditIcon width={40} height={40} fill="#FFF" />
          <View className="w-15">
            <Text
              className="text-nowrap text-center text-4xl font-bold text-white"
              numberOfLines={1}>
              {credits}
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default CreditCounter;
