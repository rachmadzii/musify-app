const getHost: () => string = () => {
  const protocol: string = window.location.protocol;
  const host: string = window.location.host;

  return `${protocol}//${host}`;
};

interface IConfig {
  API_URL: string | undefined;
  SPOTIFY_AUTH_URL: string;
  SPOTIFY_BASE_URL: string;
  SPOTIFY_SCOPE: string;
  RESPONSE_TYPE: string;
  REDIRECT_URI: string;
}

const config: IConfig = {
  API_URL: process.env.REACT_APP_API_KEY,
  SPOTIFY_AUTH_URL: 'https://accounts.spotify.com/authorize',
  SPOTIFY_BASE_URL: 'https://api.spotify.com/v1',
  SPOTIFY_SCOPE: 'playlist-modify-private',
  RESPONSE_TYPE: 'token',
  REDIRECT_URI: getHost(),
};

export default config;
