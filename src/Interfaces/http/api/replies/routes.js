const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    options: {
      auth: 'bearer-auth-strategy',
      handler: handler.postReplyHandler,
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    options: {
      auth: 'bearer-auth-strategy',
      handler: handler.deleteReplyHandler,
    },
  },
]);

module.exports = routes;
