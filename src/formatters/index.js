import getStylish from './stylish.js';
import getPlain from './plain.js';

export default (tree, format) => {
  if (format === 'stylish') {
    return getStylish(tree);
  }

  if (format === 'plain') {
    return getPlain(tree);
  }

  if (format === 'json') {
    return JSON.stringify(tree);
  }

  throw new Error(`Unsupported format - ${format}`);
};
