/* eslint-disable object-curly-newline */

import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);

const stylishDiff = fs.readFileSync(getFixturePath('diffNested.txt'), 'utf-8').trim();
const plainDiff = fs.readFileSync(getFixturePath('plainDiff.txt'), 'utf-8').trim();
const jsonDiff = fs.readFileSync(getFixturePath('jsonDiff.txt'), 'utf-8').trim();

describe.each([
  {
    filepath1: 'file1-nested.json',
    filepath2: 'file2-nested.json',
    format: 'stylish',
    extension: 'json',
    result: stylishDiff,
  },
  {
    filepath1: 'file1-nested.yaml',
    filepath2: 'file2-nested.yml',
    format: 'stylish',
    extension: 'yaml',
    result: stylishDiff,
  },
  {
    filepath1: 'file1-nested.json',
    filepath2: 'file2-nested.json',
    format: 'plain',
    extension: 'json',
    result: plainDiff,
  },
  {
    filepath1: 'file1-nested.json',
    filepath2: 'file2-nested.json',
    format: 'json',
    extension: 'json',
    result: jsonDiff,
  },
])('genDiff with $format format', ({ filepath1, filepath2, format, result, extension }) => {
  it(`should return correct diff with ${extension} files`, () => {
    const diff = genDiff(getFixturePath(filepath1), getFixturePath(filepath2), format);
    expect(diff).toBe(result);
  });
});

describe.each([
  {
    filepath1: 'test.bad',
    filepath2: 'file2.json',
    format: 'stylish',
    error: 'Unsupported file format - bad',
  },
  {
    filepath1: 'file1.json',
    filepath2: 'file2.json',
    format: 'bad',
    error: 'Unsupported format - bad',
  },
])('genDiff should throw error', ({ filepath1, filepath2, format, error }) => {
  it(`${error}`, () => {
    expect(() => genDiff(getFixturePath(filepath1), getFixturePath(filepath2), format)).toThrow(
      error,
    );
  });
});
