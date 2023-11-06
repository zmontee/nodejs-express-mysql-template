const { MYSQL_CONFIG } = require('../utils/mysql-config');

const mysql = require('mysql');
const connection = mysql.createPool({...MYSQL_CONFIG});

module.exports = connection;