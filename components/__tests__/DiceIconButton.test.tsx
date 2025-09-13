import { render, fireEvent } from '@testing-library/react-native';
import DiceIconButton from '../DiceIconButton';

describe('DiceIconButton', () => {
  it('renders label and iconChar', () => {
    const { getByText } = render(<DiceIconButton label="d6" iconChar={'\uF136'} />);

    expect(getByText('d6')).toBeTruthy();
    expect(getByText('\uF136')).toBeTruthy();
  });

  it('renders label and icon', () => {
    const iconMock = { uri: 'test.svg' };
    const { getByText, getByTestId } = render(<DiceIconButton label="icon" icon={iconMock} />);

    expect(getByText('icon')).toBeTruthy();
    expect(getByTestId('diceicon-visual')).toBeTruthy();
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
      expect.objectContaining({ fontFamily: 'dicefont', fontSize: 40, color: '#FFF' })
    );
  });
});
