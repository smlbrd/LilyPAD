import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DiceRoller from '../DiceRoller';
import { rollDice } from '../../utils/utils';

jest.mock('../GenericModal', () => ({
  __esModule: true,
  default: ({ visible, children, actions }: any) =>
    visible ? (
      <>
        {children}
        {actions}
      </>
    ) : null,
}));

jest.mock('../../assets/TARGET_ICON.png', () => 1);

jest.mock('../../assets/QUESTION_ICON.png', () => 2);

jest.mock('../../utils/utils', () => ({
  rollDice: jest.fn(),
}));

describe('DiceRoller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dice button', () => {
    const { getByTestId } = render(<DiceRoller />);

    expect(getByTestId('dice-button')).toBeTruthy();
  });

  it('opens select dice modal on dice button press', () => {
    const { getByTestId, getByText } = render(<DiceRoller />);

    fireEvent.press(getByTestId('dice-button'));

    expect(getByText('> choose a randomiser:')).toBeTruthy();
  });

  it('shows roll result modal after rolling a dice', async () => {
    (rollDice as jest.Mock).mockReturnValue(5);
    const { getByTestId, getByText } = render(<DiceRoller />);

    fireEvent.press(getByTestId('dice-button'));
    fireEvent.press(getByTestId('dice-icon-d6'));

    await waitFor(() => {
      expect(getByText('Your roll is')).toBeTruthy();
      expect(getByText('5')).toBeTruthy();
    });
  });

  it('closes randomiser selection modal on Cancel', () => {
    const { getByTestId, getByText, queryByText } = render(<DiceRoller />);

    fireEvent.press(getByTestId('dice-button'));
    fireEvent.press(getByText('Cancel'));

    expect(queryByText('> choose a randomiser:')).toBeNull();
  });

  it('closes randomiser result modal on Close', async () => {
    (rollDice as jest.Mock).mockReturnValue(2);
    const { getByTestId, getByText, queryByText } = render(<DiceRoller />);

    fireEvent.press(getByTestId('dice-button'));
    fireEvent.press(getByTestId('dice-icon-d4'));

    await waitFor(() => {
      expect(getByText('2')).toBeTruthy();
    });

    fireEvent.press(getByText('Close'));

    expect(queryByText('2')).toBeNull();
  });

  it('shows coin flip result modal after coinflip', async () => {
    (rollDice as jest.Mock).mockReturnValue('Heads');
    const { getByTestId, getByText } = render(<DiceRoller />);

    fireEvent.press(getByTestId('dice-button'));
    fireEvent.press(getByTestId('dice-icon-coinflip'));

    await waitFor(() => {
      expect(getByText('Your coin landed on')).toBeTruthy();
      expect(getByText('Heads')).toBeTruthy();
    });
  });

  it('shows mark result modal after mark roll', async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
    const { getByTestId, getByText } = render(<DiceRoller />);

    fireEvent.press(getByTestId('dice-button'));
    fireEvent.press(getByTestId('dice-icon-mark'));

    await waitFor(() => {
      expect(getByText('Your mark is')).toBeTruthy();
      expect(getByText('Archives')).toBeTruthy();
    });

    (global.Math.random as jest.Mock).mockRestore?.();
  });
});
