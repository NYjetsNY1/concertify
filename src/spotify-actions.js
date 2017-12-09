import rp from 'request-promise';

const SpotifyActions = {
  createNewPlaylist,
  addSongsToPlaylist,
};

function createNewPlaylist(artist, tracks, user, res) {
  const url = `https://api.spotify.com/v1/users/${user.id}/playlists`;
  const cors_url = `https://cors-anywhere.herokuapp.com/${url}`;
  const bearer_token = `Bearer ${user.access_token}`;
  const playlistName = `Concertify ${artist} Playlist`;
  const options = {
    url: cors_url,
    headers: {
      Authorization: bearer_token,
      Accept: 'application/json',
      origin: url,
    },
    method: 'POST',
    json: {
      description: 'Created with Concertify!',
      name: playlistName,
      public: false,
    },
    resolveWithFullResponse: true
  };
  function callback(error, response, body) {
    if ((!error && response.statusCode == 200) || response.statusCode == 201) {
      return SpotifyActions.addSongsToPlaylist(options, response.body.id,
        tracks, user, res);
    }
  }
  return rp(options, callback);
}

function addSongsToPlaylist(options, playlist_id, tracks, user, res) {
  const url = `https://api.spotify.com/v1/users/${user.id}/playlists/${playlist_id}/tracks`;
  options.url = `https://cors-anywhere.herokuapp.com/${url}`;
  options.headers.origin = url;
  options.json = {
    uris: tracks,
  };
  function callback(error, response, body) {
    if ((!error && response.statusCode == 200) || response.statusCode == 201) {
      console.log('The playlist was created.');
      console.log(user.id);
      res.status(200).send({
        body: 'Playlist Successfully Created',
        playlist_id: playlist_id,
        uID: user.id,
      });
    } else {
      console.log('An error occurred when creating the playlist.');
    }
  }
  return rp(options, callback);
}

export default SpotifyActions;
