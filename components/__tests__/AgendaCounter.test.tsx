import { fireEvent, render } from '@testing-library/react-native';
import AgendaCounter from '../AgendaCounter';

describe('AgendaCounter', () => {
  it('renders the initial agenda value', () => {
    const { getByText } = render(<AgendaCounter />);
    expect(getByText('0')).toBeTruthy();
  });

  it('increments the agenda value', () => {
    const { getByText } = render(<AgendaCounter />);
    fireEvent.press(getByText('+'));
    expect(getByText('1')).toBeTruthy();
  });

  it('decrements the agenda value below zero', () => {
    const { getByText } = render(<AgendaCounter />);
    fireEvent.press(getByText('-'));
    expect(getByText('-1')).toBeTruthy();
  });

  it('increments up to a default max of 7', () => {
    const { getByText } = render(<AgendaCounter />);

    for (let i = 0; i < 10; i++) {
      fireEvent.press(getByText('+'));
    }

    expect(getByText('7')).toBeTruthy();
  });
});
