require('dotenv').config();

module.exports = {
 development: {
     dialect: 'postgres',
    host: 'viaduct.proxy.rlwy.net',
    port: 18555,
    username: 'postgres',
    password: 'Ca4fdc54ED3b42deECA31f651Ddg12dc',
    database: 'railway',

  },
  production: {
    dialect: 'postgres',
    host: 'viaduct.proxy.rlwy.net',
    port: 18555,
    username: 'postgres',
    password: 'Ca4fdc54ED3b42deECA31f651Ddg12dc',
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
