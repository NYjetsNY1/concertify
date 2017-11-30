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

class Show extends React.Component {
  render() {
    return (
      <div className={s.banner}>
        <div className={s.container}>
          <h1 className={s.bannerTitle}>Artist: Lorde</h1>
        </div>
        <div className={s.formLeft}>
          <div className={s.formOne}>
            <form method="post">
              <div className={s.formGroup}>
                <h2>All Songs Found:</h2>
                <div className={s.songContainer}>
                  <p>Song 1</p>
                  <p>Song 2</p>
                  <p>Song 3</p>
                  <p>Song 4</p>
                  <p>Song 5</p>
                  <p>Song 6</p>
                  <p>Song 7</p>
                  <p>Song 8</p>
                  <p>Song 9</p>
                  <p>Song 10</p>
                  <p>Song 11</p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={s.formLeft}>
          <div className={s.formOne}>
            <form method="post">
              <div className={s.formGroup}>
                <h2>Songs On Spotify</h2>
                <div className={s.songContainer}>
                  <p>Song 1</p>
                  <p>Song 2</p>
                  <p>Song 5</p>
                  <p>Song 6</p>
                  <p>Song 8</p>
                  <p>Song 9</p>
                  <p>Song 11</p>
                  <p>Song 11</p>
                  <p>Song 11</p>
                  <p>Song 11</p>
                  <p>Song 11</p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={s.submitBtn}>
          <button className={s.button} type="submit">
            <a href="/auth">Create Spotify Playlist</a>
          </button>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Show);
