require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    database: 'postgres',
    username: 'postgres.mtsawreagatljhfemguo',
    password: 'placeeenc123456.',
    host: 'aws-0-us-west-1.pooler.supabase.com',
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // You may need to set this to true depending on your SSL configuration
      },
      authentication: {
        method: 'scram-sha-256'
      }
    }
  },
  production: {
    dialect: 'postgres',
    database: 'postgres',
    username: 'postgres.mtsawreagatljhfemguo',
    password: 'placeeenc123456.',
    host: 'aws-0-us-west-1.pooler.supabase.com',
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // You may need to set this to true depending on your SSL configuration
      },
      authentication: {
        method: 'scram-sha-256'
      }
    }
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
