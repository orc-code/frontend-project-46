import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJson from './json.js';

export default (tree, format) => {
  if (format === 'stylish') {
    return getStylish(tree);
  }

  if (format === 'plain') {
    return getPlain(tree);
  }

  if (format === 'json') {
    return getJson(tree);
  }

  throw new Error(`Unsupported format - ${format}`);
};
