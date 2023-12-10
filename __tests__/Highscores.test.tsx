import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Highscores from '../src/Components/Highscores';
import useHighscores from '../src/Hooks/useHighscores';

jest.mock('../Hooks/useHighscores');

const mockNavigation = {
  goBack: jest.fn(),
  dispatch: jest.fn(),
  navigate: jest.fn(),
  reset: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn(),
  setParams: jest.fn(),
  setOptions: jest.fn(),
  removeListener: jest.fn(),
  addListener: jest.fn(),
};
const mockRoute = {
  params: {
    score: 100,
  },
};

describe('Highscores', () => {
  it('renders correctly', () => {
    (useHighscores as jest.Mock).mockReturnValue({
      saveScore: jest.fn(),
      scoreList: [
        {name: 'Player 1', score: 100},
        {name: 'Player 2', score: 90},
      ],
    });

    const {getByText} = render(
      <Highscores navigation={mockNavigation} route={mockRoute} />,
    );

    expect(getByText('Highscores')).toBeTruthy();
    expect(getByText('Player 1 - 100')).toBeTruthy();
    expect(getByText('Player 2 - 90')).toBeTruthy();
    expect(getByText('New Game')).toBeTruthy();
  });

  it('navigates back when New Game is pressed', () => {
    const {getByText} = render(
      <Highscores navigation={mockNavigation} route={mockRoute} />,
    );

    fireEvent.press(getByText('New Game'));

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
