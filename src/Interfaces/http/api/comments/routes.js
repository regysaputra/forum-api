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
          security: [{ Bearer: [] }],
          responses: {
            201: {
              description: 'POST comment',
              schema: Joi.object({
                status: 'success',
                data: {
                  addedComment: {
                    id: Joi.string(),
                    content: Joi.string(),
                    owner: Joi.string()
                  }
                }
              }).label('Post-comment-response')
            }
          }
        }
      },
      validate: {
        params: Joi.object({
          threadId: Joi.string().required()
        })
      }
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.deleteCommentHandler,
    options: {
      auth: 'bearer-auth-strategy',
      description: 'delete comments by comment id',
      tags: ['api', 'comment'],
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }],
          responses: {
            200: {
              description: 'OK',
              schema: Joi.object({
                status: 'success'
              }).label('Delete-comment-success')
            }
          }
        }
      },
      validate: {
        params: Joi.object({
          threadId: Joi.string().required(),
          commentId: Joi.string().required()
        }).label('Delete-comments-params')
      }
    },
  },
]);

module.exports = routes;
