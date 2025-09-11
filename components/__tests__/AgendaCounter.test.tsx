import { act, fireEvent, render } from '@testing-library/react-native';
import AgendaCounter from '../AgendaCounter';
import { ResetProvider } from '../../contexts/ResetContext';
import ResetButton from '../ResetButton';

describe('AgendaCounter', () => {
  it('renders the initial agenda value', () => {
    const { getByText } = render(<AgendaCounter playerId="User1" />);

    expect(getByText('0')).toBeTruthy();
  });

  it('increments the agenda value', () => {
    const { getByText } = render(<AgendaCounter playerId="User1" />);

    act(() => {
      fireEvent.press(getByText('+'));
    });

    expect(getByText('1')).toBeTruthy();
  });

  it('decrements the agenda value below zero', () => {
    const { getByText } = render(<AgendaCounter playerId="User1" />);

    act(() => {
      fireEvent.press(getByText('-'));
    });

    expect(getByText('-1')).toBeTruthy();
  });

  it('increments up to a default max of 7', () => {
    const { getByText } = render(<AgendaCounter playerId="User1" />);

    for (let i = 0; i < 10; i++) {
      act(() => {
        fireEvent.press(getByText('+'));
      });
    }

    expect(getByText('7')).toBeTruthy();
  });

  it('resets agenda points when reset is triggered', () => {
    const { getByText, getByTestId } = render(
      <ResetProvider>
        <AgendaCounter playerId="User1" />
        <ResetButton />
      </ResetProvider>
    );

    act(() => {
      fireEvent.press(getByText('+'));
    });

    expect(getByText('1')).toBeTruthy();

    act(() => {
      fireEvent.press(getByTestId('reset-button'));
    });

    act(() => {
      fireEvent.press(getByText('Reset'));
    });

    expect(getByText('0')).toBeTruthy();
  });
});
