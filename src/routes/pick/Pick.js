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
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
    width: '100%',
    color: 'white',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

const Venue = ({ key, venue, onClick }) => (
  <div>
    <FlatButton
      id={venue}
      onClick={onClick}
      label={venue}
      labelPosition="before"
      style={styles.uploadButton}
      containerElement="label"
    />
  </div>
);

const Tour = ({ key, tour, onClick }) => (
  <div>
    <FlatButton
      id={tour}
      onClick={onClick}
      label={tour}
      labelPosition="before"
      style={styles.uploadButton}
      containerElement="label"
    />
  </div>
);

class Pick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      setListObject: {},
      tours: [],
      venues: [],
      controlledStartDate: null,
      controlledEndDate: null,
      selectedTours: [],
      selectedVenues: [],
    };
    this.getVenues = this.getVenues.bind(this);
    this.getSongSelection = this.getSongSelection.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.onVenueClick = this.onVenueClick.bind(this);
    this.onTourClick = this.onTourClick.bind(this);
    this.filterIncludesSetList = this.filterIncludesSetList.bind(this);
  }

  // if we want to make our own proxy
  // git clone https://github.com/Rob--W/cors-anywhere.git
  // cd cors-anywhere/
  // npm install
  // heroku create
  // git push heroku master
  componentDidMount() {
    const artistName = this.readCookie('artistName').replace(/ /g, '%20');
    const artistActualName = this.readCookie('artistName');
    this.setState({ artistName: artistActualName });
    let MBID = '';
    let makeRequest = false;

    const getArtist = {
      url: `https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/search/artists?artistName=${
        artistName
      }&p=1&sort=relevance`,
      headers: {
        'x-api-key': '80231ae9-f9b4-40e0-8865-70baee8fe533',
        Accept: 'application/json',
        origin: `https://api.setlist.fm/rest/1.0/search/artists?artistName=${
          artistName
        }&p=1&sort=relevance`,
      },
    };

    const callbackArtist = (error, response, body) => {
      if (!error && response.statusCode === 200) {
        body = JSON.parse(body);
        for (let i = 0; i < body.artist.length; i++) {
          if (body.artist[i].name.toLowerCase() ===
              artistActualName.trim().toLowerCase() &&
            body.artist[i].tmid !== undefined
          ) {
            MBID = body.artist[i].mbid;
            makeRequest = true;
          }
        }
        if (MBID === '') {
          for (let i = 0; i < body.artist.length; i++) {
            if (body.artist[i].name.toLowerCase() ===
                artistActualName.trim().toLowerCase()
            ) {
              MBID = body.artist[i].mbid;
              makeRequest = true;
            }
          }
        }
        const getSetlist = {
          url: `https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/artist/${
            MBID
          }/setlists?p=1`,
          headers: {
            'x-api-key': '80231ae9-f9b4-40e0-8865-70baee8fe533',
            Accept: 'application/json',
            origin: `https://api.setlist.fm/rest/1.0/artist/${
              MBID
            }/setlists?p=1`,
          },
        };

        if (makeRequest) {
          request(getSetlist, callbackSetlist);
        }
      }
    };

    let callbackSetlist = (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const artistConcertInfo = JSON.parse(body);
        const venues = this.getVenues(artistConcertInfo.setlist);
        const tours = this.getTours(artistConcertInfo.setlist);
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
    const venues = new Set();
    setlist.forEach(concert => {
      if (concert.venue.name != undefined && concert.eventDate != undefined) {
        const tmpDate = concert.eventDate.split('-');
        const eventDate = [tmpDate[1], tmpDate[0], tmpDate[2]].join('-');
        venues.add(`${concert.venue.name} (${eventDate})`);
      }
    });
    return [...venues];
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

  onVenueClick(ev) {
    const venueName = ev.target.innerText;
    if (!this.state.selectedVenues.includes(venueName.toLowerCase().substr(0, venueName.indexOf("(")-1))) {
      ev.target.parentElement.style.backgroundImage = `linear-gradient(#27f274, #27f274)`;
      let newSelectedVenues = [venueName.toLowerCase().substr(0,venueName.indexOf('(') - 1)].concat(
        this.state.selectedVenues,
      );
      this.setState({ selectedVenues: newSelectedVenues });
    } else {
      ev.target.parentElement.style.backgroundImage = `none`;
      ev.target.style.backgroundImage = `none`;
      const newSelectedVenues = this.state.selectedVenues;
      const deslectItem = newSelectedVenues.indexOf(venueName);
      newSelectedVenues.splice(deslectItem, 1);
      this.setState({ selectedVenues: newSelectedVenues });
    }
  }

  onTourClick(ev) {
    const tourName = ev.target.innerText;
    if (!this.state.selectedTours.includes(tourName.toLowerCase())) {
      ev.target.parentElement.style.backgroundImage = `linear-gradient(#27f274, #27f274)`;
      const newSelectedTours = [tourName.toLowerCase()].concat(
        this.state.selectedTours,
      );
      this.setState({ selectedTours: newSelectedTours });
    } else {
      ev.target.parentElement.style.backgroundImage = `none`;
      ev.target.style.backgroundImage = `none`;
      const newSelectedTours = this.state.selectedTours;
      const deslectItem = newSelectedTours.indexOf(tourName);
      newSelectedTours.splice(deslectItem, 1);
      this.setState({ selectedTours: newSelectedTours });
    }
  }

  getSongSelection() {
    const my_setlist = this.state.setListObject.setlist;
    let my_songs = [];
    my_setlist.forEach(setlist => {
      if (this.filterIncludesSetList(setlist.tour, setlist.venue)) {
        if (setlist.sets.set.length != 0) {
          my_songs = my_songs.concat(setlist.sets.set[0].song);
        }
        if (setlist.sets.set.length > 1) {
          my_songs = my_songs.concat(setlist.sets.set[1].song);
        }
      }
    });
    let song_de_duper = new Set(my_songs);
    song_de_duper = Array.from(song_de_duper);
    sessionStorage.removeItem('selectedSongs');
    sessionStorage.setItem('selectedSongs', JSON.stringify(song_de_duper));
  }

  filterIncludesSetList(tour, venue) {
    return (
      (tour != undefined &&
        this.state.selectedTours.includes(tour.name.toLowerCase())) ||
      (venue != undefined &&
        this.state.selectedVenues.includes(venue.name.toLowerCase()))
    );
  }

  handleStartChange = (event, date) => {
    this.setState({ controlledStartDate: date });
  };

  handleEndChange = (event, date) => {
    this.setState({ controlledEndDate: date });
  };

  render() {
    const venueInputs = this.state.venues.map((venue, index) => (
      <Venue key={index} venue={venue} onClick={this.onVenueClick} />
    ));
    const tourInputs = this.state.tours.map((tour, index) => (
      <Tour key={index} tour={tour} onClick={this.onTourClick} />
    ));
    return (
      <div className={s.banner}>
        <MuiThemeProvider>
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
                <div className={s.selectContainer}>
                  <div className={s.intraDateDiv} />
                  <MuiThemeProvider>
                    <DatePicker
                      hintText="Start"
                      value={this.state.controlledStartDate}
                      onChange={this.handleStartChange}
                    />
                  </MuiThemeProvider>
                  <div className={s.intraDateDiv} />
                  <MuiThemeProvider>
                    <DatePicker
                      hintText="End"
                      value={this.state.controlledEndDate}
                      onChange={this.handleEndChange}
                    />
                  </MuiThemeProvider>
                </div>
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
                Show Playlist Songs
              </button>
            </a>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(s)(Pick);
