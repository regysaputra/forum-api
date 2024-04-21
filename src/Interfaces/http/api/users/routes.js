const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      description: 'POST users',
      tags: ['api', 'users'],
      plugins: {
        'hapi-swagger': {
          responses: {
            201: {
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
              }).label('Post-user-response')
            }
          }
        }
      }
    }
  },
]);

module.exports = routes;
