import { useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

interface CounterProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  renderDisplay?: (value: number) => React.ReactNode;
}

const Counter = ({
  value = 0,
  min = -Infinity,
  max = Infinity,
  onChange,
  renderDisplay,
}: CounterProps) => {
  const [internalValue, setInternalValue] = useState(value);

  const currentValue = onChange ? value : internalValue;

  const setValue = (newValue: number) => {
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleDecrement = () => setValue(Math.max(currentValue - 1, min));
  const handleIncrement = () => setValue(Math.min(currentValue + 1, max));

  return (
    <View className="relative h-full w-full flex-row items-center justify-center">
      {renderDisplay ? (
        renderDisplay(currentValue)
      ) : (
        <Text className="text-center text-4xl font-bold text-white">{currentValue}</Text>
      )}

      <TouchableHighlight
        onPress={handleDecrement}
        className="absolute left-0 top-0 z-10 h-full w-1/2"
        underlayColor="rgba(255, 255, 255, 0.1)">
        <View className="z-10 h-full flex-1 items-start justify-center pl-5">
          <Text className="text-center text-3xl font-bold text-white/50">-</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={handleIncrement}
        className="absolute right-0 top-0 z-10 h-full w-1/2"
        underlayColor="rgba(255, 255, 255, 0.1)">
        <View className="z-10 h-full flex-1 items-end justify-center pr-5">
          <Text className="text-center text-3xl font-bold text-white/50">+</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default Counter;
