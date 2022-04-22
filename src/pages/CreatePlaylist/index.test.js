import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import store from '../../store';
import { Provider } from 'react-redux';
import CreatePlaylist from './index';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../../utils/config';

export const server = setupServer(
  rest.get(`${config.SPOTIFY_BASE_URL}/search`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tracks: {
          items: [
            {
              id: '1',
              album: {
                images: [
                  {
                    url: 'Images URL',
                  },
                ],
              },
              name: 'Track Title',
              artists: [
                {
                  name: 'Track Artist',
                },
              ],
              duration_ms: '00:01:00',
              external_urls: {
                spotify: 'Spotify URL',
              },
              uri: 'Track Uri',
            },
          ],
        },
      })
    );
  })
);

const setup = () =>
  render(
    <Provider store={store}>
      <CreatePlaylist />
    </Provider>
  );

describe('Create Playlist should be render', () => {
  beforeEach(setup);
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => server.close());

  it('Should render track items after search', async () => {
    const searchInput = screen.getByLabelText('search-input');
    const buttonSearch = screen.getByLabelText('search-button');

    userEvent.type(searchInput, 'nct dream');
    userEvent.click(buttonSearch);

    await screen.findByText(/track title/i);

    const imageTrack = screen.getByLabelText('image-track');
    const titleTrack = screen.getByLabelText('title-track');
    const artistTrack = screen.getByLabelText('artist-track');
    const duration = screen.getByLabelText('duration-track');
    const btnTrack = screen.getByLabelText('button-track');

    expect(imageTrack).toBeInTheDocument();
    expect(titleTrack).toBeInTheDocument();
    expect(artistTrack).toBeInTheDocument();
    expect(duration).toBeInTheDocument();
    expect(btnTrack).toBeInTheDocument();
  });
});
