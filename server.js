const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const shortid = require('shortid');
const fs = require('fs');

app.use(express.static('lib'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Tinyify';

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file);
  });
});

app.get('/urls', (request, response) => {
  database.select().table('urls')
          .then(function(urls) {
            console.log("Urls: ", urls)
            response.status(200).json(urls);
          })
          .catch(function(error) {
            console.error('somethings wrong with db')
          });
});

app.post('/urls', (request, response) => {
  const { longUrl } = request.body;
  const id = shortid.generate();
  const link = { id, long_url: longUrl, clicks: 0, created_at: Date.now() };
  database('urls').insert(link)
          .then(() => {})
          .select().table('urls')
          .then(function(urls) {
            response.status(200).json(urls);
          })
          .catch(function(error) {
            console.error('somethings wrong with db')
          });
});

app.get('/:id', (request, response) => {
  database.select().table('urls')
          .then(function(urls) {
            console.log("Urls: ", urls)
            response.status(200).json(urls);
          })
          .catch(function(error) {
            console.error('somethings wrong with db')
          });
});


if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} now listening on 3000`);
  });
}

module.exports = app;
