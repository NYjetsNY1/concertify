/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import request from 'request';
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Pick.css';
import { findDOMNode } from 'react-dom';
import moment from 'moment';

const Venue = ({ venue }) => (
  <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
    <input id={venue} type="checkbox" value={venue} name={venue} /> {venue}{' '}
    <br />
  </label>
);

const Tour = ({ tour }) => (
  <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
    <input
      id="usernameOrEmail"
      type="checkbox"
      value="TourA"
      name="usernameOrEmail"
    />{' '}
    {tour} <br />
  </label>
);

class Pick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      setListObject: {},
      tours: [],
      venues: [],
      startDate: moment(),
    };
    this.getVenues = this.getVenues.bind(this);
    this.getSongSelection = this.getSongSelection.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // if we want to make our own proxy
  // git clone https://github.com/Rob--W/cors-anywhere.git
  // cd cors-anywhere/
  // npm install
  // heroku create
  // git push heroku master
  componentDidMount() {
    const artistName = this.readCookie('artistName').replace(' ', '%20');
    const artistActualName = this.readCookie('artistName');
    this.setState({ artistName: artistActualName });
    let MBID = '';
    let makeRequest = false;

    const getArtist = {
      url: `https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/search/artists?artistName=${artistName}&p=1&sort=sortName`,
      headers: {
        'x-api-key': '80231ae9-f9b4-40e0-8865-70baee8fe533',
        Accept: 'application/json',
        origin: `https://api.setlist.fm/rest/1.0/search/artists?artistName=${artistName}&p=1&sort=sortName`,
      },
    };

    const callbackArtist = (error, response, body) => {
      if (!error && response.statusCode === 200) {
        body = JSON.parse(body);
        console.log(body.artist);
        for (let i = 0; i < body.artist.length; i++) {
          if (
            body.artist[i].name.toLowerCase() === artistActualName.trim().toLowerCase() &&
            body.artist[i].tmid != undefined
          ) {
            console.log('got artist!');
            MBID = body.artist[i].mbid;
            makeRequest = true;
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
          request(getSetlist, callbackSetlist);
        }
      }
    };

    let callbackSetlist = (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // console.log(response);
        const artistConcertInfo = JSON.parse(body);
        console.log(console.log(artistConcertInfo));
        console.log(artistConcertInfo.setlist[0].venue.name);

        const venues = this.getVenues(artistConcertInfo.setlist);
        const tours = this.getTours(artistConcertInfo.setlist);

        console.log(venues);
        console.log(tours);

        this.setState({
          setListObject: artistConcertInfo,
          tours,
          venues,
        });
      }
    };
    request(getArtist, callbackArtist);
  }

  readCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  getVenues(setlist) {
    return setlist.map(concert => concert.venue.name);
  }

  getTours(setlist) {
    const tours = new Set();
    setlist.forEach(concert => {
      if (
        concert.tour != undefined &&
        concert.tour.name != undefined &&
        !tours.has(concert.tour.name)
      ) {
        tours.add(concert.tour.name);
      }
    });
    return [...tours];
  }

  getSongSelection() {
    console.log(this.state.setListObject.setlist);
    const my_setlist = this.state.setListObject.setlist;
    let my_songs = [];
    my_setlist.forEach(setlist => {
      console.log(setlist.sets.set[0]);
      my_songs = my_songs.concat(setlist.sets.set[0].song);
      if (setlist.sets.set.length > 1) {
        my_songs = my_songs.concat(setlist.sets.set[1].song);
      }
    });
    console.log(my_songs);
    document.cookie = `selectedSongs = ${my_songs}`;
    sessionStorage.setItem('selectedSongs', JSON.stringify(my_songs));
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    const venueInputs = this.state.venues.map((venue, index) => (
      <Venue key={index} venue={venue} />
    ));
    const tourInputs = this.state.tours.map((tour, index) => (
      <Tour key={index} tour={tour} />
    ));
    return (
      <div className={s.banner}>
        <div className={s.container}>
          <h1 className={s.bannerTitle}>Artist: {this.state.artistName}</h1>
        </div>

          <div className={s.formOne}>
            <form method="post">
              <div className={s.formGroup}>
                <h2>Select Tours</h2>
                <div className={s.selectContainer}> {tourInputs} </div>
              </div>
            </form>
          </div>
          <div className={s.formTwo}>
            <form method="post">
              <div className={s.formGroup}>
                <h2>Select Dates</h2>
                <div className={s.selectContainer}> {tourInputs} </div>
              </div>
            </form>
          </div>
          <div className={s.formThree}>
            <form method="post">
              <div className={s.formGroup}>
                <h2>Select Venues</h2>
                <div className={s.selectContainer}>{venueInputs}</div>
              </div>
            </form>
          </div>
          <div className={s.submitButtonWrapper}>
            <a href="show">
              <button
                className={s.button}
                onClick={this.getSongSelection}
                type="submit"
              >
                Get Playlist
              </button>
            </a>
          </div>
      </div>
    );
  }
}

export default withStyles(s)(Pick);
