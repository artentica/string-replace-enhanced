/**
 * Returns the merge of two objects
 *
 * @param base - The base object
 * @param addition - The overloader object
 * @returns The merge of `base` and `addition`
 */
export const merge = <T>(base: T, addition: object): T => Object.assign({}, base, addition);

/**
 * Join the `arr` with `|` char and escaped the `|` if it's present in the array values
 *
 * @param arr - Array of element to join with an OR command
 * @returns - Returns an string of an OR regexp element with the `|` escaped
 */
export const joinOnOrCommandRegex = (arr: ReadonlyArray<string>): string => arr.map(sanitizeRegex).join('|');

/**
 * Escape RegExp special characters
 *
 * @param str
 * @returns - Returns escaped string
 */
export const sanitizeRegex = (str: string): string => {
  const matchOperators = /[|\\{}()[\]^$+*?.]/g;
  return str.replace(matchOperators, '\\$&');
};

/**
 * Forced an array of T if a T is passed
 *
 * @param x - Array of T element or just a T type
 * @returns - Returns an array of T if it's a T
 */
export const toArray = <T>(x: ReadonlyArray<T> | T): ReadonlyArray<T> => (x instanceof Array ? x : [x]);

export default { merge, joinOnOrCommandRegex, sanitizeRegex, toArray };
