import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../store';
import NameModal from '../src/Components/NameModal';

describe('NameModal', () => {
  it('renders correctly', () => {
    const saveScore = jest.fn();
    const {getByText} = render(
      <Provider store={store}>
        <NameModal saveScore={saveScore} score={0} />
      </Provider>,
    );

    // Check if the "Better luck next time!" text is rendered
    expect(getByText('Better luck next time!')).toBeTruthy();
  });

  it('calls saveScore when the "Show Highscores" button is pressed', () => {
    const saveScore = jest.fn();
    const {getByText} = render(
      <Provider store={store}>
        <NameModal saveScore={saveScore} score={0} />
      </Provider>,
    );

    // Press the "Show Highscores" button
    fireEvent.press(getByText('Show Highscores'));

    // Check if saveScore was called
    expect(saveScore).toHaveBeenCalled();
  });
});
