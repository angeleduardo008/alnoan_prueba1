const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const producto = require('../routes/producto');
const categoria = require('../routes/categoria');

app.use(express.json());
app.use('/producto', producto);
app.use('/categoria', categoria);

module.exports = app;
