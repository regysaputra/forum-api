const createServer = require('../createServer');

describe('when GET /', () => {
  it('should return 200 and Hai World', async () => {
    // Arrange
    const server = await createServer({});

    // Action
    const response = await server.inject({
      method: 'GET',
      url: '/',
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(200);
    expect(responseJson.value).toEqual('Hai World');
  });
});
