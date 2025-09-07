import { render, fireEvent } from '@testing-library/react-native';
import { ResetContext } from '../../contexts/ResetContext';
import ResetButton from '../ResetButton';

describe('Reset Button', () => {
  it('calls for a reset when pressed', async () => {
    const reset = jest.fn();
    const contextValue = { reset, resetCount: 0 };

    const { findByText, getByTestId } = render(
      <ResetContext.Provider value={contextValue}>
        <ResetButton />
      </ResetContext.Provider>
    );

    fireEvent.press(getByTestId('reset-button'));

    const confirmResetButton = await findByText('Reset');
    fireEvent.press(confirmResetButton);

    expect(reset).toHaveBeenCalled();
  });
});
