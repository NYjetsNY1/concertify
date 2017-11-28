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
import s from './Contact.css';
// import $ from 'jquery';

class Contact extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  // if we want to make our own proxy
  // git clone https://github.com/Rob--W/cors-anywhere.git
  // cd cors-anywhere/
  // npm install
  // heroku create
  // git push heroku master
  componentDidMount() {

    let artistName = "Big%20Sean";

    const getArtist = {
      url:
        'https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/search/artists?artistName=' + artistName + '&p=1&sort=sortName',
      headers: {
        'x-api-key': '80231ae9-f9b4-40e0-8865-70baee8fe533',
        Accept: 'application/json',
        origin: 'https://api.setlist.fm/rest/1.0/search/artists?artistName=' + artistName + '&p=1&sort=sortName'
      },
    };

    const getSetlist = {
      url:
        'https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/artist/07e748f1-075e-428d-85dc-ce3be434e906/setlists?p=1',
      headers: {
        'x-api-key': '80231ae9-f9b4-40e0-8865-70baee8fe533',
        Accept: 'application/json',
        origin: 'https://api.setlist.fm/rest/1.0/artist/07e748f1-075e-428d-85dc-ce3be434e906/setlists?p=1'
      },
    };
    

    function callbackArtist(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(response);
        console.log(body);
      }
    }

    function callbackSetlist(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(response);
        console.log(body);
      }
    }

    request(getArtist, callback);
    request(getSetList, callback);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Contact);
