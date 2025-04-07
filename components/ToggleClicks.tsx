import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const ClickDefault = require('../assets/images/NSG_CLICK_DEFAULT_OPAQUE.png');
const ClickSpent = require('../assets/images/NSG_CLICK_SPENT_OPAQUE.png');

const ToggleClicks = () => {
  const [clickPress, setClickPress] = useState(false);

  const handleClickPress = () => {
    setClickPress((prevClickPress) => !prevClickPress);
  };

  return (
    <View style={styles.componentContainer}>
      <TouchableOpacity onPress={handleClickPress} style={styles.toggleButton}>
        <Image
          source={clickPress ? ClickSpent : ClickDefault}
          style={styles.clickIcon}
        ></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClickPress} style={styles.toggleButton}>
        <Image
          source={clickPress ? ClickSpent : ClickDefault}
          style={styles.clickIcon}
        ></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClickPress} style={styles.toggleButton}>
        <Image
          source={clickPress ? ClickSpent : ClickDefault}
          style={styles.clickIcon}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  clickIcon: {
    width: 100,
  },
});

export default ToggleClicks;
