/**
  We need to manually specify credentials as we don't actually start our server.
    -> This can be done by manually retrieving a Spotify access token from
       the web API console.
  These tests assume successful calls to the Spotify API work as intended.
  TODO: mock API calls?
* */

import SpotifyActions from './spotify-actions';
import 'babel-polyfill';

const user = {
  access_token: '',
  id: '',
};

const tracks = ['spotify:track:0lLdorYw7lVrJydTINhWdI'];

const res = {
  send() {},
  status(responseStatus) {
    return this;
  },
};

describe('Unit Tests', () => {
  test('addSongsToPlaylist() called on success of createNewPlaylist()', async () => {
    SpotifyActions.addSongsToPlaylist = jest.spyOn(
      SpotifyActions,
      'addSongsToPlaylist',
    );
    await SpotifyActions.createNewPlaylist('Michael Buble', tracks, user, res);
    expect(SpotifyActions.addSongsToPlaylist).toBeCalled();
  });
});

describe('Integration Tests', () => {
  test('Both Spotify API calls are successfully executed', async () => {
    global.console = { log: jest.fn() };
    await SpotifyActions.createNewPlaylist('Michael Buble', tracks, user, res);
    expect(console.log).toBeCalledWith('The playlist was created.');
  });
});
