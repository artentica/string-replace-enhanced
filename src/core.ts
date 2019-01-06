import { joinOnOrCommandRegex, sanitizeRegex, toArray } from './utils';

 /**
  * Replace the `toReplace` for the `before` of the settings
  *
  * @example
  * replaceBefore("« Hello world ! »", " ", `&nbsp;`, "»");
  * // `« Hello world !&nbsp;»`
  * @example
  * replaceBefore("« Hello world ! »", " ", `&nbsp;`,[ "»", "!"]);
  * // `« Hello world&nbsp;!&nbsp;»`
  * @param str - string on which to work
  * @param toReplace - string to replace
  * @param replacer - string of replacement
  * @param before - before the string in this array
  * @returns - String with all occurence before `before`'s string replaced
  */
  export function replaceBefore(
    str: string,
    toReplace: string,
    replacer: string,
    before: ReadonlyArray<string> | string,
    ): string {
      return str.replace(
        new RegExp(
          `(${sanitizeRegex(toReplace)}|${sanitizeRegex(replacer)})(?=[(${joinOnOrCommandRegex(toArray(before))})])`,
          'g',
        ),
        replacer,
      );
    }

  /**
   * Replace the `toReplace` for the `after` of the settings
   *
   * @example
   * replaceAfter("« Hello world ! »", " ", `&nbsp;`, "«");
   * // `«&nbsp;Hello world ! »`
   * @example
   * replaceAfter("« Hello world ! »", " ", `&nbsp;`,[ "«", "!"]);
   * // `«&nbsp;Hello world !&nbsp;»`
   * @param str - string on which to work
   * @param toReplace - string to replace
   * @param replacer - string of replacement
   * @param after - after the string in this array
   * @returns - String with all occurence after `after`'s string replaced
   */
  export function replaceAfter(str: string, toReplace: string, replacer: string, after: ReadonlyArray<string> | string): string {
      return str.replace(
        new RegExp(
          `(?<=[(${joinOnOrCommandRegex(toArray(after))})])(${sanitizeRegex(toReplace)}|${sanitizeRegex(replacer)})`,
          'g',
        ),
        replacer,
      );
    }

  /**
   * Replace the `toReplace` for the `around` of the settings
   *
   * @example
   * replaceAround("« Hello world ! »", " ", `&nbsp;`, "«");
   * // `«&nbsp;Hello world ! »`
   * @example
   * replaceAround("« Hello world ! »", " ", `&nbsp;`,[ "«", "!", "»"]);
   * // `«&nbsp;Hello world&nbsp;!&nbsp;»`
   * @param str - string on which to work
   * @param toReplace - string to replace
   * @param replacer - string of replacement
   * @param around - around the string in this array
   * @returns - String with all occurence after `around`'s string replaced
   */
  export function replaceAround(
      str: string,
      toReplace: string,
      replacer: string,
      around: ReadonlyArray<string> | string,
      ): string {
        return replaceBefore(
          replaceAfter(str, toReplace, replacer, toArray(around)),
          toReplace,
          replacer,
          toArray(around),
        );
      }

  /**
   *
   * Replace all selected text by the regexp, replace selected text in the order of declared regexp
   *
   * @example
   * replaceOnRegex("« Hello world ! »", /t/g, `!!!`);
   *  // `« Hello world !!! »`
   * @param str - string on which to work
   * @param regex - regexp for select text
   * @param replacer - string of replacement
   * @returns Return a string with occurence replaced
   */
  export function replaceOnRegex(str: string, regex: ReadonlyArray<RegExp> | RegExp, replacer: string): string {
        return toArray(regex).reduce((acc, curr) => acc.replace(curr, replacer), str);
      }

  /**
   *
   * Replace all the string pass in parameters with the string of replacement with escaping the regex symbol
   *
   * @example
   * replace("« Hello world ! »", " ", `&nbsp;`);
   * // `«&nbsp;Hello&nbsp;world&nbsp;!&nbsp;»`
   * @example
   * replace(`&nbsp;Hello&nbsp;world&nbsp;!&nbsp;»`, [ `&nbsp;`, "!"], " ",);
   * // `« Hello world   »`
   *
   * @param str - string on which to work
   * @param toReplace - string to replace
   * @param replacer - string of replacement
   * @returns
   */
  export function replace(str: string, toReplace: ReadonlyArray<string> | string, replacer: string): string {
        return str.replace(new RegExp(`${joinOnOrCommandRegex(toArray(toReplace))}`, 'g'), replacer);
      }
