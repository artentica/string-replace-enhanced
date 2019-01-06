import utils from '../src/utils';

describe('Test utils methods', () => {
  describe('joinOnOrCommandRegex utils', () => {
    test.each`
      arr                                                      | expected
      ${['toto', 'test']}                                      | ${'toto|test'}
      ${['toto', 'test', 'test', 'test', 'test', 'test']}      | ${'toto|test|test|test|test|test'}
      ${['toto', 'zdzd', 'te995|1st', '&é', '"(:zf)', '|||è']} | ${`toto|zdzd|te995\\|1st|&é|\"\\(:zf\\)|\\|\\|\\|è`}
    `("joinOnOrCommandRegex of ($arr) must return '$expected'", ({ arr, expected }) => {
      expect(utils.joinOnOrCommandRegex(arr)).toEqual(expected);
    });
  });

  describe('toArray utils', () => {
    test.each`
      arr                                                 | expected
      ${['toto', 'test']}                                 | ${['toto', 'test']}
      ${'toto'}                                           | ${['toto']}
      ${['toto', 'test', 'test', 'test', 'test', 'test']} | ${['toto', 'test', 'test', 'test', 'test', 'test']}
    `("toArray of ($arr) must return '$expected'", ({ arr, expected }) => {
      expect(utils.toArray(arr)).toEqual(expected);
    });
  });

  describe('sanitizeRegex utils', () => {
    test.each`
      arr                               | expected
      ${'\\'}                           | ${'\\\\'}
      ${'^'}                            | ${'\\^'}
      ${'$'}                            | ${'\\$'}
      ${'*'}                            | ${'\\*'}
      ${'+'}                            | ${'\\+'}
      ${'?'}                            | ${'\\?'}
      ${'.'}                            | ${'\\.'}
      ${'('}                            | ${'\\('}
      ${')'}                            | ${'\\)'}
      ${'|'}                            | ${'\\|'}
      ${'{'}                            | ${'\\{'}
      ${'}'}                            | ${'\\}'}
      ${'['}                            | ${'\\['}
      ${']'}                            | ${'\\]'}
      ${' azertyu'}                     | ${' azertyu'}
      ${'789456123'}                    | ${'789456123'}
      ${'\\ ^ $ * + ? . ( ) | { } [ ]'} | ${'\\\\ \\^ \\$ \\* \\+ \\? \\. \\( \\) \\| \\{ \\} \\[ \\]'}
    `("sanitizeRegex of ($arr) must return '$expected'", ({ arr, expected }) => {
      expect(utils.sanitizeRegex(arr)).toEqual(expected);
    });
  });

  describe('Merge utils', () => {
    const ref = {
      after: [],
      around: [],
    };
    it('Correct case', () => {
      expect(
        utils.merge(ref, {
          replacer: 'lolilolilol',
        }),
      ).toEqual({ after: [], around: [], replacer: 'lolilolilol' });
    });
    it('Bad input but destructable - string', () => {
      expect(utils.merge(ref, 'i')).toEqual({
        0: 'i',
        after: [],
        around: [],
      });
    });
    it('Bad input but destructable - number', () => {
      expect(utils.merge(ref, 12)).toEqual({
        after: [],
        around: [],
      });
    });
  });
});
