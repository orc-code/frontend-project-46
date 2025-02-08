import genDiff from '../src/index.js';

describe('genDiff', () => {
  it('should return correct diff with json', () => {
    const diff = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
    expect(diff).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  });

  it('should return correct diff with yaml', () => {
    const diff = genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yml');
    expect(diff).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  });

  it('should throw error', () => {
    expect(() => genDiff('__fixtures__/test.bad', '__fixtures__/file2.json')).toThrow(
      'Unsupported file format',
    );
  });
});
