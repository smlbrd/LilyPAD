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
  const [rollResult, setRollResult] = useState<number | null>(null);

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

        <View className="mt-4 w-full flex-1 justify-center gap-2">
          <View className="mb-2 flex w-full flex-row justify-evenly gap-2">
            <DiceIconButton label="mark" icon={TargetIcon} />
            <DiceIconButton label="random" icon={QuestionIcon} />
            <DiceIconButton label="coin flip" iconChar={'\uF118'} onPress={() => handleRoll(2)} />
          </View>
          <View className="mb-2 flex w-full flex-row justify-evenly gap-2">
            <DiceIconButton label="d4" iconChar={'\uF130'} onPress={() => handleRoll(4)} />
            <DiceIconButton label="d6" iconChar={'\uF136'} onPress={() => handleRoll(6)} />
            <DiceIconButton label="d8" iconChar={'\uF13E'} onPress={() => handleRoll(8)} />
          </View>
          <View className="flex w-full flex-row justify-evenly gap-2">
            <DiceIconButton label="d10" iconChar={'\uF102'} onPress={() => handleRoll(10)} />
            <DiceIconButton label="d12" iconChar={'\uF10E'} onPress={() => handleRoll(12)} />
            <DiceIconButton label="d20" iconChar={'\uF125'} onPress={() => handleRoll(20)} />
          </View>
        </View>
      </GenericModal>

      <GenericModal
        visible={isRollResultModalVisible}
        onClose={() => setIsRollResultModalVisible(false)}
        title={`probability_output`}
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
        <View className="flex items-center justify-center py-8">
          <Text className="text-4xl font-bold text-white">{rollResult}</Text>
        </View>
      </GenericModal>
    </View>
  );
};

export default DiceRoller;
