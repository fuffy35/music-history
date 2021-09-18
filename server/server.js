/* --------------------------------------------------------------------------------------------------------- */

// yoink: fullstack-vue-book-v3-r13-basic-code\vuex\shopping_cart\server.js

/* --------------------------------------------------------------------------------------------------------- */

/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const SONGS_DATAFILE = path.join(__dirname, 'songs.json');
const PLAYLISTS_DATAFILE = path.join(__dirname, 'playlists.json');
const DATES_DATAFILE = path.join(__dirname, 'dates.json');

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	next();
});

/* --------------------------------------------------------------------------------------------------------- */

app.get('/songs', (req, res) => {
	fs.readFile(SONGS_DATAFILE, (err, data) => {
		res.setHeader('Cache-Control', 'no-cache');
		res.json(JSON.parse(data));
	});
});

app.get('/playlists', (req, res) => {
	fs.readFile(PLAYLISTS_DATAFILE, (err, data) => {
		res.setHeader('Cache-Control', 'no-cache');
		res.json(JSON.parse(data));
	});
});

app.get('/dates', (req, res) => {
	fs.readFile(DATES_DATAFILE, (err, data) => {
		res.setHeader('Cache-Control', 'no-cache');
		res.json(JSON.parse(data));
	});
});

/* --------------------------------------------------------------------------------------------------------- */

app.listen(app.get('port'), () => {
	console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
