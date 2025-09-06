import { TouchableOpacity, View } from 'react-native';
import ResetIcon from '../assets/RESET_ICON.svg';
import { useReset } from '../contexts/ResetContext';

const ResetButton = () => {
  const { reset } = useReset();

  return (
    <View className="mt-2 items-center">
      <TouchableOpacity onPress={reset}>
        <ResetIcon testID="reset-button" width={50} height={50} fill="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default ResetButton;
