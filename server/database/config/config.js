require('dotenv').config();

module.exports = {
 development: {
     dialect: 'postgres',
    host: 'monorail.proxy.rlwy.net',
    port: 51173,
    username: 'postgres',
    password: '36AdcD5dCfbcDBCFA-Dbf6gFGDeA2C-e',
    database: 'railway',

  },
  production: {
    dialect: 'postgres',
    host: 'monorail.proxy.rlwy.net',
    port: 51173,
    username: 'postgres',
    password: '36AdcD5dCfbcDBCFA-Dbf6gFGDeA2C-e',
    database: 'railway',

  },   
   
/* development: {
    dialect: 'postgres',
    host:  'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'turistic',

  },
  production: {
    dialect: 'postgres',
    host:  'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'turistic',
   
  },  */ 
}; 
