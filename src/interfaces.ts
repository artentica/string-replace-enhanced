/**
 * The object of setting of the npm module
 *
 * @interface ISettings
 */
export interface ISettings {
  /** Array of char in need of replacer after */
  after: ReadonlyArray<string>;
  /**  Array of char in need of replacer around */
  around: ReadonlyArray<string>;
  /** Array of char in need of replacer before */
  before: ReadonlyArray<string>;
  /** Array of regex, replace match by the replacer */
  regex: ReadonlyArray<RegExp>;
  /** Replacer of matching `toReplace` */
  replacer: string;
  /** String to replace */
  toReplace: string;
}
