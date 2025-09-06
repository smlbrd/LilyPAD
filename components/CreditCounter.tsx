import Counter from './Counter';
import { View, Text } from 'react-native';
import CreditIcon from '../assets/NSG_CREDIT.svg';

const CreditCounter = () => (
  <Counter
    value={5}
    min={0}
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

export default CreditCounter;
