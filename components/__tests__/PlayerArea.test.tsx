import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PlayerArea from '../PlayerArea';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('../GenericModal', () => ({
  __esModule: true,
  default: ({ visible, children, actions }: any) =>
    visible ? (
      <>
        {children}
        {actions}
      </>
    ) : null,
}));

describe('PlayerArea user profile', () => {
  const playerId = 'Arissana';
  const storageKey = `playerName_${playerId}`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders default player name', () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { findByText, getByTestId } = render(<PlayerArea playerId={playerId} />);

    expect(getByTestId(`player-nametag-${playerId}`)).toBeTruthy();
    expect(findByText('User')).toBeTruthy();
  });

  it('loads and displays stored player name from AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('Wheels');

    const { findByText } = render(<PlayerArea playerId={playerId} />);

    expect(await findByText('Wheels')).toBeTruthy();
  });

  it('opens modal and pre-fills input with current name', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('Arissana');

    const { findByTestId } = render(<PlayerArea playerId={playerId} />);

    fireEvent.press(await findByTestId(`player-nametag-${playerId}`));

    expect(await findByTestId(`player-name-input-${playerId}`)).toHaveProp('value', 'Arissana');
  });

  it('updates player name and saves to AsyncStorage on Save', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('Player');

    const { getByTestId, findByTestId, getByText, queryByTestId } = render(
      <PlayerArea playerId={playerId} />
    );

    fireEvent.press(await findByTestId(`player-nametag-${playerId}`));

    const input = await findByTestId(`player-name-input-${playerId}`);

    fireEvent.changeText(input, 'Sebastiao');
    fireEvent.press(getByTestId('player-name-input-save'));

    await waitFor(() => {
      expect(getByText('Sebastiao')).toBeTruthy();
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(storageKey, 'Sebastiao');
      expect(queryByTestId(`player-name-input-${playerId}`)).toBeNull();
    });
  });

  it('closes modal and does not update name on Cancel', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('Pretty');

    const { getByTestId, findByTestId, getByText, queryByTestId } = render(
      <PlayerArea playerId={playerId} />
    );

    fireEvent.press(await findByTestId(`player-nametag-${playerId}`));

    const input = await findByTestId(`player-name-input-${playerId}`);
    fireEvent.changeText(input, 'Mary');
    fireEvent.press(getByTestId('player-name-input-cancel'));

    await waitFor(() => {
      expect(getByText('Pretty')).toBeTruthy();
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      expect(queryByTestId(`player-name-input-${playerId}`)).toBeNull();
    });
  });
});
