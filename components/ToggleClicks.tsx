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
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    width: '100%',
    height: 'auto',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
  },
  clickIcon: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
});

export default ToggleClicks;
