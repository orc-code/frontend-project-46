import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import genTree from './genTree.js';
import getFormattedTree from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');
const parseData = (filepath) => parse(readFile(filepath), path.extname(filepath));

export default (filepath1, filepath2, formatName = 'stylish') => {
  const content1 = parseData(filepath1);
  const content2 = parseData(filepath2);

  const tree = genTree(content1, content2);

  return getFormattedTree(tree, formatName);
};
