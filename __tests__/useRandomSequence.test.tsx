import {renderHook, act} from '@testing-library/react-hooks';
import {useSelector, useDispatch} from 'react-redux';
import useRandomSequence from '../src/Hooks/useRandomSequence';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('useRandomSequence', () => {
  it('should start inactive and activate on next', () => {
    (useSelector as jest.Mock).mockReturnValue([]);
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    const {result} = renderHook(() => useRandomSequence());

    // Assert initial state
    expect(result.current.isActive).toBe(false);

    // Call next and assert state
    act(() => {
      result.current.next();
    });

    expect(result.current.isActive).toBe(true);
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
