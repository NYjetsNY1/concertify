CONCERTIFY
==========

## Deployed on Heroku!
https://cs4278-concertify.herokuapp.com  

Overview
========
Concertify is a mobile Web Application that enables users to build Spotify playlists based off of past concert setlists from various artists. With the help of concertify, users can attend a show, and then have the ability to see and listen to the songs that the artist played at the show. Concertify is simple, streamlined and intuitive, making it an excellent tool for avid concert geeks to enjoy past setlists from their favorite artists. 

Tools
=====
### Frontend

React-	Used for building and organizing view components and view management. Also used to keep basic state during the application

Material UI-  Used for specialized components including the Conceritify DatePicker and different concert buttons

Moment JS - Library for date formatting and date handling

Jest - Dom Testing

### Backend

Node- All server side logic, some routing, spotify authentication management, some user state

Express- Node framework for the server setup and pipeline 

Passport JS - Tool for third party OAuth. In our case, Passport was used with Spotify OAuth

Heroku- Site Deployment

### APIs

Setlist API- Used for getting artist setlists into the app

Spotify API- Used for OAuth and creating spotify playlists

### Database

No database needed 

## Automated testing
Specify Spotify access_token and user_id to use for testing in src/spotify-actions.test.js  
and then run `yarn test`.
