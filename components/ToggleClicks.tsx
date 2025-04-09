import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClickDefault = require('../assets/images/NSG_CLICK_DEFAULT_OPAQUE.png');
const ClickSpent = require('../assets/images/NSG_CLICK_SPENT_OPAQUE.png');

interface ToggleClicksProps {
  userRole: 'runner' | 'corp';
  reset: boolean;
}

const ToggleClicks = ({ userRole, reset }: ToggleClicksProps) => {
  const DEFAULT_CLICKS = { runner: 4, corp: 3 };

  const clicksCount = DEFAULT_CLICKS[userRole];

  const [createClicks, setCreateClicks] = useState<boolean[]>(
    Array(clicksCount).fill(false)
  );

  useEffect(() => {
    const resetClicks = async () => {
      const defaultClicks = Array(clicksCount).fill(false);
      setCreateClicks(defaultClicks);

      try {
        await AsyncStorage.setItem(
          `clicks_${userRole}`,
          JSON.stringify(defaultClicks)
        );
      } catch (error) {
        console.error(`Failed to reset clicks for ${userRole}:`, error);
      }
    };

    resetClicks();
  }, [reset, userRole]);

  useEffect(() => {
    const loadClicks = async () => {
      try {
        const savedClicks = await AsyncStorage.getItem(`clicks_${userRole}`);
        if (savedClicks) {
          setCreateClicks(JSON.parse(savedClicks));
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
