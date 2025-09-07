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
  beforeEach(() => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) => {
      if (key.startsWith('user_')) return Promise.resolve(null);
      if (key.startsWith('clicks_')) return Promise.resolve(null);
      if (key.startsWith('clicks_status_')) return Promise.resolve(null);
      return Promise.resolve(null);
    });
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
    jest.clearAllMocks();
  });

  it('renders default player name', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const playerId = 'User1';
    const { findByText, getByTestId } = render(<PlayerArea playerId={playerId} />);

    expect(getByTestId(`player-nametag-${playerId}`)).toBeTruthy();
    expect(await findByText('User')).toBeTruthy();
  });

  it('loads and displays stored player name from AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('Wheels');

    const playerId = 'User2';
    const { findByText } = render(<PlayerArea playerId={playerId} />);

    expect(await findByText('Wheels')).toBeTruthy();
  });

  it('opens modal and pre-fills input with current name', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('Arissana');

    const playerId = 'User3';
    const { findByTestId } = render(<PlayerArea playerId={playerId} />);

    fireEvent.press(await findByTestId(`player-nametag-${playerId}`));

    expect(await findByTestId(`player-name-input-${playerId}`)).toHaveProp('value', 'Arissana');
  });

  it('updates player name and saves to AsyncStorage on Save', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('Player');

    const playerId = 'User4';
    const { getByTestId, findByTestId, getByText } = render(<PlayerArea playerId={playerId} />);

    fireEvent.press(await findByTestId(`player-nametag-${playerId}`));

    const input = await findByTestId(`player-name-input-${playerId}`);

    fireEvent.changeText(input, 'Sebastiao');
    fireEvent.press(getByTestId('player-name-input-save'));
    await waitFor(() => expect(getByText('Sebastiao')).toBeTruthy());
  });
});

it('closes modal and does not update name on Cancel', async () => {
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue('Pretty');

  const playerId = 'Pretty';
  const storageKey = `user_${playerId}`;

  const { getByTestId, findByTestId, getByText, queryByTestId } = render(
    <PlayerArea playerId={playerId} />
  );

  fireEvent.press(await findByTestId(`player-nametag-${playerId}`));

  const input = await findByTestId(`player-name-input-${playerId}`);
  fireEvent.changeText(input, 'Mary');
  fireEvent.press(getByTestId('player-name-input-cancel'));

  await waitFor(() => {
    expect(getByText('Pretty')).toBeTruthy();
    expect(AsyncStorage.setItem).not.toHaveBeenCalledWith(storageKey, 'Mary');
    expect(queryByTestId(`player-name-input-${playerId}`)).toBeNull();
  });
});
