// utils/GoogleCalendarUtils.js
// This file handles auth + creating calendar events using Google API

let gapiLoaded = false;

export const loadGapi = () => {
  return new Promise((resolve) => {
    if (gapiLoaded) return resolve();

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client:auth2', async () => {
        await window.gapi.client.init({
          apiKey: 'YOUR_API_KEY',
          clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: "https://www.googleapis.com/auth/calendar.events"
        });
        gapiLoaded = true;
        resolve();
      });
    };
    document.body.appendChild(script);
  });
};

export const signInWithGoogle = async () => {
  await loadGapi();
  return window.gapi.auth2.getAuthInstance().signIn();
};

export const addEventToCalendar = async (taskTitle, startTime) => {
  await loadGapi();
  const event = {
    summary: taskTitle,
    start: { dateTime: startTime.toISOString(), timeZone: 'America/Chicago' },
    end: { dateTime: new Date(startTime.getTime() + 30 * 60000).toISOString(), timeZone: 'America/Chicago' }
  };
  return window.gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: event
  });
};
