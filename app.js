const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
const app = express();
const images = require('./routes/images');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(`/images`, images);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

module.exports = app;