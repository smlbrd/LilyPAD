import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import TargetIcon from '../assets/TARGET_ICON.png';
import QuestionIcon from '../assets/QUESTION_ICON.png';
import GenericModal from './GenericModal';

const DiceRoller = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="h-14 w-14 items-center justify-center">
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text testID="dice-button" style={{ fontFamily: 'dicefont', fontSize: 48, color: '#FFF' }}>
          {'\uF18F'}
        </Text>
      </TouchableOpacity>

      <GenericModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="terminal"
        actions={
          <>
            <TouchableOpacity
              className="mr-4 w-24 items-center justify-center border border-white px-4 py-2 shadow shadow-white"
              onPress={() => setModalVisible(false)}>
              <Text className="text-center text-base font-semibold tracking-widest text-white">
                Cancel
              </Text>
            </TouchableOpacity>
          </>
        }>
        <Text
          className="text-sm text-white"
          accessible={false}
          importantForAccessibility="no-hide-descendants">
          {
            '\n > welcome, root \n > run probability_lattice.exe \n > loading randomisation models...'
          }
        </Text>
        <Text className="font-bold text-white">{' > choose a randomiser:'}</Text>

        <View className="mt-4 w-full flex-1 justify-center gap-2">
          <View className="mb-2 flex w-full flex-row justify-evenly gap-2">
            <View className="items-center">
              <TouchableOpacity className="h-16 w-16 items-center justify-center rounded border border-white bg-black/30 p-2">
                <Image
                  source={TargetIcon}
                  style={{ width: 48, height: 52, tintColor: '#FFF' }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text className="font-bold text-white">mark</Text>
            </View>
            <View className="items-center">
              <TouchableOpacity className="m-1 h-16 w-16 items-center justify-center rounded border border-white bg-black/30 p-2">
                <Image
                  source={QuestionIcon}
                  style={{ width: 48, height: 52, tintColor: '#FFF' }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text className="font-bold text-white">random</Text>
            </View>
            <View className="items-center">
              <TouchableOpacity className="m-1 h-16 w-16 items-center justify-center rounded border border-white bg-black/30 p-2">
                <Text style={{ fontFamily: 'dicefont', fontSize: 48, color: '#FFF' }}>
                  {'\uF118'}
                </Text>
              </TouchableOpacity>
              <Text className="font-bold text-white">coin flip</Text>
            </View>
          </View>

          <View className="mb-2 flex w-full flex-row justify-evenly gap-2">
            <View className="items-center">
              <TouchableOpacity className="m-1 h-16 w-16 items-center justify-center rounded border border-white bg-black/30 p-2">
                <Text style={{ fontFamily: 'dicefont', fontSize: 48, color: '#FFF' }}>
                  {'\uF130'}
                </Text>
              </TouchableOpacity>
              <Text className="font-bold text-white">d4</Text>
            </View>
            <View className="items-center">
              <TouchableOpacity className="m-1 h-16 w-16 items-center justify-center rounded border border-white bg-black/30 p-2">
                <Text style={{ fontFamily: 'dicefont', fontSize: 48, color: '#FFF' }}>
                  {'\uF136'}
                </Text>
              </TouchableOpacity>
              <Text className="font-bold text-white">d6</Text>
            </View>
            <View className="items-center">
              <TouchableOpacity className="m-1 h-16 w-16 items-center justify-center rounded border border-white bg-black/30 p-2">
                <Text style={{ fontFamily: 'dicefont', fontSize: 48, color: '#FFF' }}>
                  {'\uF13E'}
                </Text>
              </TouchableOpacity>
              <Text className="font-bold text-white">d8</Text>
            </View>
          </View>

          <View className="flex w-full flex-row justify-evenly gap-2">
            <View className="items-center">
              <TouchableOpacity className="m-1 h-16 w-16 items-center justify-center rounded border border-white bg-black/30 p-2">
                <Text style={{ fontFamily: 'dicefont', fontSize: 48, color: '#FFF' }}>
                  {'\uF102'}
                </Text>
              </TouchableOpacity>
              <Text className="font-bold text-white">d10</Text>
            </View>
            <View className="items-center">
              <TouchableOpacity className="m-1 h-16 w-16 items-center justify-center rounded border border-white bg-black/30 p-2">
                <Text style={{ fontFamily: 'dicefont', fontSize: 48, color: '#FFF' }}>
                  {'\uF10E'}
                </Text>
              </TouchableOpacity>
              <Text className="font-bold text-white">d12</Text>
            </View>
            <View className="items-center">
              <TouchableOpacity className="m-1 h-16 w-16 items-center justify-center rounded border border-white bg-black/30 p-2">
                <Text style={{ fontFamily: 'dicefont', fontSize: 48, color: '#FFF' }}>
                  {'\uF125'}
                </Text>
              </TouchableOpacity>
              <Text className="font-bold text-white">d20</Text>
            </View>
          </View>
        </View>
      </GenericModal>
    </View>
  );
};

export default DiceRoller;
