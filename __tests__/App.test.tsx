import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../store';
import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    // Check if the "Start" button is rendered
    expect(getByText('Start')).toBeTruthy();
  });

  it('starts the game when the "Start" button is pressed', () => {
    const {getByText} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    // Press the "Start" button
    fireEvent.press(getByText('Start'));

    // Check if the score is rendered
    // Replace '0' with the initial score in your game
    expect(getByText('0')).toBeTruthy();
  });
});
