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
    expect.assertions(2);
    SpotifyActions.addSongsToPlaylist = jest.spyOn(SpotifyActions,
      'addSongsToPlaylist');
    const response = await SpotifyActions.createNewPlaylist(
      'Michael Buble', tracks, user, res);
    expect(response.statusCode).toBe(201);
    expect(SpotifyActions.addSongsToPlaylist).toBeCalled();
  });
});

describe('Integration Tests', () => {
  test('Both Spotify API calls are successfully executed', async () => {
    expect.assertions(3);
    global.console = { log: jest.fn() };
    const response = await SpotifyActions.createNewPlaylist(
      'Michael Buble', tracks, user, res);
    expect(response.statusCode).toBe(201);
    expect(SpotifyActions.addSongsToPlaylist).toBeCalledWith(
      expect.anything(), response.body.id, tracks, user, res);
    expect(console.log).toBeCalledWith('The playlist was created.');
  });
});
