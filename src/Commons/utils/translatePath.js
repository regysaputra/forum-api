function translatePath(path) {
  const dictionary = {
    authentication: 'authentication',
    thread: 'thread',
    user: 'user',
    reply: 'balasan',
    comment: 'komentar'
  };

  return dictionary[path];
}

module.exports = translatePath;
