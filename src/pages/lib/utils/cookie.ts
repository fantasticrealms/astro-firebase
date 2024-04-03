export function parseCookies(cookie: string) {
  const cookies: any = {};
  cookie && cookie
      .split(';')
      .map((str) => str.trim().replace('=', '\u0000').split('\u0000'))
      .forEach((x: any) => (cookies[x[0]] = x[1]));
  return cookies;
}
