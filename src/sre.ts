import * as core from './core';
import defaultSettings from './defaultSetttings';
import { ISettings } from './interfaces';
import { merge } from './utils';

/**
 * Management module for non-breaking spaces
 *
 * @class StringReplaceEnhanced
 */

class StringReplaceEnhanced {
  private settings: ISettings;
  constructor(options: object = {}) {
    this.settings = merge<ISettings>(defaultSettings, options);
  }

  public replaceBefore = (
    str: string,
    toReplace: string = this.settings.toReplace,
    replacer: string = this.settings.replacer,
    before: ReadonlyArray<string> | string = this.settings.before,
  ): string => core.replaceBefore(str, toReplace, replacer, before);


  public replaceAfter = (
    str: string,
    toReplace: string = this.settings.toReplace,
    replacer: string = this.settings.replacer,
    after: ReadonlyArray<string> | string = this.settings.after,
  ): string => core.replaceAfter(str, toReplace, replacer, after);


  public replaceAround = (
    str: string,
    toReplace: string = this.settings.toReplace,
    replacer: string = this.settings.replacer,
    around: ReadonlyArray<string> | string = this.settings.around,
  ): string => core.replaceAround(str, toReplace, replacer, around);


  public replaceOnRegex = (
    str: string,
    regex: ReadonlyArray<RegExp> | RegExp = this.settings.regex,
    replacer: string = this.settings.replacer,
  ): string => core.replaceOnRegex(str, regex, replacer);


  public replace = (
    str: string,
    toReplace: ReadonlyArray<string> | string = this.settings.toReplace,
    replacer: string = this.settings.replacer,
  ): string => core.replace(str, toReplace, replacer);
}
export default StringReplaceEnhanced;

export * from './core';
