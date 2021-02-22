import { DEFAULT_LANGUAGE_ID } from '../reducers/PortalReducer';

export function redirect(ctx, path: string): void {
  const { res } = ctx;
  if (res) {
    res.writeHead(301, { Location: path });
    res.end();
  }
}

export const keys = {
  token: '@liferay-grow/token',
};

export const languagesFull = {
  en_US: 'English',
  es_ES: 'Spanish',
  pt_BR: 'Portuguese',
};

const languageFlag = {
  en_US: '🇺🇸',
  es_ES: '🇪🇸',
  pt_BR: '🇧🇷',
};

export const getCountryLanguage = (key: any = DEFAULT_LANGUAGE_ID): string => {
  return `${languageFlag[key]} ${languagesFull[key]}`;
};
