export default function requiredValue(expectedValue, message) {
  return function(value) {
    if (!value) return undefined;
    if (expectedValue != value) return message || `O valor do campo deve ser ${expectedValue}`;
    return undefined;
  }
}
