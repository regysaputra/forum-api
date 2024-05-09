const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/authentications',
    options: {
      handler: handler.postAuthenticationHandler,
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              description: 'Created',
              schema: Joi.object({
                status: 'success',
                data: {
                  accessToken: Joi.string(),
                  refreshToken: Joi.string()
                }
              })
            }
          }
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/authentications',
    options: {
      handler: handler.putAuthenticationHandler,
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Ok',
              schema: Joi.object({
                status: 'success',
                data: {
                  accessToken: Joi.string()
                }
              })
            }
          }
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/authentications',
    options: {
      handler: handler.deleteAuthenticationHandler,
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Ok',
              schema: Joi.object({
                status: 'success'
              })
            }
          }
        }
      }
    }
  },
]);

module.exports = routes;
