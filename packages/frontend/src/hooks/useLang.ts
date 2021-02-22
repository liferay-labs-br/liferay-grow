import { languages } from '@monorepo/i18n';
import { useContext } from 'react';

import AppContext from '../AppContext';
import { DEFAULT_LANGUAGE_ID } from '../reducers/PortalReducer';

const getKeyValue = (obj: Record<string, any> = {}) => (key: string) =>
  obj[key];
const capitalize = (s: string): string => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
interface Translation {
  get: (word: string) => string;
  sub: (word: string, words: string[] | string) => string;
}

const useLang = (): Translation => {
  const {
    state: {
      portal: { languageId = DEFAULT_LANGUAGE_ID },
    },
  } = useContext(AppContext);

  const translate = (word: string) => {
    return getKeyValue(languages[languageId])(word) || capitalize(word);
  };

  return {
    get: translate,
    sub: (word: string, words: string[] | string): string => {
      if (!Array.isArray(words)) {
        words = [words];
      }

      let translatedWord = translate(word);
      words.forEach((value, index) => {
        const translatedKey = translate(value);
        const key = `{${index}}`;
        translatedWord = translatedWord?.replace(key, translatedKey);
      });

      return translatedWord;
    },
  };
};

export default useLang;
