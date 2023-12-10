import {renderHook, act} from '@testing-library/react-hooks';
import RNFS from 'react-native-fs';
import useHighscores from '../src/Hooks/useHighscores';

jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: 'path/to/documents',
  exists: jest.fn(),
  writeFile: jest.fn(),
  readFile: jest.fn(),
}));

describe('useHighscores', () => {
  it('initializes correctly', async () => {
    (RNFS.exists as jest.Mock).mockResolvedValue(false);
    const {_, waitForNextUpdate} = renderHook(() => useHighscores());
    await waitForNextUpdate();

    expect(RNFS.exists).toHaveBeenCalledWith(
      'path/to/documents/highscores.txt',
    );
    expect(RNFS.writeFile).toHaveBeenCalledWith(
      'path/to/documents/highscores.txt',
      '',
    );
  });

  it('saves a score correctly', async () => {
    (RNFS.exists as jest.Mock).mockResolvedValue(true);
    (RNFS.readFile as jest.Mock).mockResolvedValue(
      JSON.stringify({name: 'John', score: 10}) + '|',
    );
    const {result, waitForNextUpdate} = renderHook(() => useHighscores());

    await waitForNextUpdate();

    act(() => {
      result.current.saveScore('Jane', 20);
    });

    await waitForNextUpdate();

    expect(RNFS.writeFile).toHaveBeenCalledWith(
      'path/to/documents/highscores.txt',
      JSON.stringify({name: 'Jane', score: 20}) +
        '|' +
        JSON.stringify({name: 'John', score: 10}) +
        '|',
    );
  });
});
