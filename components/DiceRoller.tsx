import { TouchableOpacity, View } from 'react-native';
import DiceIcon from '../assets/dice/icon-d6-dots.svg';

const DiceRoller = () => {
  return (
    <View className="h-14 w-14 items-center justify-center">
      <TouchableOpacity>
        <DiceIcon testID="dice-button" width={50} height={50} fill="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default DiceRoller;
