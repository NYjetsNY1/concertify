import rp from 'request-promise';
import request from 'request';

const SetListActions = {
  fullSetlistTest
};

function fullSetlistTest() {
  const artistName = "Drake";
  const artistActualName = "Drake";
  let MBID = '';
  let makeRequest = false;

  const getArtist = {
    url: `https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/search/artists?artistName=${artistName}&p=1&sort=relevance`,
    headers: {
      'x-api-key': '80231ae9-f9b4-40e0-8865-70baee8fe533',
      Accept: 'application/json',
      origin: `https://api.setlist.fm/rest/1.0/search/artists?artistName=${artistName}&p=1&sort=relevance`,
    },
  };

  const callbackArtist = (error, response, body) => {
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body);
      for (let i = 0; i < body.artist.length; i++) {
        if (
          body.artist[i].name.toLowerCase() ===
            artistActualName.trim().toLowerCase() &&
          body.artist[i].tmid !== undefined
        ) {
          MBID = body.artist[i].mbid;
          makeRequest = true;
        }
      }
      if (MBID === '') {
        for (let i = 0; i < body.artist.length; i++) {
          if (
            body.artist[i].name.toLowerCase() ===
            artistActualName.trim().toLowerCase()
          ) {
            MBID = body.artist[i].mbid;
            makeRequest = true;
          }
        }
      }
      const getSetlist = {
        url: `https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/artist/${MBID}/setlists?p=1`,
        headers: {
          'x-api-key': '80231ae9-f9b4-40e0-8865-70baee8fe533',
          Accept: 'application/json',
          origin: `https://api.setlist.fm/rest/1.0/artist/${MBID}/setlists?p=1`,
        },
      };

      if (makeRequest) {
        return "Drake";
      }
    }
  };
  return rp(getArtist, callbackArtist);
}

export default SetListActions;