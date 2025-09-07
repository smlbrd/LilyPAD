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
        <Pressable
          className="flex-1 items-center justify-center bg-black/40"
          onPress={() => setModalVisible(false)}>
          <View className="w-4/5 border-x-2 border-t-2 border-white bg-black px-2 py-1 shadow shadow-white">
            <Text
              className="text-sm text-white"
              accessible={false}
              importantForAccessibility="no-hide-descendants">
              TERMINAL
            </Text>
          </View>
          <View className="w-4/5 border-2 border-white bg-black shadow shadow-white">
            <View className="mb-4 p-2">
              <Text
                className="text-sm text-white"
                accessible={false}
                importantForAccessibility="no-hide-descendants">
                {
                  '\n > welcome, root \n > EXECUTE SYSTEM PURGE \n > loading... \n > running d4t4-b3gon3.exe'
                }
              </Text>
              <Text className="text-sm text-white">
                {' > warning: this will reset all values to default \n > proceed?'}
              </Text>
            </View>

            <View className="mb-4 flex-row items-center justify-center">
              <Pressable
                className="mr-4 w-24 items-center justify-center border border-white px-4 py-2 shadow shadow-white"
                onPress={() => setModalVisible(false)}>
                <Text className="text-center text-base font-semibold tracking-widest text-white">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                className="w-24 items-center justify-center border border-red-600 bg-red-600 px-4 py-2 shadow-md shadow-red-600"
                onPress={handleConfirm}>
                <Text className="text-center text-base font-semibold tracking-widest text-white">
                  Reset
                </Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ResetButton;
