const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    options: {
      auth: 'bearer-auth-strategy',
      handler: handler.postThreadHandler,
    },
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler.getThreadHandler,
  },
]);

module.exports = routes;
