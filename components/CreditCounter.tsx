import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Counter from './Counter';
import CreditIcon from '../assets/NSG_CREDIT.svg';
import { useReset } from '../contexts/ResetContext';

const CreditCounter = () => {
  const [credits, setCredits] = useState(5);
  const { resetCount } = useReset();

  useEffect(() => {
    setCredits(5);
  }, [resetCount]);

  return (
    <Counter
      value={credits}
      min={0}
      onChange={setCredits}
      renderDisplay={(credits) => (
        <View className="pointer-events-none absolute left-0 right-0 z-10 h-full flex-row items-center justify-center">
          <CreditIcon width={50} height={50} fill="#FFF" />
          <View className="w-10">
            <Text className="text-nowrap text-center text-4xl font-bold text-white">{credits}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default CreditCounter;
