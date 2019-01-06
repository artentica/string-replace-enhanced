import { ISettings } from './interfaces';

const defaultSettings: ISettings = {
  after: ['«'],
  around: [],
  before: ['!', '?', ':', ';', '»'],
  regex: [],
  replacer: '&nbsp;',
  toReplace: ' ',
};

export default defaultSettings;
