import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import genDiff from './genDiff.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');
const parseData = (filepath) => parse(readFile(filepath), path.extname(filepath));

export default (filepath1, filepath2) => {
  const content1 = parseData(filepath1);
  const content2 = parseData(filepath2);

  return genDiff(content1, content2);
};
