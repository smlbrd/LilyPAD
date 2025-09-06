import { act, fireEvent, render } from '@testing-library/react-native';
import AgendaCounter from '../AgendaCounter';
import { ResetProvider } from '../../contexts/ResetContext';
import ResetButton from '../ResetButton';

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

  it('resets agenda points when reset is triggered', () => {
    const { getByText, getByTestId } = render(
      <ResetProvider>
        <AgendaCounter />
        <ResetButton />
      </ResetProvider>
    );

    fireEvent.press(getByText('+'));
    expect(getByText('1')).toBeTruthy();

    act(() => {
      fireEvent.press(getByTestId('reset-button'));
    });

    expect(getByText('0')).toBeTruthy();
  });
});
