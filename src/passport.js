/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import { User, UserLogin, UserClaim, UserProfile } from './data/models';
import config from './config';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SpotifyStrategy({
    clientID: '156a24f131d74c249f907442c2c2a446',
    clientSecret: '395bdb29ec30461aa90dd8003b710eac',
    callbackURL: '/auth/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, {
      access_token: accessToken,
      refresh_token: refreshToken,
      id: profile.id
    });
  }
));

export default passport;
