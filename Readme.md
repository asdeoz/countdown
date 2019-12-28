# React Native Countdown App

To run and debug this React Native app, Expo is used. This means that you'll need the expo app
on your phone to be able to run it there. Otherwise, the app can be run in the emulators that
will be provided when the application starts. Expo is automatically installed when you installed
react native with `npm i -g react-native`

## json-server

To be able to use the app, a json-server needs to be running.
This means that json-server needs to be globally installed with `npm i -g json-server`
When that is done, you'll start it with `json-server ./db.json` at the root of the project.
This will start json-server on http://localhost:3000.

## ngrok

The local json-server needs to be tunneled with ngrok so the expo server can actually reach it.
For this, go to https://dashboard.ngrok.com/get-started and create an account if you don't have
one, download the executable and follow the setup and installation steps.
When all is setup, go to the folder where you have the ngrok executable and start it with `./ngrok http 3000`.
__This will return a url which will be pasted in the api.js file.__

## Start the app

`npm start` will start the app. When the server starts, a website will open in the browser
with a QR code; scan this QR code to start it in the Expo app. This should load all the javascript
on your mobile device and start the react native app.
