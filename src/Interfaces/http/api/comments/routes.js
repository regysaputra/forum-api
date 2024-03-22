const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    options: {
      auth: 'bearer-auth-strategy',
      handler: handler.postCommentHandler,
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    options: {
      auth: 'bearer-auth-strategy',
      handler: handler.deleteCommentHandler,
    },
  },
]);

module.exports = routes;
