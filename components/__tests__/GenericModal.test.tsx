import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import GenericModal from '../GenericModal';

describe('GenericModal', () => {
  it('renders title and children when visible', () => {
    const { getByText } = render(
      <GenericModal visible={true} onClose={() => {}} title="Test Title">
        <Text>Modal Content</Text>
      </GenericModal>
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Modal Content')).toBeTruthy();
  });

  it('does not render title and children when not visible', () => {
    const { queryByText } = render(
      <GenericModal visible={false} onClose={() => {}} title="Hidden Title">
        <Text>Hidden Content</Text>
      </GenericModal>
    );

    expect(queryByText('Hidden Title')).toBeNull();
    expect(queryByText('Hidden Content')).toBeNull();
  });

  it('renders actions if provided', () => {
    const { getByText } = render(
      <GenericModal
        visible={true}
        onClose={() => {}}
        title="Actions Test"
        actions={<Text>Action Button</Text>}>
        <Text>Content</Text>
      </GenericModal>
    );

    expect(getByText('Action Button')).toBeTruthy();
  });
});
