const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '161.132.40.86',
  user: 'angel',   
  password: 'Game#vps#24',
  database: 'alnoan_bd',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
