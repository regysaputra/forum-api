const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    options: {
      handler: handler.postReplyHandler,
      tags: ['api'],
      auth: 'bearer-auth-strategy',
      description: 'add reply to specific comment',
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: {} }],
          responses: {
            '201': {
              description: 'Created',
              schema: Joi.object({
                status: 'success',
                data: {
                  addedReply: {
                    id: Joi.string(),
                    content: Joi.string(),
                    owner: Joi.string()
                  }
                }
              })
            }
          },
          payloadType: 'form'
        }
      },
      validate: {
        params: Joi.object({
          threadId: Joi.string().required().description('url parameter'),
          commentId: Joi.string().required().description('url parameter')
        }),
        payload: Joi.object({
          content: Joi.string().required().description('body payload')
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    options: {
      handler: handler.deleteReplyHandler,
      tags: ['api'],
      auth: 'bearer-auth-strategy',
      description: 'Delete reply from specific comment',
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: {} }],
          responses: {
            '200': {
              description: 'OK',
              schema: Joi.object({
                status: 'success'
              })
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
    }
  },
]);

module.exports = routes;
