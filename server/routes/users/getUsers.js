const joi = require('joi');
const db = require('../../utils/database');

module.exports = {
  method: 'GET',
  path: '/users',
  config: {
      validate: {
          
         query: joi.object().keys({
              offset: joi.number().integer().min(0).default(0),
              limit : joi.number().integer().positive().min(1).max(1000).default(10)
          })
      }
      },
  handler: async function (req, handler) {
      
    let users = {};
    try {
        users = await db.select().from('users').limit(req.query.limit).offset(req.query.offset);
    } catch(error) {
        return handler.response({
            statusCode: 400,
            error: 'Something bad happened: + explicit error'
        }).code(400);
    }
    
    // Def previous link 
      
    let prev_link ;
    if ((req.query.offset < req.query.limit) && (req.query.offset != 0)){
        prev_link = 'localhost:8000/users?offset=0&limit='+req.query.limit;
    } else if (req.query.offset == 0){
        prev_link = null;
    } else {
        prev_link = 'localhost:8000/users?offset='+(req.query.offset - req.query.limit)+'&limit='+req.query.limit;

    }
      

    return handler.response({
            statusCode: 200,
            data : users, 
            links : {
                prev : prev_link,
                next : 'localhost:8000/users?offset='+(req.query.offset + req.query.limit)+'&limit='+req.query.limit
            }
        }).code(200)
    
 
  }
        
}

//// Avec la librairie Tittle
//module.exports = {
//  method: 'GET',
//  path: '/users',
//  handler: async function (req, handler) {
//    const query = db.select().from('users').limit(100);  
//    let [users, error] = await tittle(query);
//    if (error) {
//        return handler.response({
//            statusCode: 400,
//            error: 'Something bad happened: + explicit error'
//        }).code(400);
//    }
//        
//    
//    return handler.response({
//            statusCode: 200,
//            data : users
//        }).code(200)
//    
// 
//  }
//        

