const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./connect.js');
const router = require('./routes');
const { auth } = require('express-openid-connect');

const port = process.env.PORT || 3000;
const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'gobpiUf7Lh3fZ5U8DZ6UiiI13pP5W7EU',
  issuerBaseURL: 'https://dev-5r5raews4dzcwvlk.us.auth0.com'
};

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  app.use(auth(config));
  
  app.get('/logintest', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });
  
  // This is the route for Authentication. 
  app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });
  
app.use('/', router);
mongodb.initDB((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});