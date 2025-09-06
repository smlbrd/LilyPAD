import { useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import CreditIcon from '../assets/NSG_CREDIT.svg';

const CreditsCounter = () => {
  const [credits, setCredits] = useState(5);

  const handleDecrementPress = () => {
    setCredits((previousCredits) => previousCredits - 1);
  };

  const handleIncrementPress = () => {
    setCredits((previousCredits) => previousCredits + 1);
  };

  return (
    <View className="relative h-full w-full flex-row items-center justify-center">
      <View className="pointer-events-none absolute left-0 right-0 z-10 h-full flex-row items-center justify-center">
        <CreditIcon width={50} height={50} fill="#FFF" />
        <View className="w-10">
          <Text className="text-center text-4xl font-bold text-white">{credits}</Text>
        </View>
      </View>

      <TouchableHighlight
        onPress={handleDecrementPress}
        className="absolute left-0 top-0 z-20 h-full w-1/2"
        underlayColor="rgba(255, 255, 255, 0.2)">
        <View className="h-full flex-1 items-start justify-center pl-10">
          <Text className="text-center text-3xl font-bold text-white/50">-</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={handleIncrementPress}
        className="absolute right-0 top-0 z-20 h-full w-1/2"
        underlayColor="rgba(255, 255, 255, 0.2)">
        <View className="h-full flex-1 items-end justify-center pr-10">
          <Text className="text-center text-3xl font-bold text-white/50">+</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default CreditsCounter;
