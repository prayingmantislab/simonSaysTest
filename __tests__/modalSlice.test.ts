import {configureStore, Store} from '@reduxjs/toolkit';
import modalReducer, {showModal, hideModal} from '../src/Features/modalSlice';

describe('modalSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        modal: modalReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const {modal} = store.getState();
    expect(modal.showModal).toBe(false);
  });

  it('should handle showModal', () => {
    store.dispatch(showModal());
    const {modal} = store.getState();
    expect(modal.showModal).toBe(true);
  });

  it('should handle hideModal', () => {
    store.dispatch(showModal());
    store.dispatch(hideModal());
    const {modal} = store.getState();
    expect(modal.showModal).toBe(false);
  });
});
