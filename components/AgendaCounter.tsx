import Counter from './Counter';
import { View, Text } from 'react-native';
import { getAgendaColumns } from '../utils/utils';

interface AgendaCounterProps {
  maxScore?: number;
}

const AgendaCounter = ({ maxScore = 7 }: AgendaCounterProps) => (
  <Counter
    max={maxScore}
    renderDisplay={(currentScore) => (
      <View className="flex-1 items-center justify-center">
        <View className="absolute -bottom-4 z-0 w-4/5 flex-row items-end">
          {getAgendaColumns(maxScore, currentScore).map(({ key, height }) => (
            <View
              key={key}
              className="mx-1 rounded-sm bg-gradient-to-b from-white/10 to-white/30"
              style={{
                width: `${80 / maxScore}%`,
                height,
              }}
            />
          ))}
        </View>
        <Text className="z-0 text-center text-4xl font-bold text-white">{currentScore}</Text>
      </View>
    )}
  />
);

export default AgendaCounter;
