import { version } from '../package.json';

export const VERSION = version;

export const removeSpaces = (str: string) => {
  return str.replace(/\s+/g, '');
};
