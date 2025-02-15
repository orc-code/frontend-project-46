import path from 'path';
import genDiff from '../src/index.js';

let diffFlat;
let diffNested;
let plainDiff;

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);

beforeAll(() => {
  diffFlat = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  diffNested = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  plainDiff = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
});

describe('genDiff', () => {
  it('should return correct flat diff with json', () => {
    const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
    expect(diff).toBe(diffFlat);
  });

  it('should return correct flat diff with yaml', () => {
    const diff = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish');
    expect(diff).toBe(diffFlat);
  });

  it('should return correct nested diff with json', () => {
    const diff = genDiff(
      getFixturePath('file1-nested.json'),
      getFixturePath('file2-nested.json'),
      'stylish',
    );
    expect(diff).toBe(diffNested);
  });

  it('should return correct nested diff with yaml', () => {
    const diff = genDiff(
      getFixturePath('file1-nested.yaml'),
      getFixturePath('file2-nested.yaml'),
      'stylish',
    );
    expect(diff).toBe(diffNested);
  });

  it('should throw error with bad extension', () => {
    expect(() => genDiff('__fixtures__/test.bad', '__fixtures__/file2.json')).toThrow(
      'Unsupported file format',
    );
  });

  it('should throw error with bad format', () => {
    expect(() => genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'bad')).toThrow(
      'Unsupported format',
    );
  });

  it('should return plain diff', () => {
    const diff = genDiff(
      getFixturePath('file1-nested.json'),
      getFixturePath('file2-nested.json'),
      'plain',
    );
    expect(diff).toBe(plainDiff);
  });
});
