import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClickDefault = require('../assets/images/NSG_CLICK_DEFAULT_OPAQUE.png');
const ClickSpent = require('../assets/images/NSG_CLICK_SPENT_OPAQUE.png');

interface ToggleClicksProps {
  userRole: 'runner' | 'corp';
  reset: boolean;
}

const ToggleClicks = ({ userRole, reset }: ToggleClicksProps) => {
  const DEFAULT_CLICKS = { runner: 4, corp: 3 };

  const [clicksCount, setClicksCount] = useState(DEFAULT_CLICKS[userRole]);
  const [createClicks, setCreateClicks] = useState<boolean[]>(
    Array(DEFAULT_CLICKS[userRole]).fill(false)
  );

  useEffect(() => {
    const resetClicks = async () => {
      setClicksCount(DEFAULT_CLICKS[userRole]);
      setCreateClicks(Array(DEFAULT_CLICKS[userRole]).fill(false));

      try {
        await AsyncStorage.setItem(
          `clicks_${userRole}`,
          JSON.stringify(DEFAULT_CLICKS[userRole])
        );
      } catch (error) {
        console.error(`Failed to reset clicks for ${userRole}:`, error);
      }
    };

    if (reset) {
      resetClicks();
    }
  }, [reset, userRole]);

  useEffect(() => {
    const loadClicks = async () => {
      try {
        const savedClicks = await AsyncStorage.getItem(`clicks_${userRole}`);
        if (savedClicks) {
          const parsedClicks = JSON.parse(savedClicks);
          setClicksCount(parsedClicks.length);
          setCreateClicks(parsedClicks);
        }
      } catch (error) {
        console.error(`Failed to load clicks for ${userRole}:`, error);
      }
    };

    loadClicks();
  }, [userRole]);

  useEffect(() => {
    const saveClicks = async () => {
      try {
        await AsyncStorage.setItem(
          `clicks_${userRole}`,
          JSON.stringify(createClicks)
        );
      } catch (error) {
        console.error(`Failed to save clicks for ${userRole}:`, error);
      }
    };

    saveClicks();
  }, [createClicks, userRole]);

  const handleClickPress = (index: number) => {
    const updatedClicks = [...createClicks];
    updatedClicks[index] = !updatedClicks[index];
    setCreateClicks(updatedClicks);
  };

  const handleAddClick = () => {
    if (
      (clicksCount >= 4 && createClicks.some((clicked) => clicked)) ||
      createClicks.some((clicked) => clicked)
    ) {
      return;
    }

    setClicksCount((prev) => prev + 1);
    setCreateClicks((prev) => [...prev, false]);
  };

  const handleRemoveClick = () => {
    if (
      clicksCount === 3 ||
      (clicksCount >= 3 && createClicks.some((clicked) => clicked))
    ) {
      return;
    }

    setClicksCount((prev) => prev - 1);
    setCreateClicks((prev) => prev.slice(0, -1));
  };

  return (
    <View style={styles.componentContainer}>
      <TouchableHighlight
        onPress={handleRemoveClick}
        style={styles.adjustButton}
        underlayColor="rgba(255, 255, 255, 0.2)"
      >
        <View style={[styles.touchableArea, styles.minusIcon]}>
          <Text style={styles.adjustButtonText}>-</Text>
        </View>
      </TouchableHighlight>

      <View style={styles.clickContainer}>
        {clicksCount <= 4 ? (
          <View style={styles.rowContainer}>
            {createClicks.map((clicked, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleClickPress(index)}
                style={styles.toggleButton}
              >
                <Image
                  source={clicked ? ClickSpent : ClickDefault}
                  style={styles.clickIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.condensedContainer}>
            <Image source={ClickDefault} style={styles.clickIcon} />
            <Text style={styles.clickCountText}>{clicksCount}</Text>
          </View>
        )}
      </View>

      <TouchableHighlight
        onPress={handleAddClick}
        style={styles.adjustButton}
        underlayColor="rgba(255, 255, 255, 0.2)"
      >
        <View style={[styles.touchableArea, styles.plusIcon]}>
          <Text style={styles.adjustButtonText}>+</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableArea: {
    flex: 1,
    zIndex: 1,
  },
  clickContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: '#FFF',
    borderWidth: 1,
  },
  clickIcon: {
    width: 80,
    height: 80,
  },
  clickCountText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFF',
  },
  condensedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  minusIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  adjustButton: {
    width: 50,
    paddingHorizontal: 10,
    borderColor: '#FFF',
    borderWidth: 1,
  },
  adjustButtonText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowRadius: 5,
    color: 'rgba(255, 255, 255, 0.5)',
    zIndex: 0,
  },
});

export default ToggleClicks;
