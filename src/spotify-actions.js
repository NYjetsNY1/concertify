import rp from 'request-promise';

let SpotifyActions = {
    createNewPlaylist,
    addSongsToPlaylist
};

function createNewPlaylist(tracks, user, res) {
  const url = `https://api.spotify.com/v1/users/${user.id}/playlists`;
  const cors_url = `https://cors-anywhere.herokuapp.com/${url}`;
  const bearer_token = `Bearer ${user.access_token}`;
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
      name: 'Concertify Playlist',
      public: false,
    },
    resolveWithFullResponse: true
  };
  function callback(error, response, body) {
    if ((!error && response.statusCode == 200) || response.statusCode == 201) {
      console.log('Playlist creation successful! Adding tracks...');
      SpotifyActions.addSongsToPlaylist(options, response.body.id, tracks, user, res);
    }
  }
  return rp(options, callback);
};

function addSongsToPlaylist(options, playlist_id, tracks, user, res) {
  const url = `https://api.spotify.com/v1/users/${user.id}/playlists/${playlist_id}/tracks`;
  options.url = `https://cors-anywhere.herokuapp.com/${url}`;
  options.headers.origin = url;
  options.json = {
    uris: tracks,
  };
  function callback(error, response, body) {
    if ((!error && response.statusCode == 200) || response.statusCode == 201) {
      console.log('The given tracks were successfully added to the playlist!');
      res.status(200).send({
        body: 'Playlist Successfully Created',
        playlist_id,
      });
    } else {
      console.log('An error occurred when adding the tracks.');
    }
  }
  return rp(options, callback);
};

export default SpotifyActions;
