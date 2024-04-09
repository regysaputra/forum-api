const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
    options: {
      auth: 'bearer-auth-strategy',
      description: 'POST threads',
      notes: 'Test',
      tags: ['api', 'thread'],
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }]
        }
      },
      validate: {
        payload: Joi.object({
          title: Joi.string(),
          body: Joi.string()
        }).label('Post-threads-payload')
      },
      response: {
        status: {
          200: Joi.object({
            status: 'success',
            data: {
              id: Joi.string(),
              title: Joi.string(),
              owner: Joi.string()
            }
          }).label('Post-threads-response'),
          401: Joi.object({
            status: 'fail',
            message: 'Missing authentication'
          }).label('Post-threads-response')
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler.getThreadHandler,
    options: {
      description: 'GET threads by id',
      notes: 'Test',
      tags: ['api', 'thread'],
      response: {
        status: {
          200: Joi.object({
            status: 'success',
            data: {
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
            }
          }).label('Get-threads-response'),
          404: Joi.object({
            status: 'fail',
            message: 'Thread tidak ditemukan'
          }).label('Get-threads-response')
        }
      }
    }
  },
]);

module.exports = routes;
