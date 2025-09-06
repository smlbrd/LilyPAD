import { render, fireEvent } from '@testing-library/react-native';
import { ResetContext } from '../../contexts/ResetContext';
import ResetButton from '../ResetButton';

test('ResetButton calls reset on press', async () => {
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
