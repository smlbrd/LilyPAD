import { fireEvent, render } from '@testing-library/react-native';
import CreditCounter from '../CreditCounter';
import { ResetProvider } from '../../contexts/ResetContext';
import ResetButton from '../ResetButton';

describe('CreditCounter', () => {
  it('renders the initial value', () => {
    const { getByText } = render(<CreditCounter />);
    expect(getByText('5')).toBeTruthy();
  });

  it('increments the credit value', () => {
    const { getByText } = render(<CreditCounter />);
    const plus = getByText('+');

    fireEvent.press(plus);
    expect(getByText('6')).toBeTruthy();
  });

  it('decrements the credit value', () => {
    const { getByText } = render(<CreditCounter />);
    const minus = getByText('-');

    fireEvent.press(minus);
    expect(getByText('4')).toBeTruthy();
  });

  it('does not decrement below zero', () => {
    const { getByText } = render(<CreditCounter />);
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
    const { findByText, getByTestId, getByText } = render(
      <ResetProvider>
        <CreditCounter />
        <ResetButton />
      </ResetProvider>
    );
    expect(getByText('5')).toBeTruthy();

    const plus = getByText('+');

    fireEvent.press(plus);
    expect(getByText('6')).toBeTruthy();

    fireEvent.press(getByTestId('reset-button'));

    const confirmResetButton = await findByText('Reset');
    fireEvent.press(confirmResetButton);

    expect(getByText('5')).toBeTruthy();
  });
});
