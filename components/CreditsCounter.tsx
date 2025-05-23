import { useEffect, useState } from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CreditsCounterProps {
  playerID: string;
  reset: boolean;
}

const CreditsCounter = ({ playerID, reset }: CreditsCounterProps) => {
  const [credits, setCredits] = useState(5);

  const STORAGE_KEY = `credits_value_${playerID}`;

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const storedCredits = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedCredits !== null) {
          setCredits(parseInt(storedCredits, 10));
        }
      } catch (error) {
        console.error(`Failed to load credits for player ${playerID}:`, error);
      }
    };

    loadCredits();
  }, [STORAGE_KEY]);

  useEffect(() => {
    const saveCredits = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, credits.toString());
      } catch (error) {
        console.error(`Failed to save credits for player ${playerID}:`, error);
      }
    };

    saveCredits();
  }, [credits, STORAGE_KEY]);

  useEffect(() => {
    setCredits(5);
    const clearCredits = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, '5');
      } catch (error) {
        console.error(`Failed to reset credits for player ${playerID}:`, error);
      }
    };
    clearCredits();
  }, [reset]);

  const handleDecrementPress = () => {
    setCredits((previousCredits) => previousCredits - 1);
  };

  const handleIncrementPress = () => {
    setCredits((previousCredits) => previousCredits + 1);
  };

  return (
    <View style={styles.counterContainer}>
      <View style={styles.infoContainer}>
        <Image
          source={require('../assets/images/NSG_CREDIT_OPAQUE.png')}
          style={styles.creditsIcon}
        />
        <View style={styles.creditsTextContainer}>
          <Text style={styles.creditsText}>{credits}</Text>
        </View>
      </View>
      <TouchableHighlight
        onPress={handleDecrementPress}
        style={styles.decrementButton}
        underlayColor="rgba(255, 255, 255, 0.2)"
      >
        <View style={[styles.touchableArea, styles.minusIcon]}>
          <Text style={[styles.creditsText, styles.adjustButtonText]}>-</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={handleIncrementPress}
        style={styles.incrementButton}
        underlayColor="rgba(255, 255, 255, 0.2)"
      >
        <View style={[styles.touchableArea, styles.plusIcon]}>
          <Text style={[styles.creditsText, styles.adjustButtonText]}>+</Text>
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
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditsTextContainer: {
    width: 60,
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
  adjustButtonText: {
    color: 'rgba(255, 255, 255, 0.5)',
    zIndex: 0,
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
    position: 'relative',
    width: 50,
    height: 50,
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
    color: '#FFF',
    zIndex: 0,
  },
});

export default CreditsCounter;
