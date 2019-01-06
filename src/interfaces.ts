/**
 * The object of setting of the npm module
 *
 * @interface ISettings
 */
export interface ISettings {
  /** Array of char in need of potential need of replacement after itself */
  after: ReadonlyArray<string> | string;
  /** Array of char in need of potential need of replacement around itself */
  around: ReadonlyArray<string> | string;
  /** Array of char in need of potential need of replacement before itself */
  before: ReadonlyArray<string> | string;
  /** Array of regex, replace match by the replacer */
  regex: ReadonlyArray<RegExp> | RegExp;
  /** Replacer of matching `toReplace` */
  replacer: string;
  /** String to replace */
  toReplace: string;
}
