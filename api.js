import moment from 'moment';
import Constants from 'expo-constants';

const { manifest } = Constants;
// const api = (manifest.packagerOpts || {}).dev
//   ? manifest.debuggerHost.split(':').shift().concat(':3000')
//   : 'production url';
const api = '5053407f.ngrok.io'

const url = `http://${api}/events`;

export function getEvents() {
  return fetch(url)
    .then(response => response.json())
    .then(events => events.map(e => ({ ...e, date: new Date(e.date)})))
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
