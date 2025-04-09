import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ResetModalProps {
  onReset: () => void;
}

const ResetModal = ({ onReset }: ResetModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleReset = () => {
    onReset();
    closeModal();
  };

  return (
    <>
      <TouchableOpacity style={styles.resetButton} onPress={openModal}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Game</Text>
            <Text style={styles.modalSubtitle}>
              Set all values to their default?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleReset}
              >
                <Text style={styles.modalButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={closeModal}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  resetButton: {
    backgroundColor: '#FF0000',
    padding: 20,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    padding: 20,
    margin: 5,
    borderRadius: 5,
    borderColor: '#000000',
    borderWidth: 2,
    width: '50%',
    alignItems: 'center',
  },
  modalButtonCancel: {
    borderColor: '#FF0000',
    borderWidth: 2,
  },
  modalButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResetModal;
