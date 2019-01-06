import sre from '../src/sre';
import { replace, replaceAfter, replaceAround, replaceBefore, replaceOnRegex} from '../src/sre';

describe('Test functions exported', () => {
  it('replace', () => {
    expect(replace('toto','t','o')).toEqual('oooo');
  });
  it('replaceAfter', () => {
    expect(replaceAfter('toto','t','o', 'o')).toEqual('tooo');
    });
  it('replaceAround', () => {
    expect(replaceAround('toto','t','o', 'o')).toEqual('oooo');
    expect(replaceAround("« Hello world ! »", " ", `&nbsp;`, ["«", "!", "»"])).toEqual('«&nbsp;Hello world&nbsp;!&nbsp;»');
    });
  it('replaceBefore', () => {
    expect(replaceBefore('toto','t','o', 'o')).toEqual('oooo');
    });
  it('replaceOnRegex', () => {
    expect(replaceOnRegex('toto',/t/g,'o')).toEqual('oooo');
    expect(replaceOnRegex('Hello world !', /!/g, '!!!')).toEqual('Hello world !!!');
    });
}),

describe('Test sre Class', () => {
  describe('sre contructor', () => {
    it('no param', () => {
      expect(new sre().settings).toEqual({
        after: ['«'],
        around: [],
        before: ['!', '?', ':', ';', '»'],
        regex: [],
        replacer: '&nbsp;',
        toReplace: ' ',
      });
    });
    it('Param object', () => {
      expect(
        new sre({
          replacer: 'toto',
        }).settings,
      ).toEqual({
        after: ['«'],
        around: [],
        before: ['!', '?', ':', ';', '»'],
        regex: [],
        replacer: 'toto',
        toReplace: ' ',
      });
    });
  });
  describe('replaceBefore', () => {
    const stringReplaceEnhanced = new sre({ before: ['!', '|', ':', ';', '»'] });
    test.each`
      str                    | toReplace    | replacer     | before       | expected
      ${'  | '}              | ${undefined} | ${undefined} | ${undefined} | ${' &nbsp;| '}
      ${'  | '}              | ${undefined} | ${'o'}       | ${undefined} | ${' o| '}
      ${'  | !'}             | ${undefined} | ${'o'}       | ${undefined} | ${' o|o!'}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${[' ']}     | ${'  o '}
      ${'  |'}               | ${'|'}       | ${'o'}       | ${[' ']}     | ${'  |'}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${['7']}     | ${'  | '}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${' '}       | ${'  o '}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${'7'}       | ${'  | '}
      ${'Chaussettes !'}     | ${undefined} | ${undefined} | ${undefined} | ${'Chaussettes&nbsp;!'}
      ${'Chaussettes  !'}    | ${undefined} | ${undefined} | ${undefined} | ${'Chaussettes &nbsp;!'}
      ${'Chauss|ettes |  !'} | ${undefined} | ${undefined} | ${undefined} | ${'Chauss|ettes&nbsp;| &nbsp;!'}
    `("replaceBefore of ($str) must return '$expected'", ({ str, toReplace, replacer, before, expected }) => {
      expect(stringReplaceEnhanced.replaceBefore(str, toReplace, replacer, before)).toEqual(expected);
    });
  });
  describe('replaceAfter', () => {
    const stringReplaceEnhanced = new sre({ after: ['!', '|', '»'] });
    test.each`
      str                    | toReplace    | replacer     | after        | expected
      ${'  | '}              | ${undefined} | ${undefined} | ${undefined} | ${'  |&nbsp;'}
      ${'  | '}              | ${undefined} | ${'o'}       | ${undefined} | ${'  |o'}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${[' ']}     | ${'  o '}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${' '}       | ${'  o '}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${['7']}     | ${'  | '}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${'7'}       | ${'  | '}
      ${'Chaussettes !'}     | ${undefined} | ${undefined} | ${undefined} | ${'Chaussettes !'}
      ${'Chaussettes ! '}    | ${undefined} | ${undefined} | ${undefined} | ${'Chaussettes !&nbsp;'}
      ${'Chauss|ettes |  !'} | ${undefined} | ${undefined} | ${undefined} | ${'Chauss|ettes |&nbsp; !'}
    `("replaceAfter of ($str) must return '$expected'", ({ str, toReplace, replacer, after, expected }) => {
      expect(stringReplaceEnhanced.replaceAfter(str, toReplace, replacer, after)).toEqual(expected);
    });
  });
  describe('replaceAround', () => {
    const stringReplaceEnhanced = new sre({ around: ['!', '|', '»'] });
    test.each`
      str                    | toReplace    | replacer     | around       | expected
      ${'  | '}              | ${undefined} | ${undefined} | ${undefined} | ${' &nbsp;|&nbsp;'}
      ${'  | '}              | ${undefined} | ${'o'}       | ${undefined} | ${' o|o'}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${[' ']}     | ${'  o '}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${[]}        | ${'  | '}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${['7']}     | ${'  | '}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${' '}       | ${'  o '}
      ${'  | '}              | ${'|'}       | ${'o'}       | ${'7'}       | ${'  | '}
      ${'  | '}              | ${undefined} | ${undefined} | ${undefined} | ${' &nbsp;|&nbsp;'}
      ${'Chaussettes !'}     | ${undefined} | ${undefined} | ${undefined} | ${'Chaussettes&nbsp;!'}
      ${'Chaussettes ! '}    | ${undefined} | ${undefined} | ${undefined} | ${'Chaussettes&nbsp;!&nbsp;'}
      ${'Chauss|ettes |  !'} | ${undefined} | ${undefined} | ${undefined} | ${'Chauss|ettes&nbsp;|&nbsp;&nbsp;!'}
    `("replaceAround of ($str) must return '$expected'", ({ str, toReplace, replacer, around, expected }) => {
      expect(stringReplaceEnhanced.replaceAround(str, toReplace, replacer, around)).toEqual(expected);
    });
  });
  describe('replaceOnRegex', () => {
    const stringReplaceEnhanced = new sre({ regex: [new RegExp('!', 'g'), new RegExp('\\|', 'g')] });
    test.each`
      str                    | regex        | replacer     | expected
      ${'  | '}              | ${undefined} | ${undefined} | ${'  &nbsp; '}
      ${'  | '}              | ${undefined} | ${'o'}       | ${'  o '}
      ${'  | '}              | ${[]}        | ${'o'}       | ${'  | '}
      ${'  | '}              | ${['7']}     | ${'o'}       | ${'  | '}
      ${'  | '}              | ${'7'}       | ${'o'}       | ${'  | '}
      ${'  | '}              | ${undefined} | ${undefined} | ${'  &nbsp; '}
      ${'Chaussettes !'}     | ${undefined} | ${undefined} | ${'Chaussettes &nbsp;'}
      ${'Chaussettes ! '}    | ${undefined} | ${undefined} | ${'Chaussettes &nbsp; '}
      ${'Chauss|ettes |  !'} | ${undefined} | ${undefined} | ${'Chauss&nbsp;ettes &nbsp;  &nbsp;'}
    `("replaceOnRegex of ($str) must return '$expected'", ({ str, regex, replacer, expected }) => {
      expect(stringReplaceEnhanced.replaceOnRegex(str, regex, replacer)).toEqual(expected);
    });
  });
  describe('replace', () => {
    const stringReplaceEnhanced = new sre({ toReplace: ['!', '|', '»'] });
    test.each`
      str                    | toReplace    | replacer     | expected
      ${'  | '}              | ${undefined} | ${undefined} | ${'  &nbsp; '}
      ${'  | '}              | ${undefined} | ${'o'}       | ${'  o '}
      ${'  | '}              | ${[' ']}     | ${'o'}       | ${'oo|o'}
      ${'  | '}              | ${[]}        | ${'o'}       | ${'o o o|o o'}
      ${'  | '}              | ${['7']}     | ${'o'}       | ${'  | '}
      ${'  | '}              | ${' '}       | ${'o'}       | ${'oo|o'}
      ${'  | '}              | ${'7'}       | ${'o'}       | ${'  | '}
      ${'  | '}              | ${undefined} | ${undefined} | ${'  &nbsp; '}
      ${'Chaussettes !'}     | ${undefined} | ${undefined} | ${'Chaussettes &nbsp;'}
      ${'Chaussettes ! '}    | ${undefined} | ${undefined} | ${'Chaussettes &nbsp; '}
      ${'Chauss|ettes |  !'} | ${undefined} | ${undefined} | ${'Chauss&nbsp;ettes &nbsp;  &nbsp;'}
    `("replace of ($str) must return '$expected'", ({ str, toReplace, replacer, expected }) => {
      expect(stringReplaceEnhanced.replace(str, toReplace, replacer)).toEqual(expected);
    });
  });
});
