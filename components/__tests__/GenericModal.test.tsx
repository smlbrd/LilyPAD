import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import GenericModal from '../GenericModal';

describe('GenericModal', () => {
  it('renders title when visible', () => {
    const { getByText } = render(
      <GenericModal visible={true} onClose={() => {}} title="Test Title"></GenericModal>
    );

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders children when visible', () => {
    const { getByText } = render(
      <GenericModal visible={true} onClose={() => {}} title="Testing Children">
        <Text>Modal Content</Text>
      </GenericModal>
    );

    expect(getByText('Modal Content')).toBeTruthy();
  });

  it('renders actions when visible', () => {
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

  it('does not render title when not visible', () => {
    const { queryByText } = render(
      <GenericModal visible={false} onClose={() => {}} title="Hidden Title"></GenericModal>
    );

    expect(queryByText('Hidden Title')).toBeNull();
  });

  it('does not render children when not visible', () => {
    const { queryByText } = render(
      <GenericModal visible={false} onClose={() => {}} title="Testing Children (Secret Edition)">
        <Text>Hidden Content</Text>
      </GenericModal>
    );

    expect(queryByText('Hidden Content')).toBeNull();
  });

  it('does not render children when not visible', () => {
    const { queryByText } = render(
      <GenericModal
        visible={false}
        onClose={() => {}}
        title="Actions Test (Secret Edition)"
        actions={<Text>Action Button</Text>}></GenericModal>
    );

    expect(queryByText('Action Button')).toBeNull();
  });
});
