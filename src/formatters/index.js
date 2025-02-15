import getStylish from './stylish.js';

export default (tree, format) => {
  if (format === 'stylish') {
    return getStylish(tree);
  }

  throw new Error('Unsupported format');
};
