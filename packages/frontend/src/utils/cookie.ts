import cookie from 'cookie';
import jsCookie from 'js-cookie';

import { keys } from './util';

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

export function getToken(): string | null {
  return jsCookie.get(keys.token);
}

export function delToken(): void {
  jsCookie.remove(keys.token);
}

export function setToken(bearer: string): void {
  jsCookie.set(keys.token, bearer, { expires: 1, sameSite: 'strict' });
}
