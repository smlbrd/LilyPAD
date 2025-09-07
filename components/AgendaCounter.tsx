import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Counter from './Counter';
import { getAgendaColumns } from '../utils/utils';
import { useReset } from '../contexts/ResetContext';

interface AgendaCounterProps {
  maxAgendaPoints?: number;
}

const AgendaCounter = ({ maxAgendaPoints = 7 }: AgendaCounterProps) => {
  const [currentAgendaPoints, setCurrentAgendaPoints] = useState(0);
  const { resetCount } = useReset();

  useEffect(() => {
    setCurrentAgendaPoints(0);
  }, [resetCount]);

  return (
    <Counter
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
