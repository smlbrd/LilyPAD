import { act } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ResetContext } from '../../contexts/ResetContext';
import ResetButton from '../ResetButton';

describe('Reset Button', () => {
  it('calls for a reset when pressed', async () => {
    const reset = jest.fn();
    const contextValue = { reset, resetCount: 0 };

    const { getByText, getByTestId } = render(
      <ResetContext.Provider value={contextValue}>
        <ResetButton />
      </ResetContext.Provider>
    );

    fireEvent.press(getByTestId('reset-button'));

    await act(async () => {
      fireEvent.press(getByText('Reset'));
    });

    expect(reset).toHaveBeenCalled();
  });
});
