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
import s from './Login.css';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <a href="/about">
        <div className={s.container}>
          <div className={s.formGroup}>
            <h1>ABOUT US</h1>
          </div>
        </div>
      </a>

        <a href="/auth"><div className={s.cont2}>
          <div className={s.formGroup}>
            <h1>Connect And Build</h1>
          </div>
        </div>
      </a>

      </div>
    );
  }
}

export default withStyles(s)(Login);
