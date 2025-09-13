import { act } from 'react';
import { fireEvent, render } from '@testing-library/react-native';
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

    fireEvent.press(getByText('+'));

    expect(getByText('6')).toBeTruthy();
  });

  it('decrements the credit value', () => {
    const { getByText } = render(<CreditCounter playerId="User1" />);

    fireEvent.press(getByText('-'));

    expect(getByText('4')).toBeTruthy();
  });

  it('does not decrement below zero', () => {
    const { getByText } = render(<CreditCounter playerId="User1" />);

    expect(getByText('5')).toBeTruthy();

    const minus = getByText('-');

    for (let i = 0; i < 5; i++) {
      fireEvent.press(minus);
    }

    expect(getByText('0')).toBeTruthy();

    fireEvent.press(minus);

    expect(getByText('0')).toBeTruthy();
  });

  it('resets clicks when reset is triggered', async () => {
    const { getByTestId, getByText } = render(
      <ResetProvider>
        <CreditCounter playerId="User1" />
        <ResetButton />
      </ResetProvider>
    );
    expect(getByText('5')).toBeTruthy();

    fireEvent.press(getByText('+'));

    expect(getByText('6')).toBeTruthy();

    await act(async () => {
      fireEvent.press(getByTestId('reset-button'));
    });

    fireEvent.press(getByText('Reset'));

    expect(getByText('5')).toBeTruthy();
  });
});
