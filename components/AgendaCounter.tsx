import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import GenericCounter from './GenericCounter';
import { getAgendaColumns } from '../utils/utils';
import { useReset } from '../contexts/ResetContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AgendaCounterProps {
  maxAgendaPoints?: number;
  playerId: string;
}

const STORAGE_KEY = (id: string) => `agendas_${id}`;

const loadAgendaPoints = async (playerId: string) => {
  const value = await AsyncStorage.getItem(STORAGE_KEY(playerId));
  return value !== null ? Number(value) : 0;
};

const saveAgendaPoints = async (playerId: string, points: number) => {
  await AsyncStorage.setItem(STORAGE_KEY(playerId), String(points));
};

const AgendaCounter = ({ maxAgendaPoints = 7, playerId }: AgendaCounterProps) => {
  const [currentAgendaPoints, setCurrentAgendaPoints] = useState(0);
  const { resetCount } = useReset();

  useEffect(() => {
    loadAgendaPoints(playerId).then(setCurrentAgendaPoints);
  }, [playerId]);

  useEffect(() => {
    setCurrentAgendaPoints(0);
    saveAgendaPoints(playerId, 0);
  }, [resetCount, playerId]);

  useEffect(() => {
    saveAgendaPoints(playerId, currentAgendaPoints);
  }, [currentAgendaPoints, playerId]);

  return (
    <GenericCounter
      max={maxAgendaPoints}
      value={currentAgendaPoints}
      onChange={setCurrentAgendaPoints}
      renderDisplay={(points) => (
        <View className="flex-1 items-center justify-center">
          <View className="absolute -bottom-4 z-0 w-4/5 flex-row items-end">
            {getAgendaColumns(maxAgendaPoints, points).map(({ key, height }) => (
              <View
                key={key}
                className="mx-1 rounded-sm bg-gradient-to-b from-white/10 to-white/30"
                style={{
                  width: `${80 / maxAgendaPoints}%`,
                  height,
                }}
              />
            ))}
          </View>
          <Text className="z-0 text-center text-4xl font-bold text-white">{points}</Text>
        </View>
      )}
    />
  );
};

export default AgendaCounter;
