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
            },
            '400': {
              description: 'BadRequest'
            }
          },
          payloadType: 'form'
        }
      }
    }
  },
]);

module.exports = routes;
