import { fireEvent, render } from '@testing-library/react-native';
import Counter from '../GenericCounter';

describe('GenericCounter', () => {
  it('renders initial value', () => {
    const { getByText } = render(<Counter value={5} />);

    expect(getByText('5')).toBeTruthy();
  });

  it('increments the credit count', () => {
    const { getByText } = render(<Counter />);

    fireEvent.press(getByText('+'));

    expect(getByText('1')).toBeTruthy();
  });

  it('decrements the credit count', () => {
    const { getByText } = render(<Counter />);

    fireEvent.press(getByText('-'));

    expect(getByText('-1')).toBeTruthy();
  });
});
