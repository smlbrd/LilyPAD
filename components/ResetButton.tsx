import { useState } from 'react';
import { Modal, TouchableOpacity, View, Text, Pressable } from 'react-native';
import ResetIcon from '../assets/RESET_ICON.svg';
import { useReset } from '../contexts/ResetContext';

const ResetButton = () => {
  const { reset } = useReset();
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    setModalVisible(false);
    reset();
  };

  return (
    <View className="items-center">
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <ResetIcon testID="reset-button" width={50} height={50} fill="#FFF" />
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/40">
          <View className="w-4/5 border-2 border-white bg-black">
            <View className="mb-4 p-2">
              <Text
                className="text-sm text-white"
                accessible={false}
                importantForAccessibility="no-hide-descendants">
                {
                  '\n > welcome, root \n > EXECUTE SYSTEM PURGE \n > loading... \n > running d4t4-b3gon3.exe \n > warning: this will reset all values to default \n > proceed? (y/n)'
                }
              </Text>
            </View>

            <View className="mb-4 flex-row items-center justify-center">
              <Pressable
                className="mr-4 w-24 items-center justify-center border border-white px-4 py-2"
                onPress={() => setModalVisible(false)}>
                <Text className="text-center text-base font-semibold text-white">Cancel</Text>
              </Pressable>
              <Pressable
                className="w-24 items-center justify-center border border-red-600 bg-black px-4 py-2"
                onPress={handleConfirm}>
                <Text className="text-center text-base font-semibold text-red-600">Reset</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ResetButton;
