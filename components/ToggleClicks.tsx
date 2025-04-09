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
  const clicksCount = userRole === 'runner' ? 4 : 3;

  const [createClicks, setCreateClicks] = useState<boolean[]>(
    Array(clicksCount).fill(false)
  );

  useEffect(() => {
    const loadClicks = async () => {
      try {
        const savedClicks = await AsyncStorage.getItem(`clicks_${userRole}`);

        if (savedClicks) {
          setCreateClicks(JSON.parse(savedClicks));
        }
      } catch (error) {
        console.error('Failed to load clicks:', error);
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
        console.error('Failed to save clicks:', error);
      }
    };

    saveClicks();
  }, [createClicks, userRole]);

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
