export function getApiEndpoint(path) {
  const protocol = window?.location?.protocol || 'https:';
  let host = window?.location?.host || 'localhost:3000';
  // when running from React dev server, convert port 3000 -> 8000 for backend
  if (host.includes(':3000')) {
    host = host.replace(':3000', ':8000');
  }
  return `${protocol}//${host}/api/${path}/`;
}
