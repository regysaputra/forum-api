const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/users',
    options: {
      handler: handler.postUserHandler,
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              description: 'Created',
              schema: Joi.object({
                status: 'success',
                data: {
                  addedUser: {
                    id: Joi.string(),
                    username: Joi.string(),
                    fullname: Joi.string()
                  }
                }
              })
            }
          },
          payloadType: 'form'
        }
      },
      validate: {
        payload: Joi.object({
          username: Joi.string().required().description('body payload'),
          fullname: Joi.string().required().description('body payload'),
          password: Joi.string().required().description('body payload')
        })
      }
    }
  },
]);

module.exports = routes;
