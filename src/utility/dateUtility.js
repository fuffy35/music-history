/* --------------------------------------------------------------------------------------------------------- */

// i'm sure there's a better way to do this, or a library or something.

/* --------------------------------------------------------------------------------------------------------- */
	// date -> string.
/* --------------------------------------------------------------------------------------------------------- */
function formatDate(date) { /* yyyy-mm-dd */
	// fuffy35: and then what is e.g., september 16, 2021? 'formatDateHuman'? lol. idk.
	// fuffy35: formatDateNumeric, formatDateText... and default to numeric (for plain formatDate())?

	let month = date.getMonth() + 1;
	month = month < 10 ? `0${month}` : month;

	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

	return `${date.getFullYear()}-${month}-${day}`;
}

function formatTime(date, is24Hour = false) {
	let amPm = '';
	let hour = date.getHours();
	if (is24Hour) {
		hour = `${hour < 10 ? '0' : ''}${hour}`;
	}
	else {
		amPm = ` ${(hour <= 11 ? 'am' : 'pm')}`;
		hour = hour % 12;
		if (hour === 0) { hour = 12; }
		hour = `${hour < 10 ? '0' : ''}${hour}`;
	}

	const minute = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
	const second = `${date.getSeconds() < 10 ? '0' : ''}${date.getSeconds()}`;

	return `${hour}:${minute}:${second}${amPm}`;
}

function formatDateTime(date, is24Hour = false) {
	const formattedDate = formatDate(date);
	const formattedTime = formatTime(date, is24Hour);
	return `${formattedDate} ${formattedTime}`;
}

const formatTime12Hour = date => formatTime(date, false);
const formatTime24Hour = date => formatTime(date, true);
const formatDateTime12Hour = date => formatDateTime(date, false);
const formatDateTime24Hour = date => formatDateTime(date, true);

/* --------------------------------------------------------------------------------------------------------- */
	// string -> date.
/* --------------------------------------------------------------------------------------------------------- */
function stringToDate(dateString) { /* yyyy-mm-dd */
	let year, month, day;
	[/* yyyy-mm-dd */, year, month, day] = dateString.match(/(\d{4})-(\d{2})-(\d{2})/);
	return new Date(year, month-1, day);
}

// https://mariusschulz.com/blog/deserializing-json-strings-as-javascript-date-objects
const dateTimeFormat = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}(\.\d*)?Z?$/;
function jsonDateTimeReviver(key, value) {
	if (typeof(value) === 'string' && dateTimeFormat.test(value))
		return new Date(value);
	return value;
}

/* --------------------------------------------------------------------------------------------------------- */
	// date manipulation.
/* --------------------------------------------------------------------------------------------------------- */
function todayAtMidnight() {
	return new Date(new Date().setHours(0,0,0,0));
}

/* --------------------------------------------------------------------------------------------------------- */

export default {
	formatDate,
	//formatTime,
	formatTime12Hour,
	formatTime24Hour,
	//formatDateTime,
	formatDateTime12Hour,
	formatDateTime24Hour,
	stringToDate,
	jsonDateTimeReviver,
	todayAtMidnight
};

/* --------------------------------------------------------------------------------------------------------- */
