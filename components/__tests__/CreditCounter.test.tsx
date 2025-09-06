import { fireEvent, render } from '@testing-library/react-native';
import CreditCounter from '../CreditCounter';

describe('CreditCounter', () => {
  it('renders the initial value', () => {
    const { getByText } = render(<CreditCounter />);
    expect(getByText('5')).toBeTruthy();
  });

  it('increments the credit value', () => {
    const { getByText } = render(<CreditCounter />);
    fireEvent.press(getByText('+'));
    expect(getByText('6')).toBeTruthy();
  });

  it('decrements the credit value', () => {
    const { getByText } = render(<CreditCounter />);
    fireEvent.press(getByText('-'));
    expect(getByText('4')).toBeTruthy();
  });

  it('does not decrement below zero', () => {
    const { getByText } = render(<CreditCounter />);
    expect(getByText('5')).toBeTruthy();

    for (let i = 0; i < 5; i++) {
      fireEvent.press(getByText('-'));
    }
    expect(getByText('0')).toBeTruthy();

    fireEvent.press(getByText('-'));
    expect(getByText('0')).toBeTruthy();
  });
});
