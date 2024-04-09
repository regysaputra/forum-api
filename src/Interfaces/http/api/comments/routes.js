const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postCommentHandler,
    options: {
      auth: 'bearer-auth-strategy',
      description: 'POST comments',
      notes: 'Test',
      tags: ['api', 'comment'],
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }]
        }
      },
      validate: {
        params: Joi.object({
          threadId: Joi.string().required()
        }),
        payload: Joi.object({
          content: Joi.string()
        }).label('Post-threads-payload')
      },
      response: {
        status: {
          201: Joi.object({
            status: 'success',
            data: {
              addedComment: {
                id: Joi.string(),
                content: Joi.string(),
                owner: Joi.string()
              }
            }
          }).label('Post-threads-response'),
          401: Joi.object({
            status: 'fail',
            message: 'Missing authentication'
          }).label('Post-threads-response'),
          404: Joi.object({
            status: 'fail',
            message: 'Thread tidak ditemukan'
          }).label('Post-threads-response'),
        }
      }
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.deleteCommentHandler,
    options: {
      auth: 'bearer-auth-strategy',
      description: 'delete comments',
      notes: 'Test',
      tags: ['api', 'comment'],
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }]
        }
      },
      validate: {
        params: Joi.object({
          threadId: Joi.string().required(),
          commentId: Joi.string().required()
        }).label('Delete-comments-params')
      },
      response: {
        status: {
          201: Joi.object({
            status: 'success'
          }).label('Post-threads-response'),
          401: Joi.object({
            status: 'fail',
            message: 'Missing authentication'
          }).label('Post-threads-response')
        }
      }
    },
  },
]);

module.exports = routes;
