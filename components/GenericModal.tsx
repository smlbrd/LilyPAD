import { ReactNode } from 'react';
import { Modal, Pressable, View, Text, DimensionValue } from 'react-native';

type GenericModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  actions?: ReactNode;
  modalWidth?: DimensionValue;
};

const GenericModal = ({
  visible = false,
  onClose,
  title,
  children,
  actions,
  modalWidth = '80%',
}: GenericModalProps) => (
  <Modal transparent visible={visible} onRequestClose={onClose}>
    <Pressable testID="modal-backdrop" className="flex-1 items-center justify-center bg-black/60">
      <View
        className={'border-x-2 border-t-2 border-white bg-black px-2 py-1 shadow shadow-white'}
        style={{ width: modalWidth }}>
        <Text className="text-sm text-white">{title}</Text>
      </View>
      <View
        className={'border-2 border-white bg-black shadow shadow-white'}
        style={{ width: modalWidth }}>
        <View className="p-2">{children}</View>
        <View className="my-4 flex-row items-center justify-evenly">{actions}</View>
      </View>
    </Pressable>
  </Modal>
);

export default GenericModal;
