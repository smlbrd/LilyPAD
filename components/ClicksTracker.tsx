import { useState, useEffect } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import ClickDefault from '../assets/NSG_CLICK_DEFAULT.svg';
import ClickSpent from '../assets/NSG_CLICK_SPENT.svg';
import { useReset } from '../contexts/ResetContext';

const ClicksTracker = () => {
  const [clicksCount, setClicksCount] = useState(3);
  const [createClicks, setCreateClicks] = useState<boolean[]>(Array(3).fill(false));
  const { resetCount } = useReset();

  useEffect(() => {
    setClicksCount(3);
  }, [resetCount]);

  useEffect(() => {
    setCreateClicks((prev) => {
      if (clicksCount > prev.length) {
        return [...prev, ...Array(clicksCount - prev.length).fill(false)];
      } else if (clicksCount < prev.length) {
        return prev.slice(0, clicksCount);
      }
      return prev;
    });
  }, [clicksCount]);

  const canIncrement =
    clicksCount > 4 || (clicksCount < 5 && createClicks.every((spent) => !spent));
  const canDecrement = clicksCount > 3;

  const handleIncrement = () => {
    if (canIncrement) {
      setClicksCount((c) => c + 1);
    }
  };

  const handleDecrement = () => {
    if (canDecrement) {
      setClicksCount((c) => c - 1);
    }
  };

  const handleClickPress = (index: number) => {
    setCreateClicks((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const isCondensed = clicksCount > 4;

  return (
    <View className="h-full w-full flex-1 flex-row items-center justify-center">
      <TouchableHighlight
        onPress={handleDecrement}
        disabled={!canDecrement}
        className={`absolute left-0 top-0 z-10 h-full ${isCondensed ? 'w-1/2' : 'w-1/6'}`}
        underlayColor="rgba(255, 255, 255, 0.1)">
        <View className="z-10 h-full flex-1 items-start justify-center pl-5">
          <Text className="text-center text-3xl font-bold text-white/50">-</Text>
        </View>
      </TouchableHighlight>

      {isCondensed ? (
        <View className="flex w-4/6 flex-row items-center justify-center">
          <ClickDefault testID="click-svg-condensed" width={70} height={70} fill="#FFF" />
          <View className="w-10">
            <Text className="text-4xl font-bold text-white">{clicksCount}</Text>
          </View>
        </View>
      ) : (
        <View className="flex w-4/6 flex-row items-center justify-evenly">
          {createClicks.map((clicked, index) => (
            <TouchableHighlight
              key={index}
              onPress={() => handleClickPress(index)}
              className="flex flex-1 items-center"
              underlayColor="rgba(255, 255, 255, 0.1)">
              {clicked ? (
                <ClickSpent testID="click-svg-spent" width={70} height={70} fill="#FFFFFF80" />
              ) : (
                <ClickDefault testID="click-svg-default" width={70} height={70} fill="#FFF" />
              )}
            </TouchableHighlight>
          ))}
        </View>
      )}

      <TouchableHighlight
        onPress={handleIncrement}
        disabled={!canIncrement}
        className={`absolute right-0 top-0 z-10 h-full ${isCondensed ? 'w-1/2' : 'w-1/6'} ${!canIncrement ? 'opacity-50' : ''}`}
        underlayColor="rgba(255, 255, 255, 0.1)">
        <View className="z-10 h-full flex-1 items-end justify-center pr-5">
          <Text className="text-center text-3xl font-bold text-white/50">+</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default ClicksTracker;
