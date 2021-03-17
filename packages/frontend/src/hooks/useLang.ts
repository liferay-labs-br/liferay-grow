import { useRouter } from 'next/router';

import { languages } from '@/i18n';

const getKeyValue = (obj: Record<string, string> = {}) => (key: string) =>
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
  const { locale } = useRouter();

  const translate = (word: string) => {
    return getKeyValue(languages[locale])(word) || capitalize(word);
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
