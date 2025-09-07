import { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ResetIcon from '../assets/RESET_ICON.svg';
import { useReset } from '../contexts/ResetContext';
import GenericModal from './GenericModal';

const ResetButton = () => {
  const { reset } = useReset();
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    setModalVisible(false);
    reset();
  };

  return (
    <View className="h-14 w-14 items-center justify-center">
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <ResetIcon testID="reset-button" width={50} height={50} fill="#FFF" />
      </TouchableOpacity>

      <GenericModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="terminal"
        actions={
          <>
            <TouchableOpacity
              className="w-24 items-center justify-center border border-white px-4 py-2 shadow shadow-white"
              onPress={() => setModalVisible(false)}>
              <Text className="text-center text-base font-semibold tracking-widest text-white">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 items-center justify-center border border-red-600 bg-red-600 px-4 py-2 shadow-md shadow-red-600"
              onPress={handleConfirm}>
              <Text className="text-center text-base font-semibold tracking-widest text-white">
                Reset
              </Text>
            </TouchableOpacity>
          </>
        }>
        <Text
          className="text-sm text-white"
          accessible={false}
          importantForAccessibility="no-hide-descendants">
          {
            '\n > welcome, root \n > EXECUTE SYSTEM PURGE \n > loading... \n > running d4t4-b3gon3.exe'
          }
        </Text>
        <Text className="text-sm font-bold text-white">
          {' > this will reset all values to default \n > proceed?'}
        </Text>
      </GenericModal>
    </View>
  );
};

export default ResetButton;
