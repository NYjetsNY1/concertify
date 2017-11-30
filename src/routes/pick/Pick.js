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
import s from './Pick.css';

class Pick extends React.Component {
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
                <h2>Select Tours</h2>
                <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
                  <input
                    id="usernameOrEmail"
                    type="checkbox"
                    value="TourA"
                    name="usernameOrEmail"
                  />{' '}
                  TourA <br />
                </label>
                <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
                  <input
                    id="usernameOrEmail"
                    type="checkbox"
                    value="TourA"
                    name="usernameOrEmail"
                  />{' '}
                  TourB <br />
                </label>
                <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
                  <input
                    id="usernameOrEmail"
                    type="checkbox"
                    value="TourA"
                    name="usernameOrEmail"
                  />{' '}
                  TourC <br />
                </label>
                <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
                  <input
                    id="usernameOrEmail"
                    type="checkbox"
                    value="TourA"
                    name="usernameOrEmail"
                  />{' '}
                  TourD <br />
                </label>
              </div>
            </form>
          </div>
          <div className={s.formTwo}>
            <form method="post">
              <div className={s.formGroup}>
                <h2>Select Dates</h2>
                <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
                  <input
                    id="usernameOrEmail"
                    type="checkbox"
                    value="TourA"
                    name="usernameOrEmail"
                  />{' '}
                  TourA <br />
                </label>
                <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
                  <input
                    id="usernameOrEmail"
                    type="checkbox"
                    value="TourA"
                    name="usernameOrEmail"
                  />{' '}
                  TourB <br />
                </label>
                <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
                  <input
                    id="usernameOrEmail"
                    type="checkbox"
                    value="TourA"
                    name="usernameOrEmail"
                  />{' '}
                  TourC <br />
                </label>
                <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
                  <input
                    id="usernameOrEmail"
                    type="checkbox"
                    value="TourA"
                    name="usernameOrEmail"
                  />{' '}
                  TourD <br />
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className={s.formRight}>
          <div className={s.formThree}>
            <form method="post">
              <div className={s.formGroup}>
                <h2>Select Shows</h2>
                <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
                  <input
                    id="usernameOrEmail"
                    type="checkbox"
                    value="TourA"
                    name="usernameOrEmail"
                  />{' '}
                  TourA <br />
                </label>
                <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
                  <input
                    id="usernameOrEmail"
                    type="checkbox"
                    value="TourA"
                    name="usernameOrEmail"
                  />{' '}
                  TourB <br />
                </label>
                <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
                  <input
                    id="usernameOrEmail"
                    type="checkbox"
                    value="TourA"
                    name="usernameOrEmail"
                  />{' '}
                  TourC <br />
                </label>
                <label htmlFor="usernameOrEmail" className={s.tour_checkbox}>
                  <input
                    id="usernameOrEmail"
                    type="checkbox"
                    value="TourA"
                    name="usernameOrEmail"
                  />{' '}
                  TourD <br />
                </label>
              </div>
            </form>
          </div>
          <div className={s.formThree}>
            <button className={s.button} type="submit">
              <a href="show">Get Playlist</a>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Pick);
