/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFound.css';

// from https://www.quirksmode.org/js/cookies.html
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

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  componentDidMount() {
    let artist = 'walk the moon  '.trim();
    let artistName = artist.replace(/ /g, '+');
    let initTracks = ['jenny', 'headphones', 'shut up and dance', 'so cool'];
    let completeQueryCount = 0;
    let unavailableTracks = [];
    let availableTracks = [];
    let accessToken = readCookie('access_token');

    initTracks.forEach(trackName => {
      trackName = trackName.trim();
      let trackQuery = trackName.replace(/ /g, '+');
      fetch(
        `https://api.spotify.com/v1/search?q=artist:${artistName}%20track:${trackQuery}&type=track`,
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
          const tracks = data.tracks;
          if (tracks.items.length === 0) {
            // song is not on spotify
            unavailableTracks.push({
              artist: artist,
              track: trackName
            });
          } else {
            // song is there
            availableTracks.push({
              artist: data.tracks.items[0].artists[0].name,
              track: data.tracks.items[0].name,
              spotifyUri: data.tracks.items[0].uri,
            });
          }
          console.log(data);
          if(completeQueryCount === initTracks.length){
            console.log(availableTracks);
            console.log(unavailableTracks);
          }
        });
      });
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p>Sorry, the page you were trying to view does not exist.</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(NotFound);
