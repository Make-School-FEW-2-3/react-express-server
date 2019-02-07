const express = require('express');
const bodyParser = require('body-parser');

const { random, randomD, randomRolls } = require('./utils');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ** Proxy from React can't get at '/' for some reason?
// Apparently this is expected behavior... **
// Test this route with: localhost:4000/
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// A simple route that returns a JSON object
// Test this route with:
app.get('/about', (req, res) => {
  // This Object is converted to JSON and returned.
  res.json({ about: 'this service generates a random numbers.' });
});

// Random number route
// Test this route with: http://localhost:4000/random/n
// Passing a number n in the url
// Where the random number returned is 0 - (n - 1)
app.get('/random/:n', (req, res) => {
  const { n } = req.params;
  const value = Math.round(random(n));
  res.json({ value });
});

// Random die roll route
// Test this route with: http://localhost:4000/random/die/n
// Passing a number n in the url
// Where the random number returned is 1-n
app.get('/random/die/:n', (req, res) => {
  const { n } = req.params;
  const value = Math.floor(randomD(n));
  res.json({ value });
});

// Random die rolls route
// Test this route with: http://localhost:4000/random/dice/t/n
// Passing numbers n, t in the url
// Where the random number returned is 1-n and t results are returned
app.get('/random/dice/:t/:n', (req, res) => {
  const { n, t } = req.params;

  let values = randomRolls(t, n);

  values = values.map(num => Math.floor(num));
  res.json({ values });
});

const port = 4000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
