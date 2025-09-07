import { View } from 'react-native';
import PlayerArea from './PlayerArea';
import { ResetProvider } from 'contexts/ResetContext';
import ResetButton from './ResetButton';
import DiceRoller from './DiceRoller';

export const MainView = () => {
  return (
    <ResetProvider>
      <View className="relative min-h-screen flex-1 items-center justify-center bg-gradient-to-b from-fuchsia-950 to-indigo-900">
        <View className="w-full flex-1 flex-col justify-between gap-2">
          <View className="flex-1 rotate-180">
            <PlayerArea />
          </View>

          <View className="flex flex-row items-center justify-center gap-x-4">
            <ResetButton />
            <DiceRoller />
          </View>

          <View className="flex-1">
            <PlayerArea />
          </View>
        </View>
      </View>
    </ResetProvider>
  );
};
