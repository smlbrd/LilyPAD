import { Image, Text, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';

type DiceIconButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: any;
  iconChar?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  randomiserA11yLabel?: string;
  randomiserA11yHint?: string;
};

const DiceIconButton = ({
  label,
  onPress,
  icon,
  iconChar,
  style,
  testID,
  randomiserA11yLabel,
  randomiserA11yHint,
}: DiceIconButtonProps) => (
  <View className="items-center" style={style}>
    <TouchableOpacity
      testID={testID}
      className="m-1 h-16 w-16 items-center justify-center rounded border border-white bg-black/30 p-2"
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={randomiserA11yLabel}
      accessibilityHint={randomiserA11yHint}>
      {icon ? (
        <Image
          testID="diceicon-visual"
          source={icon}
          style={{ width: 44, height: 46, tintColor: '#FFF' }}
          resizeMode="contain"
        />
      ) : (
        <Text style={{ fontFamily: 'dicefont', fontSize: 40, color: '#FFF' }}>{iconChar}</Text>
      )}
    </TouchableOpacity>
    <Text className="font-bold text-white" accessible={true}>
      {label}
    </Text>
  </View>
);

export default DiceIconButton;
