import CreditsCounter from '@/components/CreditsCounter';
import ToggleClicks from '@/components/ToggleClicks';
import { StyleSheet, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.homeContainer}>
      <View style={[styles.playerContainer, styles.farContainer]}>
        <ToggleClicks userRole={'runner'} />
        <CreditsCounter />
      </View>
      <View style={styles.playerContainer}>
        <ToggleClicks userRole={'corp'} />
        <CreditsCounter />
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
