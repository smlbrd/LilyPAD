import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AgendaCounter from './AgendaCounter';
import ClicksTracker from './ClicksTracker';
import CreditCounter from './CreditCounter';
import GenericModal from './GenericModal';

type PlayerAreaProps = {
  playerId: string;
};

export default function PlayerArea({ playerId }: PlayerAreaProps) {
  const storageKey = `user_${playerId}`;
  const [playerName, setPlayerName] = useState('User');
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(storageKey).then((name) => {
      if (name) setPlayerName(name);
    });
  }, [storageKey]);

  const openModal = () => {
    setInputValue(playerName);
    setModalVisible(true);
  };

  const saveName = async () => {
    setPlayerName(inputValue || 'User');
    await AsyncStorage.setItem(storageKey, inputValue || 'User');
    setModalVisible(false);
  };

  return (
    <View className="mt-2 flex-1 items-start justify-start bg-black/20">
      <View className="min-w-10 border-2 border-white bg-black px-4 py-2 shadow-sm shadow-white">
        <TouchableOpacity onPress={openModal} testID={`player-nametag-${playerId}`}>
          <Text style={{ fontFamily: 'monkirta' }} className="text-lg tracking-widest text-white">
            {playerName}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full flex-1">
        <AgendaCounter playerId={playerId} />
      </View>
      <View className="w-full flex-1">
        <ClicksTracker />
      </View>
      <View className="w-full flex-1">
        <CreditCounter playerId={playerId} />
      </View>

      <GenericModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="ADMIN_create_user"
        modalWidth="66%"
        actions={
          <>
            <TouchableOpacity
              className="w-24 items-center justify-center border border-white px-4 py-2 shadow shadow-white"
              onPress={() => {
                setModalVisible(false);
              }}
              testID={`player-name-input-cancel`}>
              <Text className="text-center text-base font-semibold tracking-widest text-white">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 items-center justify-center border border-white bg-white px-4 py-2 shadow shadow-white"
              onPress={saveName}
              testID={`player-name-input-save`}>
              <Text className="text-center text-base font-semibold tracking-widest text-black">
                Save
              </Text>
            </TouchableOpacity>
          </>
        }>
        <View className="w-full">
          <Text className="text-start text-white">{' > Enter username'}</Text>
        </View>
        <View className="w-full items-center">
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter name"
            maxLength={20}
            className="my-4 border border-white bg-zinc-800 px-4 py-2 text-base text-white"
            style={{ width: '66%' }}
            testID={`player-name-input-${playerId}`}
          />
        </View>
      </GenericModal>
    </View>
  );
}
