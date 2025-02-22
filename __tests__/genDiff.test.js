import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);

const diffFlat = fs.readFileSync(getFixturePath('diffFlat.txt'), 'utf-8').trim();
const diffNested = fs.readFileSync(getFixturePath('diffNested.txt'), 'utf-8').trim();
const plainDiff = fs.readFileSync(getFixturePath('plainDiff.txt'), 'utf-8').trim();
const jsonDiff = fs.readFileSync(getFixturePath('jsonDiff.txt'), 'utf-8').trim();

describe('genDiff', () => {
  describe('should return correct stylish format diff', () => {
    it('should return correct flat diff with json', () => {
      const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
      expect(diff).toEqual(diffFlat);
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
        'Unsupported file format - bad',
      );
    });

    it('should throw error with bad format', () => {
      expect(() => genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'bad')).toThrow(
        'Unsupported format - bad',
      );
    });
  });

  it('should return plain format diff', () => {
    const diff = genDiff(
      getFixturePath('file1-nested.json'),
      getFixturePath('file2-nested.json'),
      'plain',
    );
    expect(diff).toBe(plainDiff);
  });

  it('should return json format diff', () => {
    const diff = genDiff(
      getFixturePath('file1-nested.json'),
      getFixturePath('file2-nested.json'),
      'json',
    );
    expect(diff).toBe(jsonDiff);
  });
});
