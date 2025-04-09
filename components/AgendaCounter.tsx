import { useEffect, useState } from 'react';
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';

interface AgendaScoreProps {
  maxScore?: number;
  reset: boolean;
}

const AgendaScore = ({ maxScore = 7, reset }: AgendaScoreProps) => {
  const [score, setScore] = useState(0);

  const handleDecrementPress = () => {
    setScore((prevScore) => prevScore - 1);
  };

  const handleIncrementPress = () => {
    setScore((prevScore) => Math.min(prevScore + 1, maxScore));
  };

  useEffect(() => {
    if (reset) {
      setScore(0);
    }
  }, [reset]);

  return (
    <View style={styles.scoreContainer}>
      <View style={styles.rectanglesContainer}>
        {Array.from({ length: score }, (_, index) => (
          <View
            key={index}
            style={[
              styles.rectangle,
              {
                width: `${80 / maxScore}%`,
                height: 20 + index * 10,
              },
            ]}
          />
        ))}
      </View>

      <Text style={styles.scoreText}>{score}</Text>

      <TouchableHighlight
        onPress={handleDecrementPress}
        style={styles.decrementButton}
        underlayColor="rgba(255, 255, 255, 0.2)"
      >
        <View style={[styles.touchableArea, styles.minusIcon]}>
          <Text style={styles.scoreText}>-</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={handleIncrementPress}
        style={styles.incrementButton}
        underlayColor="rgba(255, 255, 255, 0.2)"
      >
        <View style={[styles.touchableArea, styles.plusIcon]}>
          <Text style={styles.scoreText}>+</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectanglesContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    width: '90%',
    zIndex: 0,
  },
  rectangle: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 2,
    borderRadius: 2,
    marginHorizontal: 5,
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
  scoreIcon: {
    position: 'absolute',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  scoreText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowRadius: 5,
    color: '#FFFFFF',
    zIndex: 0,
  },
});

export default AgendaScore;
