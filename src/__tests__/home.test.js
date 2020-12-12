import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Home from '../containers/Home';
import store from '../store';

describe('test for items expected when the home component is rendered', () => {
  const logout = jest.fn();
  const username = 'currentUser';
  const { getByText } = render(
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Home userName={username} logout={logout} />
        </BrowserRouter>
      </Provider>
    </>,
  );

  test('should render main title', () => {
    expect(getByText('Welcome,')).not.toBeNull();
  });
});
