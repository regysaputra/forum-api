const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    options: {
      handler: handler.postCommentHandler,
      tags: ['api'],
      auth: 'bearer-auth-strategy',
      description: 'Add comment to specific thread',
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              description: 'Created',
              schema: Joi.object({
                status: 'success',
                data: {
                  addedComment: {
                    id: Joi.string(),
                    content: Joi.string(),
                    owner: Joi.string()
                  }
                }
              })
            }
          },
          security: [{ Bearer: {} }]
        }
      },
      validate: {
        params: Joi.object({
          threadId: Joi.string().required().description('url parameter')
        }),
        payload: Joi.object({
          content: Joi.string()
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    options: {
      handler: handler.deleteCommentHandler,
      tags: ['api'],
      auth: 'bearer-auth-strategy',
      description: 'delete comment from specific thread',
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
          commentId: Joi.string().required()
        })
      }
    }
  },
]);

module.exports = routes;
