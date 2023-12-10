import {renderHook} from '@testing-library/react-hooks';
import Sound from 'react-native-sound';
import useSounds from '../src/Hooks/useSounds';

jest.mock('react-native-sound', () => {
  return jest.fn().mockImplementation((sound, bundle, callback) => {
    callback(null);
    return {sound, bundle};
  });
});

describe('useSounds', () => {
  it('should initialize sounds correctly', () => {
    const {result, waitForNextUpdate} = renderHook(() => useSounds());

    waitForNextUpdate();

    expect(result.current[0]).toEqual({
      sound: require('../Sounds/blip1.wav'),
      bundle: Sound.MAIN_BUNDLE,
    });
    expect(result.current[1]).toEqual({
      sound: require('../Sounds/blip2.wav'),
      bundle: Sound.MAIN_BUNDLE,
    });
    expect(result.current[2]).toEqual({
      sound: require('../Sounds/blip3.wav'),
      bundle: Sound.MAIN_BUNDLE,
    });
    expect(result.current[3]).toEqual({
      sound: require('../Sounds/blip4.wav'),
      bundle: Sound.MAIN_BUNDLE,
    });
  });
});
