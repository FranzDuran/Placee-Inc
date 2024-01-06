require('dotenv').config();

module.exports = {
 development: {
     dialect: 'postgres',
    host: 'monorail.proxy.rlwy.net',
    port: 44280,
    username: 'postgres',
    password: '-146cc32cF223dEF*3AED523c1cFAgGa',
    database: 'railway',

  },
  production: {
    dialect: 'postgres',
    host: 'monorail.proxy.rlwy.net',
    port: 44280,
    username: 'postgres',
    password: '-146cc32cF223dEF*3AED523c1cFAgGa',
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
   
  }, */   
};
