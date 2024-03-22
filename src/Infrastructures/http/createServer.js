const Hapi = require('@hapi/hapi');
const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const users = require('../../Interfaces/http/api/users');
const authentications = require('../../Interfaces/http/api/authentications');
const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager');
const threads = require('../../Interfaces/http/api/threads');
const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');
const config = require('../../Commons/config');
const comments = require('../../Interfaces/http/api/comments');
const replies = require('../../Interfaces/http/api/replies');

const createServer = async (container) => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    debug: config.app.debug,
  });

  // eslint-disable-next-line no-unused-vars
  const bearerAuthScheme = function bearerAuthScheme(_server, _options) {
    return {
      async authenticate(request, h) {
        // Extract credentials from the request
        const authorizationHeader = request.headers.authorization;

        // Jika access token undefined
        if (!authorizationHeader) {
          return h.unauthenticated(new AuthenticationError('Missing authentication'));
        }

        const token = authorizationHeader.split(' ')[1]; // Bearer token

        // Perform authentication logic (verify token)
        const isValid = await container
          .getInstance(AuthenticationTokenManager.name)
          .verifyAccessToken(token);

        if (!isValid) {
          return h.unauthenticated(new AuthenticationError('access token tidak valid'));
        }

        // Decode token
        const { username, id } = await container
          .getInstance(AuthenticationTokenManager.name)
          .decodePayload(token);

        // Return an object
        return h.authenticated({ credentials: { username, id } });
      },
    };
  };

  server.auth.scheme('bearer-auth-scheme', bearerAuthScheme);

  server.auth.strategy('bearer-auth-strategy', 'bearer-auth-scheme');

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
    {
      plugin: threads,
      options: { container },
    },
    {
      plugin: comments,
      options: { container },
    },
    {
      plugin: replies,
      options: { container },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof Error) {
      // bila response tersebut error, tangani sesuai kebutuhan
      const translatedError = DomainErrorTranslator.translate(response);

      // penanganan client error secara internal.
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!translatedError.isServer) {
        return h.continue;
      }

      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  return server;
};

module.exports = createServer;
