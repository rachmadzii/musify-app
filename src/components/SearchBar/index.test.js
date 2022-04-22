import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import SearchBar from './index';
import store from '../../store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const setup = () =>
  render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );

describe('Search components should be render', () => {
  beforeEach(setup);
  afterEach(cleanup);

  it('Success render Search component', () => {
    expect(screen.getByLabelText('search-input')).toBeInTheDocument();
    expect(screen.getByLabelText('search-button')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('Search input value should be same as user typing', () => {
    const searchInput = screen.getByLabelText('search-input');
    userEvent.type(searchInput, 'hello');

    expect(searchInput.value).toBe('hello');
  });
});
