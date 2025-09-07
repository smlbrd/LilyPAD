import { Image } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import DiceIconButton from '../DiceIconButton';

describe('DiceIconButton', () => {
  it('renders label and iconChar', () => {
    const { getByText } = render(<DiceIconButton label="d6" iconChar={'\uF136'} />);

    expect(getByText('d6')).toBeTruthy();
    expect(getByText('\uF136')).toBeTruthy();
  });

  it('renders label and icon (Image)', () => {
    const iconMock = { uri: 'test.png' };
    const { getByText, UNSAFE_getByType } = render(<DiceIconButton label="icon" icon={iconMock} />);

    expect(getByText('icon')).toBeTruthy();
    expect(UNSAFE_getByType(Image)).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <DiceIconButton label="press" iconChar="B" onPress={onPress} testID="diceicon-press" />
    );

    fireEvent.press(getByTestId('diceicon-press'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders iconChar with dicefont', () => {
    const { getByText } = render(<DiceIconButton label="font" iconChar="F" />);
    const iconChar = getByText('F');

    expect(iconChar.props.style).toEqual(
      expect.objectContaining({ fontFamily: 'dicefont', fontSize: 48, color: '#FFF' })
    );
  });
});
