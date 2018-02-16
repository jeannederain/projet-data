const joi = require('joi');
const db = require('../../utils/database');
const tittle = require('tittle');

module.exports = {
  method: 'GET',
  path: '/posts/{id}',
  config: {
      validate: {
          params: joi.object().keys({
            id: [
                joi.string().required(),
                joi.number().integer().positive().required()
            ]
          })
      }
  },
  handler: async function (req, handler) {

    const query = db.select()
      .from('posts')
      .innerJoin('users', 'posts.user_id', '=', 'users.id')
      .innerJoin('comments', 'posts.id', '=', 'comments.post_id')
      .where({'posts.id': req.params.id})
    let [post, error] = await tittle(query);
    if (error) {
        return handler.response({
            statusCode: 400,
            error: 'Something bad happened: + explicit error'
        }).code(400)
    }
    
    const data = {
      post : {},
      comments : [],
      author : {}
    };
    data.post = {
        "title": post[0].title,
        "description": post[0].description,
        "date" : post[0].created_at
    }
    data.author = {
        "first name" : post[0].first_name,
        "last name": post[0].last_name
    }  
    
    post.forEach (post => {
        data.comments.push(post.comment)
    })
      
    
    return handler.response({
        statusCode: 200,
        data: data
    }).code(200)
  }
}
