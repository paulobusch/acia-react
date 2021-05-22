export default function maxLength(limit) {
  return function(value) {
    if ([null, undefined, ''].indexOf(value) !== -1) return false;
    if (value.length > limit) return `A quantidade de caracteres não deve ser maior que ${limit}`;
    return false;
  }
}
