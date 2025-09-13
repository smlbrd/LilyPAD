import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import GenericModal from './GenericModal';
import TargetIcon from '../assets/TARGET_ICON.png';
import QuestionIcon from '../assets/QUESTION_ICON.png';
import DiceIconButton from './DiceIconButton';
import ArchivesIcon from '../assets/NSG_ARCHIVES.svg';
import HQIcon from '../assets/NSG_HQ.svg';
import RDIcon from '../assets/NSG_RD.svg';
import { rollDice } from '../utils/utils';

const DiceRoller = () => {
  const [isSelectDiceModalVisible, setIsSelectDiceModalVisible] = useState(false);
  const [isCustomRollModalVisible, setIsCustomRollModalVisible] = useState(false);
  const [isRollResultModalVisible, setIsRollResultModalVisible] = useState(false);
  const [rollResult, setRollResult] = useState<number | string | null>(null);
  const [customMax, setCustomMax] = useState('');

  const handleDiceRoll = (max: number) => {
    const result = rollDice(max);

    setRollResult(result);
    setIsRollResultModalVisible(true);
  };

  const handleMarkRoll = () => {
    const outcomes = ['Archives', 'R&D', 'HQ'];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];

    setRollResult(result);
    setIsRollResultModalVisible(true);
  };

  const handleCustomRoll = () => {
    handleDiceRoll(Number(customMax));

    setIsCustomRollModalVisible(false);
    setCustomMax('');
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
          {' > run probability_lattice.exe \n > loading randomisation models...'}
        </Text>
        <Text className="text-sm font-bold text-white">{' > choose a randomiser:'}</Text>

        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            marginTop: 4,
            gap: 4,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-evenly',
              marginBottom: 4,
              gap: 4,
            }}>
            <DiceIconButton
              label="mark"
              icon={TargetIcon}
              testID="dice-icon-mark"
              onPress={handleMarkRoll}
            />
            <DiceIconButton
              label="custom"
              icon={QuestionIcon}
              testID="dice-icon-custom"
              onPress={() => setIsCustomRollModalVisible(true)}
            />
            <DiceIconButton
              label="coinflip"
              iconChar={'\uF118'}
              onPress={() => handleDiceRoll(2)}
              testID="dice-icon-coinflip"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-evenly',
              marginBottom: 4,
              gap: 4,
            }}>
            <DiceIconButton
              label="d4"
              iconChar={'\uF130'}
              onPress={() => handleDiceRoll(4)}
              testID="dice-icon-d4"
            />
            <DiceIconButton
              label="d6"
              iconChar={'\uF136'}
              onPress={() => handleDiceRoll(6)}
              testID="dice-icon-d6"
            />
            <DiceIconButton
              label="d8"
              iconChar={'\uF13E'}
              onPress={() => handleDiceRoll(8)}
              testID="dice-icon-d8"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-evenly',
              marginBottom: 4,
              gap: 4,
            }}>
            <DiceIconButton
              label="d10"
              iconChar={'\uF102'}
              onPress={() => handleDiceRoll(10)}
              testID="dice-icon-d10"
            />
            <DiceIconButton
              label="d12"
              iconChar={'\uF10E'}
              onPress={() => handleDiceRoll(12)}
              testID="dice-icon-d12"
            />
            <DiceIconButton
              label="d20"
              iconChar={'\uF125'}
              onPress={() => handleDiceRoll(20)}
              testID="dice-icon-d20"
            />
          </View>
        </View>
      </GenericModal>

      <GenericModal
        visible={isRollResultModalVisible}
        onClose={() => setIsRollResultModalVisible(false)}
        title={`probability_output`}
        modalWidth="66%"
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
          <Text className="text-lg text-white">{`Your ${
            typeof rollResult === 'number'
              ? 'roll is'
              : rollResult === 'Heads' || rollResult === 'Tails'
                ? 'coin landed on'
                : 'mark is'
          }`}</Text>
          {rollResult === 'Archives' && (
            <View className="my-2">
              <ArchivesIcon width={48} height={48} fill="#FFF" />
            </View>
          )}
          {rollResult === 'R&D' && (
            <View className="my-2">
              <RDIcon width={48} height={48} fill="#FFF" />
            </View>
          )}
          {rollResult === 'HQ' && (
            <View className="my-2">
              <HQIcon width={48} height={48} fill="#FFF" />
            </View>
          )}
          <Text className="text-3xl font-bold text-white">{rollResult}</Text>
        </View>
      </GenericModal>

      <GenericModal
        visible={isCustomRollModalVisible}
        onClose={() => {
          setIsCustomRollModalVisible(false);
          setCustomMax('');
        }}
        title="probability_output"
        modalWidth="66%"
        actions={
          <>
            <TouchableOpacity
              className="w-24 items-center justify-center border border-white px-4 py-2 shadow shadow-white"
              onPress={() => {
                setIsCustomRollModalVisible(false);
                setCustomMax('');
              }}>
              <Text className="text-center text-base font-semibold tracking-widest text-white">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 items-center justify-center border border-white bg-white px-4 py-2 shadow shadow-white"
              onPress={handleCustomRoll}
              disabled={
                customMax.trim() === '' || isNaN(Number(customMax)) || Number(customMax) < 1
              }>
              <Text className="text-center text-base font-semibold tracking-widest text-black">
                Roll
              </Text>
            </TouchableOpacity>
          </>
        }>
        <Text className="mb-2 text-center text-white">Generate number between 1 and...</Text>
        <View className="w-full items-center">
          <TextInput
            className="mb-2 mt-2 w-32 border border-white bg-zinc-800 px-4 py-2 text-xl text-white"
            keyboardType="numeric"
            value={customMax}
            onChangeText={setCustomMax}
            placeholder="100"
            placeholderTextColor="#888"
            maxLength={10}
            testID="dice-input-custom"
          />
        </View>
      </GenericModal>
    </View>
  );
};

export default DiceRoller;
