function pluralToSingular(str) {
  const endings = {
    ves: 'fe',
    ies: 'y',
    i: 'us',
    zes: 'ze',
    ses: 's',
    es: 'e',
    s: '',
  };

  return str.replace(
    new RegExp(`(${Object.keys(endings).join('|')})$`),
    r => endings[r]
  );
}

module.exports = pluralToSingular;
