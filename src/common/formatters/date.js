export function formatDate(raw) {
  if (!raw) return false;
  return new Date(raw).toLocaleDateString();
}
