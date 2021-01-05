const accentsMap = {
  a: 'á|à|ã|â|ä',
  A: 'À|Á|Ã|Â|Ä',
  e: 'é|è|ê|ë',
  E: 'É|È|Ê|Ë',
  i: 'í|ì|î|ï',
  I: 'Í|Ì|Î|Ï',
  o: 'ó|ò|ô|õ|ö',
  O: 'Ó|Ò|Ô|Õ|Ö',
  u: 'ú|ù|û|ü',
  U: 'Ú|Ù|Û|Ü',
  c: 'ç',
  C: 'Ç',
  n: 'ñ',
  N: 'Ñ',
};

const noAccent = (text) =>
  Object.keys(accentsMap).reduce(
    (acc, cur) => acc.replace(new RegExp(accentsMap[cur], 'g'), cur),
    text
  );

export default noAccent;
