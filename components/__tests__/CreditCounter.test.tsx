import { act, fireEvent, render } from '@testing-library/react-native';
import CreditCounter from '../CreditCounter';
import { ResetProvider } from '../../contexts/ResetContext';
import ResetButton from '../ResetButton';

describe('CreditCounter', () => {
  it('renders the initial value', () => {
    const { getByText } = render(<CreditCounter playerId="User1" />);

    expect(getByText('5')).toBeTruthy();
  });

  it('increments the credit value', () => {
    const { getByText } = render(<CreditCounter playerId="User1" />);

    act(() => {
      fireEvent.press(getByText('+'));
    });

    expect(getByText('6')).toBeTruthy();
  });

  it('decrements the credit value', () => {
    const { getByText } = render(<CreditCounter playerId="User1" />);

    act(() => {
      fireEvent.press(getByText('-'));
    });

    expect(getByText('4')).toBeTruthy();
  });

  it('does not decrement below zero', () => {
    const { getByText } = render(<CreditCounter playerId="User1" />);

    expect(getByText('5')).toBeTruthy();

    const minus = getByText('-');

    for (let i = 0; i < 5; i++) {
      act(() => {
        fireEvent.press(minus);
      });
    }

    expect(getByText('0')).toBeTruthy();

    act(() => {
      fireEvent.press(minus);
    });

    expect(getByText('0')).toBeTruthy();
  });

  it('resets clicks when reset is triggered', () => {
    const { getByTestId, getByText } = render(
      <ResetProvider>
        <CreditCounter playerId="User1" />
        <ResetButton />
      </ResetProvider>
    );
    expect(getByText('5')).toBeTruthy();

    act(() => {
      fireEvent.press(getByText('+'));
    });

    expect(getByText('6')).toBeTruthy();

    act(() => {
      fireEvent.press(getByTestId('reset-button'));
    });

    act(() => {
      fireEvent.press(getByText('Reset'));
    });

    expect(getByText('5')).toBeTruthy();
  });
});
