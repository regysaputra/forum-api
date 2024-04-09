const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      description: 'POST users',
      notes: 'Test',
      tags: ['api', 'users'],
      validate: {
        payload: Joi.object({
          username: Joi.string(),
          password: Joi.string(),
          fullname: Joi.string()
        }).label('Post-users-payload')
      },
      response: {
        status: {
          201: Joi.object({
            status: 'success',
            data: {
              addedUser: {
                id: Joi.string(),
                username: Joi.string(),
                fullname: Joi.string()
              }
            }
          }).label('Post-users-response')
        }
      }
    }
  },
]);

module.exports = routes;
