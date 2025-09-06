import { Text, View } from 'react-native';
import AgendaCounter from './AgendaCounter';
import CreditCounter from './CreditCounter';

export default function PlayerArea() {
  return (
    <View className="m-2 flex-1 items-center justify-start rounded-2xl bg-black/10">
      <View className="mb-3 mt-4 rounded-sm bg-white px-8 py-2 shadow-lg shadow-white/90">
        <Text className="text-lg font-bold uppercase text-black">Player</Text>
      </View>
      <View className="w-full flex-1">
        <AgendaCounter />
      </View>
      <View className="w-full flex-1">
        <CreditCounter />
      </View>
    </View>
  );
}
