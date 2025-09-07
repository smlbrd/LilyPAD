import { render, fireEvent } from '@testing-library/react-native';
import ClicksTracker from '../ClicksTracker';
import { ResetProvider } from '../../contexts/ResetContext';
import ResetButton from '../ResetButton';

describe('ClicksTracker click icon functionality', () => {
  it('renders 3 default click icons by default', () => {
    const { getAllByTestId, queryAllByTestId } = render(<ClicksTracker />);

    expect(getAllByTestId('click-svg-default').length).toBe(3);
    expect(queryAllByTestId('click-svg-spent').length).toBe(0);
  });

  it('toggles a click icon between default and spent on press', () => {
    const { getAllByTestId, queryAllByTestId } = render(<ClicksTracker />);
    const icons = getAllByTestId('click-svg-default');

    fireEvent.press(icons[0]);

    expect(getAllByTestId('click-svg-spent').length).toBe(1);
    expect(getAllByTestId('click-svg-default').length).toBe(2);

    const spentIcon = getAllByTestId('click-svg-spent')[0];
    fireEvent.press(spentIcon.parent);

    expect(getAllByTestId('click-svg-default').length).toBe(3);
    expect(queryAllByTestId('click-svg-spent').length).toBe(0);
  });

  it('multiple icons can be toggled independently', () => {
    const { getAllByTestId } = render(<ClicksTracker />);
    const icons = getAllByTestId('click-svg-default');

    fireEvent.press(icons[0]);
    fireEvent.press(icons[1]);

    expect(getAllByTestId('click-svg-spent').length).toBe(2);
    expect(getAllByTestId('click-svg-default').length).toBe(1);
  });

  it('increments and decrements the click count', () => {
    const { getByText, getAllByTestId } = render(<ClicksTracker />);
    const plus = getByText('+');
    const minus = getByText('-');

    fireEvent.press(plus);
    expect(getAllByTestId('click-svg-default').length).toBe(4);

    fireEvent.press(minus);
    expect(getAllByTestId('click-svg-default').length).toBe(3);
  });

  it('shows condensed view when clicksCount > 4', () => {
    const { getByText, queryAllByTestId } = render(<ClicksTracker />);
    const plus = getByText('+');

    fireEvent.press(plus);
    fireEvent.press(plus);
    fireEvent.press(plus);

    expect(getByText('6')).toBeTruthy();
    expect(queryAllByTestId('click-svg-condensed').length).toBe(1);
  });

  it('resets clicks when reset is triggered', async () => {
    const { findByText, getByText, getByTestId, getAllByTestId } = render(
      <ResetProvider>
        <ClicksTracker />
        <ResetButton />
      </ResetProvider>
    );
    const plus = getByText('+');

    fireEvent.press(plus);
    expect(getAllByTestId('click-svg-default').length).toBe(4);

    fireEvent.press(getByTestId('reset-button'));

    const confirmResetButton = await findByText('Reset');
    fireEvent.press(confirmResetButton);

    expect(getAllByTestId('click-svg-default').length).toBe(3);
  });
});
