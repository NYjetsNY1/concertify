/**
  We need to manually specify credentials as we don't actually start our server.
    -> This can be done by manually retrieving a Spotify access token from
       the web API console.
  These tests assume successful calls to the Spotify API work as intended.
**/

import SpotifyActions from './spotify-actions';

const user = {
  access_token: '',
  id: ''
};

const tracks = ['spotify:track:0lLdorYw7lVrJydTINhWdI'];

const res = {
  send: function() {},
  status: function(responseStatus) { return this; }
};

describe('Unit Tests', () => {
  test('addSongsToPlaylist() called on success of createNewPlaylist()', () => {
    SpotifyActions.addSongsToPlaylist =
      jest.spyOn(SpotifyActions, 'addSongsToPlaylist');
    return SpotifyActions.createNewPlaylist(tracks, user, res).then((response) => {
      expect(SpotifyActions.addSongsToPlaylist).toBeCalled();
    });
  });
});

describe('Integration Tests', () => {
  test('Both Spotify API calls are successfully executed', ()  => {
    return SpotifyActions.createNewPlaylist(tracks, user, res).then((response) => {
      expect(response.statusCode).toBe(201);
      expect(SpotifyActions.addSongsToPlaylist).toBeCalledWith(
        expect.anything(), response.body.id, tracks, user, res);
    });
  });
});
