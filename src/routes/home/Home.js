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
import s from './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.saveArtistName = this.saveArtistName.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPressed);
  }

  saveArtistName() {
    const artistName = document.getElementById('artistName').value;
    console.log(artistName);
    document.cookie = `artistName = ${artistName}`;
  }

  onKeyPressed(e) {
    console.log(e.code);
    if (e.code == 'Enter') {
      this.saveArtistName();
      window.history = '/pick';
    }
  }

  render() {
    return (
      <div className={s.banner}>
        <div className={s.container}>
          <h1 className={s.bannerTitle}>Welcome To Concertify</h1>
        </div>
        <hr />

        <form method="post">
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="artistName">
              <input
                className={s.input}
                id="artistName"
                type="text"
                name="artistName"
                placeholder="ArtistName"
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              />
            </label>
          </div>
        </form>
        <div className={s.formGroup}>
          <a href="/pick">
            <button className={s.button} onClick={this.saveArtistName}>
              Get Playlist
            </button>
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
