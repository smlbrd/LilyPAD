import { ReactNode } from 'react';
import { Modal, Pressable, View, Text } from 'react-native';

type GenericModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  actions?: ReactNode;
  modalClassName?: string;
};

const GenericModal = ({
  visible = false,
  onClose,
  title,
  children,
  actions,
  modalClassName = 'w-4/5',
}: GenericModalProps) => (
  <Modal transparent visible={visible} onRequestClose={onClose}>
    <Pressable
      testID="modal-backdrop"
      className="flex-1 items-center justify-center bg-black/60"
      onPress={onClose}>
      <View
        className={`border-x-2 border-t-2 border-white bg-black px-2 py-1 shadow shadow-white ${modalClassName}`}>
        <Text className="text-sm text-white">{title}</Text>
      </View>
      <View className={`border-2 border-white bg-black shadow shadow-white ${modalClassName}`}>
        <View className="p-2">{children}</View>
        <View className="mb-4 flex-row items-center justify-evenly">{actions}</View>
      </View>
    </Pressable>
  </Modal>
);

export default GenericModal;
