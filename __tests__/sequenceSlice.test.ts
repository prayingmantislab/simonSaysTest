import {configureStore, Store} from '@reduxjs/toolkit';
import sequenceReducer, {
  appendElement,
  resetUserSequence,
} from '../src/Features/sequenceSlice';

describe('sequenceSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        sequence: sequenceReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const {sequence} = store.getState();
    expect(sequence.sequence).toEqual([]);
  });

  it('should handle appendElement', () => {
    store.dispatch(appendElement(1));
    const {sequence} = store.getState();
    expect(sequence.sequence).toEqual([1]);
  });

  it('should handle resetUserSequence', () => {
    store.dispatch(appendElement(1));
    store.dispatch(resetUserSequence());
    const {sequence} = store.getState();
    expect(sequence.sequence).toEqual([]);
  });
});
