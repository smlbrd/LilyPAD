import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import { usePlayerTheme } from '../context/PlayerThemeContext';

interface SettingsMenuProps {
  playerID: 'player1' | 'player2';
}

const SettingsMenuIcon = require('../assets/images/icons8-dots-50.png');

const SettingsMenu = ({ playerID }: SettingsMenuProps) => {
  const { player1Theme, player2Theme, setPlayer1Theme, setPlayer2Theme } =
    usePlayerTheme();

  const theme = playerID === 'player1' ? player1Theme : player2Theme;
  const setTheme = playerID === 'player1' ? setPlayer1Theme : setPlayer2Theme;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.menuContainer}>
      <Pressable
        style={[styles.iconButton, { backgroundColor: theme.background }]}
        onPress={() => setModalVisible(true)}
      >
        <Image source={SettingsMenuIcon} />
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: theme.background },
            ]}
          >
            <Text style={[styles.title, { color: theme.text }]}>
              {playerID === 'player1'
                ? 'Player 1 Settings'
                : 'Player 2 Settings'}
            </Text>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.background }]}
              onPress={() => {
                setTheme('lilypad');
                setModalVisible(false);
              }}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>
                LilyPAD
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.background }]}
              onPress={() => {
                setTheme('dark');
                setModalVisible(false);
              }}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>
                Dark Theme
              </Text>
            </TouchableOpacity>

            <Pressable
              style={[
                styles.closeButton,
                { backgroundColor: theme.background },
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.closeButtonText, { color: theme.text }]}>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 10,
  },
  iconText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsMenu;
