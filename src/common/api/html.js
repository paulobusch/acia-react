export function extractTextFromHtml(html) {
  if (!html) return '';
  const regex = /(<([^>]+)>)/ig;
  return html.replace(regex, '');
}
