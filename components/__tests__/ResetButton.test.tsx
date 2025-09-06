import { render, fireEvent } from '@testing-library/react-native';
import { ResetContext } from '../../contexts/ResetContext';
import ResetButton from '../ResetButton';

test('ResetButton calls reset on press', () => {
  const reset = jest.fn();
  const contextValue = { reset, resetCount: 0 };

  const { getByTestId } = render(
    <ResetContext.Provider value={contextValue}>
      <ResetButton />
    </ResetContext.Provider>
  );

  fireEvent.press(getByTestId('reset-button'));
  expect(reset).toHaveBeenCalled();
});
