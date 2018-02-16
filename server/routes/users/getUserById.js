const joi = require('joi');
const db = require('../../utils/database');

module.exports = {
  method: 'GET',
  path: '/users/{id}',
  config: {
      validate: {
          params: joi.object().keys({
              id: joi.number().integer().positive().required()
          })
      }
  },
  handler: function (req, handler) {
    return db.select().from('users').where({
        id: req.params.id // We are passing an object to authorized multiple conditions
      })
    .then( function (data) {
        return handler.response({
            statusCode: 200,
            data: data[0]
          }).code(200)
    })
    .catch(error => {
        return handler.response({
            statusCode: 400,
            error: 'Something bad happened: + explicit error'
          }).code(400)
    })
  }
}


// En methode async / Await
//module.exports = {
//  method: 'GET',
//  path: '/users/{id}',
//  config: {
//      validate: {
//          params: joi.object().keys({
//              id: joi.number().integer().positive().required()
//          })
//      }
//  },
//  handler: async function (req, handler) {
//    
//      let [user, error] = await tittle(db.select().from('users').where({
//        id: req.params.id // We are passing an object to authorized multiple conditions
//      }))
//      if (error) {
//          return handler.response({
//            statusCode: 400,
//            error: 'Something bad happened: + explicit error'
//          }).code(400)
//      }
//      
//      return handler.response({
//            statusCode: 200,
//            data: user
//          }).code(200)
//      
//      
//
//   
//  }
//}


//
//
//const joi = require('joi');
//const db = require('../../utils/database');
//
//module.exports = {
//  method: 'GET',
//  path: '/users/{id}',
////  config: {
////      validate: {
////          params: joi.object().keys({
////              id: joi.number().integer().positive().required()
////          })
////      }
////  },
//  handler: function (req, handler) {
//    return db.select().from('users').where({
//        id: req.params.id // We are passing an object to authorized multiple conditions
//      })
//    .then( function (data) {
//        return handler.response({
//            statusCode: 200,
//            data: data[0]
//          }).code(200)
//    })
//    .catch(error => {
//        return handler.response({
//            statusCode: 400,
//            error: 'Something bad happened: + explicit error'
//          }).code(400)
//    })
//  }
//
//}
//
//async function function() {
//    try {
//        await config: {
//        validate: {
//          params: joi.object().keys({
//              id: joi.number().integer().positive().required()
//          })
//      }
//     }
//    }
//    
//    catch (err) {
//        
//        return handler.response({
//            statusCode: 400,
//            error: 'Something bad happened: + explicit error'
//          }).code(400)
//    
//};
//
//function();
