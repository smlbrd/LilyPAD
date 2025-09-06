import { fireEvent, render } from '@testing-library/react-native';
import Counter from '../Counter';

describe('Counter', () => {
  it('renders initial value', () => {
    const { getByText } = render(<Counter value={5} />);
    expect(getByText('5')).toBeTruthy();
  });

  it('increments the credit count', () => {
    const { getByText } = render(<Counter />);
    const plusButton = getByText('+');
    fireEvent.press(plusButton);
    expect(getByText('1')).toBeTruthy();
  });

  it('decrements the credit count', () => {
    const { getByText } = render(<Counter />);
    const minusButton = getByText('-');
    fireEvent.press(minusButton);
    expect(getByText('-1')).toBeTruthy();
  });
});
