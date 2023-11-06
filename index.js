const express = require('express');
const app = express();

const cors = require('cors');
const nocache = require('nocache');

const Routes = require('./app/routers');

// disable client-side caching
app.use(nocache());
app.use('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(Routes);

app.listen(proccess.env.PORT || 2999);