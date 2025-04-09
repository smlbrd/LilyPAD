import CreditsCounter from '@/components/CreditsCounter';
import ResetModal from '@/components/ResetModal';
import ToggleClicks from '@/components/ToggleClicks';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Index() {
  const [resetState, setResetState] = useState(false);

  const handleReset = () => {
    setResetState((prev) => !prev);
  };

  return (
    <View style={styles.homeContainer}>
      <View style={[styles.playerContainer, styles.farContainer]}>
        <ToggleClicks userRole={'runner'} reset={resetState} />
        <CreditsCounter playerID="player2" reset={resetState} />
      </View>

      <ResetModal onReset={handleReset} />

      <View style={styles.playerContainer}>
        <ToggleClicks userRole={'corp'} reset={resetState} />
        <CreditsCounter playerID="player1" reset={resetState} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  playerContainer: {
    flex: 1,
  },
  farContainer: {
    transform: [{ rotate: '180deg' }],
  },
});
