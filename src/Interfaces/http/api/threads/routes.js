const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    options: {
      handler: handler.postThreadHandler,
      tags: ['api'],
      auth: 'bearer-auth-strategy',
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              description: 'Created',
              schema: Joi.object({
                status: 'success',
                data: {
                  id: Joi.string(),
                  title: Joi.string(),
                  owner: Joi.string()
                }
              })
            }
          },
          security: [{
            Bearer: {}
          }]
        }
      },
      validate: {
        payload: Joi.object({
          title: Joi.string(),
          body: Joi.string()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    options: {
      handler: handler.getThreadHandler,
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'OK',
              schema: Joi.object({
                id: Joi.string(),
                title: Joi.string(),
                body: Joi.string(),
                date: Joi.string(),
                username: Joi.string(),
                comments: Joi.array().items(Joi.object({
                  id: Joi.string(),
                  username: Joi.string(),
                  date: Joi.string(),
                  content: Joi.string(),
                  replies: Joi.array().items(Joi.object({
                    id: Joi.string(),
                    content: Joi.string(),
                    date: Joi.string(),
                    username: Joi.string()
                  }))
                }))
              })
            }
          }
        }
      },
      validate: {
        params: Joi.object({
          threadId: Joi.string()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/threads',
    options: {
      handler: handler.getAllThreadHandler,
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'OK',
              schema: Joi.object({
                id: Joi.string(),
                title: Joi.string(),
                body: Joi.string(),
                date: Joi.string(),
                username: Joi.string()
              })
            }
          }
        }
      },
    }
  }
]);

module.exports = routes;
