const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
    options: {
      auth: 'bearer-auth-strategy',
      description: 'POST threads',
      tags: ['api', 'thread'],
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }],
          responses: {
            201: {
              description: 'Created',
              schema: Joi.object({
                status: 'success',
                data: {
                  id: Joi.string(),
                  title: Joi.string(),
                  owner: Joi.string()
                }
              }).label('Post-thread-responses')
            }
          }
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    options: {
      handler: handler.getThreadHandler,
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
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
              }).label('Detail-Thread-Result')
            }
          }
        }
      },
      description: 'GET detail threads by thread id',
      tags: ['api', 'thread']
    }
  },
]);

module.exports = routes;
