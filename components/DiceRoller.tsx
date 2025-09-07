import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GenericModal from './GenericModal';
import TargetIcon from '../assets/TARGET_ICON.png';
import QuestionIcon from '../assets/QUESTION_ICON.png';
import DiceIconButton from './DiceIconButton';
import { rollDice } from '../utils/utils';

const DiceRoller = () => {
  const [isSelectDiceModalVisible, setIsSelectDiceModalVisible] = useState(false);
  const [isRollResultModalVisible, setIsRollResultModalVisible] = useState(false);
  const [rollResult, setRollResult] = useState<number | string | null>(null);

  const handleRoll = (max: number) => {
    const result = rollDice(max);

    setRollResult(result);
    setIsRollResultModalVisible(true);
  };

  return (
    <View className="h-14 w-14 items-center justify-center">
      <TouchableOpacity onPress={() => setIsSelectDiceModalVisible(true)}>
        <Text testID="dice-button" style={{ fontFamily: 'dicefont', fontSize: 48, color: '#FFF' }}>
          {'\uF18F'}
        </Text>
      </TouchableOpacity>

      <GenericModal
        visible={isSelectDiceModalVisible}
        onClose={() => setIsSelectDiceModalVisible(false)}
        title="terminal"
        actions={
          <>
            <TouchableOpacity
              className="w-24 items-center justify-center border border-white px-4 py-2 shadow shadow-white"
              onPress={() => setIsSelectDiceModalVisible(false)}>
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
        <Text className="text-sm font-bold text-white">{' > choose a randomiser:'}</Text>

        <View className="mt-4 w-full flex-1 justify-center">
          <View className="mb-2 flex w-full flex-row justify-evenly gap-1">
            <DiceIconButton label="mark" icon={TargetIcon} testID="dice-icon-mark" />
            <DiceIconButton label="random" icon={QuestionIcon} testID="dice-icon-random" />
            <DiceIconButton
              label="coinflip"
              iconChar={'\uF118'}
              onPress={() => handleRoll(2)}
              testID="dice-icon-coinflip"
            />
          </View>
          <View className="mb-2 flex w-full flex-row justify-evenly gap-1">
            <DiceIconButton
              label="d4"
              iconChar={'\uF130'}
              onPress={() => handleRoll(4)}
              testID="dice-icon-d4"
            />
            <DiceIconButton
              label="d6"
              iconChar={'\uF136'}
              onPress={() => handleRoll(6)}
              testID="dice-icon-d6"
            />
            <DiceIconButton
              label="d8"
              iconChar={'\uF13E'}
              onPress={() => handleRoll(8)}
              testID="dice-icon-d8"
            />
          </View>
          <View className="flex w-full flex-row justify-evenly gap-1">
            <DiceIconButton
              label="d10"
              iconChar={'\uF102'}
              onPress={() => handleRoll(10)}
              testID="dice-icon-d10"
            />
            <DiceIconButton
              label="d12"
              iconChar={'\uF10E'}
              onPress={() => handleRoll(12)}
              testID="dice-icon-d12"
            />
            <DiceIconButton
              label="d20"
              iconChar={'\uF125'}
              onPress={() => handleRoll(20)}
              testID="dice-icon-d20"
            />
          </View>
        </View>
      </GenericModal>

      <GenericModal
        visible={isRollResultModalVisible}
        onClose={() => setIsRollResultModalVisible(false)}
        title={`probability_output`}
        modalClassName="w-1/2"
        actions={
          <>
            <TouchableOpacity
              className="w-24 items-center justify-center border border-white px-4 py-2 shadow shadow-white"
              onPress={() => setIsRollResultModalVisible(false)}>
              <Text className="text-center text-base font-semibold tracking-widest text-white">
                Close
              </Text>
            </TouchableOpacity>
          </>
        }>
        <View className="flex items-center justify-center p-2">
          <Text className="text-lg text-white">Your result is...</Text>
          <Text className="text-3xl font-bold text-white">{rollResult}</Text>
        </View>
      </GenericModal>
    </View>
  );
};

export default DiceRoller;
