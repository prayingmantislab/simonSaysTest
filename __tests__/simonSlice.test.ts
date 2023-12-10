import {configureStore, Store} from '@reduxjs/toolkit';
import simonReducer, {triggerColor} from '../src/Features/simonSlice';

describe('simonSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        simon: simonReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const {simon} = store.getState();
    expect(simon.currentColor).toBe(-1);
  });

  it('should handle triggerColor', () => {
    store.dispatch(triggerColor(2));
    const {simon} = store.getState();
    expect(simon.currentColor).toBe(2);
  });
});
