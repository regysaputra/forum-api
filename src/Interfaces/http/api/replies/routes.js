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
          security: [{ Bearer: [] }],
          responses: {
            description: 'POST reply',
            schema: Joi.object({
              status: 'success',
              data: {
                addedReply: {
                  id: Joi.string(),
                  content: Joi.string(),
                  owner: Joi.string()
                }
              }
            }).label('Post-reply-response')
          }
        }
      },
      validate: {
        params: Joi.object({
          threadId: Joi.string().required(),
          commentId: Joi.string().required()
        })
      }
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    handler: handler.deleteReplyHandler,
    options: {
      auth: 'bearer-auth-strategy',
      description: 'DELETE reply by reply id',
      tags: ['api', 'reply'],
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }],
          responses: {
            200: {
              description: 'OK',
              schema: Joi.object({
                status: 'success'
              }).label('Delete-replies')
            }
          }
        }
      },
      validate: {
        params: Joi.object({
          threadId: Joi.string().required(),
          commentId: Joi.string().required(),
          replyId: Joi.string().required()
        })
      }
    },
  },
]);

module.exports = routes;
