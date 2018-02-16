'use strict';

module.exports = {
  database: process.env.DB || 'mysql://root:roooot@localhost:3306/wsf',
  http: {
    host: 'localhost',
    port: 8000,
    routes:{
        cors:{
            origin: ['*']
        }
    }
  }
}
