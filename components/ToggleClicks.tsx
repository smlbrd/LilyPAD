import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const ClickDefault = require('../assets/images/NSG_CLICK_DEFAULT_OPAQUE.png');
const ClickSpent = require('../assets/images/NSG_CLICK_SPENT_OPAQUE.png');

interface ToggleClicksProps {
  userRole: 'runner' | 'corp';
}

const ToggleClicks = ({ userRole }: ToggleClicksProps) => {
  const clicksCount = userRole === 'runner' ? 4 : 3;

  const [createClicks, setCreateClicks] = useState(
    Array(clicksCount).fill(false)
  );

  const handleClickPress = async (index: number) => {
    const newToggledStates = [...createClicks];
    newToggledStates[index] = !newToggledStates[index];
    setCreateClicks(newToggledStates);
  };

  return (
    <View style={styles.componentContainer}>
      <View style={styles.clickContainer}>
        {Array.from({ length: clicksCount }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleClickPress(index)}
            style={styles.toggleButton}
          >
            <Image
              source={createClicks[index] ? ClickSpent : ClickDefault}
              style={styles.clickIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  clickContainer: {
    flexDirection: 'row',
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  clickIcon: {
    width: 100,
  },
});

export default ToggleClicks;
