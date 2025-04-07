import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

const CreditsCounter = () => {
  const [credits, setCredits] = useState(0);

  const handleDecrementPress = () => {
    // TODO: Make haptics conditional, based on device platform
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCredits((previousCredits) => previousCredits - 1);
  };

  const handleIncrementPress = () => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCredits((previousCredits) => previousCredits + 1);
  };

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.creditsText}>{credits}</Text>
      <Image
        source={require('../assets/images/NSG_CREDIT_HALFTRANSPARENT.png')}
        style={styles.creditsIcon}
      />
      <TouchableHighlight
        onPress={handleDecrementPress}
        style={styles.decrementButton}
        underlayColor="rgba(255, 255, 255, 0.2)"
      >
        <View style={[styles.touchableArea, styles.minusIcon]}>
          <Text style={styles.creditsText}>-</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={handleIncrementPress}
        style={styles.incrementButton}
        underlayColor="rgba(255, 255, 255, 0.2)"
      >
        <View style={[styles.touchableArea, styles.plusIcon]}>
          <Text style={styles.creditsText}>+</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableArea: {
    flex: 1,
    zIndex: 1,
  },
  decrementButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
  },
  incrementButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '50%',
  },
  plusIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  minusIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  creditsIcon: {
    position: 'absolute',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  creditsText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowRadius: 5,
    color: '#FFFFFF',
    zIndex: 0,
  },
});

export default CreditsCounter;
