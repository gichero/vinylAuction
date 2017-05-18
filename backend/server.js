const express = require('express');
const Promise = require('bluebird');
const cors  = require('cors');
const pgp = require('pg-promise')({
    promiseLib: Promise
});
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt');
const uuid = require('uuid');

const db = pgp({
    database: 'vinyl'
});

const app = express();

app.use(bodyParser.json());

app.use(cors());
