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
  render() {
    return (
      <div className={s.banner}>
        <div className={s.container}>
          <h1 className={s.bannerTitle}>Welcome To Concertify</h1>
        </div>
        <hr />

        <form method="post">
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="usernameOrEmail">
              <input
                className={s.input}
                id="usernameOrEmail"
                type="text"
                name="usernameOrEmail"
                placeholder="ArtistName"
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              />
            </label>
          </div>

          <div className={s.formGroup}>
            <button className={s.button} type="submit">
              <a href="pick">Get Playlist</a>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(Home);
