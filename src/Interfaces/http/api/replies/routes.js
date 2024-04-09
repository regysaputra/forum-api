const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: handler.postReplyHandler,
    options: {
      auth: 'bearer-auth-strategy',
      description: 'POST replies',
      notes: 'Test',
      tags: ['api', 'reply'],
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }]
        }
      },
      validate: {
        params: Joi.object({
          threadId: Joi.string().required(),
          commentId: Joi.string().required()
        }),
        payload: Joi.object({
          content: Joi.string()
        }).label('Post-replies-payload')
      },
      response: {
        status: {
          201: Joi.object({
            status: 'success',
            data: {
              addedReply: {
                id: Joi.string(),
                content: Joi.string(),
                owner: Joi.string()
              }
            }
          }).label('Post-replies-response'),
          401: Joi.object({
            status: 'fail',
            message: 'Missing authentication'
          }).label('Post-replies-response')
        }
      }
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    handler: handler.deleteReplyHandler,
    options: {
      auth: 'bearer-auth-strategy',
      description: 'DELETE replies',
      notes: 'Test',
      tags: ['api', 'reply'],
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }]
        }
      },
      validate: {
        params: Joi.object({
          threadId: Joi.string().required(),
          commentId: Joi.string().required(),
          replyId: Joi.string().required()
        }),
        payload: Joi.object({
          content: Joi.string()
        }).label('Post-replies-payload')
      },
      response: {
        status: {
          201: Joi.object({
            status: 'success'
          }).label('Post-replies-response'),
          401: Joi.object({
            status: 'fail',
            message: 'Missing authentication'
          }).label('Post-replies-response')
        }
      }
    },
  },
]);

module.exports = routes;
