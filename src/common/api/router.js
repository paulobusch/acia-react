export function getIdByRouter(router, path) {
  const { pathname } = router.location;
  const regex = new RegExp(`\/${path}\/`);
  const index = pathname.search(regex);
  if (index === -1) return null;
  return pathname.substring(index).replace(regex, '');  
}
