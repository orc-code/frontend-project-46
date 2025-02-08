import fs from 'fs';
import path from 'path';
import parseData from './parser.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');

export default (filepath1, filepath2) => {
  const content1 = parseData(readFile(filepath1), path.extname(filepath1));
  const content2 = parseData(readFile(filepath2), path.extname(filepath2));

  console.log('🚀 ~ content1:', content1);
  console.log('🚀 ~ content2:', content2);
};
