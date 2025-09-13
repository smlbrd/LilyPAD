import { Image, Text, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';

type DiceIconButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: any;
  iconChar?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const DiceIconButton = ({ label, onPress, icon, iconChar, style, testID }: DiceIconButtonProps) => (
  <View className="items-center" style={style}>
    <TouchableOpacity
      testID={testID}
      className="m-1 h-16 w-16 items-center justify-center rounded border border-white bg-black/30 p-2"
      onPress={onPress}>
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
    <Text className="font-bold text-white">{label}</Text>
  </View>
);

export default DiceIconButton;
