/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Show.css';

const Song = ({ song }) => <p> {song} </p>;

function readCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      artist: '',
      spotifyTracks: [],
      spotifyURIs: [],
    };
    this.getSongUri = this.getSongUri.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    let data = sessionStorage.getItem('selectedSongs');
    data = JSON.parse(data);
    let songs = [];
    if (data != null) {
      songs = data.map(d => d.name);
      songs = new Set(songs);
      songs = Array.from(songs).sort();
    }
    this.setState({
      artist: readCookie('artistName'),
      songs,
    });
    this.getSongUri();
  }

  // artist is string 'artist'
  // songs is array of song names
  getSongUri() {
    let data = sessionStorage.getItem('selectedSongs');
    data = JSON.parse(data);
    let songs = [];
    if (data != null) {
      songs = data.map(d => d.name);
      songs = new Set(songs);
      songs = Array.from(songs);
    }
    let tracks = songs;
    console.log(tracks);
    tracks = Array.from(tracks);
    console.log(tracks);
    let artist = readCookie('artistName');
    artist = artist.trim();
    let artistQuery = fixedEncodeURIComponent(artist).replace(/%20/g, '+');
    let completeQueryCount = 0;
    const unavailableTracks = [];
    const availableTracks = [];
    const accessToken = readCookie('access_token');
    tracks.forEach(trackName => {
      trackName = trackName.trim();
      let trackQuery = trackName
        .replace(/\//g, ' ')
        .replace(/\\/g, ' ');
      trackQuery = fixedEncodeURIComponent(trackQuery).replace(/%20/g, '+');
      fetch(
        `https://api.spotify.com/v1/search?q=artist:${artistQuery}%20track:${trackQuery}&type=track`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ).then(response => {
        response.json().then(data => {
          completeQueryCount++;
          const res_tracks = data.tracks;
          if (res_tracks.items.length === 0) {
            // song is not on spotify
            unavailableTracks.push({
              artist,
              track: trackName,
            });
          } else {
            // song is there
            artist = data.tracks.items[0].artists[0].name;
            availableTracks.push({
              artist: data.tracks.items[0].artists[0].name,
              track: data.tracks.items[0].name,
              spotifyUri: data.tracks.items[0].uri,
            });
          }
          if (completeQueryCount === tracks.length) {
            // after all calls have been done
            const availableTrackURIs = availableTracks.map(
              track => track.spotifyUri,
            );
            const availableTrackNames = availableTracks.map(
              track => track.track,
            );
            this.setState({
              artist,
              spotifyTracks: availableTrackNames.sort(),
              spotifyURIs: availableTrackURIs,
            });
            const sendingTracks = JSON.stringify({ availableTracks });
            return availableTracks;
          }
        });
      });
    });
  }

  submit() {
    this.openModal()
    const headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    const spotifyURIs = this.state.spotifyURIs;
    const myInit = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        artist: this.state.artist,
        spotifyURIs,
      }),
    };

    fetch('v1/setsToSpotify', myInit).then(response => {
      response.json().then(data => {
        console.log(`https://open.spotify.com/user/${data.uID}/playlist/${data.playlist_id}`);
        location.href = `https://open.spotify.com/user/${data.uID}/playlist/${data.playlist_id}`
      });
    });
    console.log(this.state.spotifyURIs);
  }

  openModal(){
    let modal = document.getElementById('myModal');
    modal.style.display = "block";
  }

closeModal(){
  let modal = document.getElementById('myModal');
  modal.style.display = "none";
  modal = document.getElementById('gameCompleteModal');
  modal.style.display = "none";
}

  render() {
    const songInputs = this.state.songs.map((song, index) => (
      <Song key={index} song={song} />
    ));

    const spotifyInputs = this.state.spotifyTracks.map((song, index) => (
      <Song key={index} song={song} />
    ));
    return (
      <div className={s.banner}>
        <div id="myModal" className={s.modal}>
              <div className={s.modalcontent}>
                <span onClick={this.closeModal} className={s.close}>&times;</span>
                <h2>Success!</h2>
                <h3>You will be redirected to your new Spotify Playlist shortly </h3>
              </div>
            </div>
        <div className={s.container}>
          <h1 className={s.bannerTitle}>Artist: {this.state.artist}</h1>
        </div>
        <div className={s.formLeft}>
          <div className={s.formOne}>
            <form method="post">
              <div className={s.formGroup}>
                <h2>All Songs Found:</h2>
                <div className={s.songContainer}>{songInputs}</div>
              </div>
            </form>
          </div>
        </div>
        <div className={s.formLeft}>
          <div className={s.formOne}>
            <form method="post">
              <div className={s.formGroup}>
                <h2>Songs On Spotify</h2>
                <div className={s.songContainer}>{spotifyInputs}</div>
              </div>
            </form>
          </div>
        </div>
        <div>
          <button className={s.button} onClick={this.submit}>
            Create Spotify Playlist
          </button>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Show);
