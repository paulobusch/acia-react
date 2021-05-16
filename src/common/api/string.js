export function limitText(text, limit) {
  if (!text) return '';
  if (text.length > limit) 
    return `${text.substr(0, limit - 3).trim()}...`;
  return text;
}
