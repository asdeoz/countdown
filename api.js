import moment from 'moment';
import Constants from 'expo-constants';
import uuid from 'uuid-js';

const { manifest } = Constants;
// const api = (manifest.packagerOpts || {}).dev
//   ? manifest.debuggerHost.split(':').shift().concat(':3000')
//   : 'production url';
const api = '89edfb9f.ngrok.io'; // URL to be copied from the ngrok result

const url = `http://${api}/events`;

export function getEvents() {
  return fetch(url)
    .then(response => response.json())
    .then(events => events.map(e => ({ ...e, date: new Date(e.date)})))
}

export function saveEvent({ title, date }) {
  const payload = JSON.stringify({
    title,
    date,
    id: uuid(),
  });
  console.log(payload);
  return fetch(url, {
    method: 'POST',
    body: payload,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
  .then(res => res.json())
  .catch(error => error);
}

export function formatDate(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) return dateString;

  return parsed.format('D MMM YYYY');
}

export function formatDateTime(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) return dateString;

  return parsed.format('D MMM YYYY h:mm a');
}

export function getCountdownParts(eventDate) {
  const duration = moment.duration(moment(new Date(eventDate)).diff(new Date()));
  return {
    days: parseInt(duration.as('days')),
    hours: duration.get('hours'),
    minutes: duration.get('minutes'),
    seconds: duration.get('seconds'),
  };
}
