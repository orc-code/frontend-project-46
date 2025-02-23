import { isObject } from '../utility.js';

const getStringifiedValue = ({ type, value }) => {
  if (type === 'complex value' || isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

export default (tree) => {
  const iter = (items, path = '') => {
    const result = items.reduce((acc, item) => {
      const { type, key, value } = item;

      if (type === 'complex value') {
        return [...acc, iter(value, `${path}${key}.`)];
      }

      if (type === 'added') {
        return [
          ...acc,
          `Property '${path}${key}' was added with value: ${getStringifiedValue(item)}`,
        ];
      }

      if (type === 'removed') {
        return [...acc, `Property '${path}${key}' was removed`];
      }

      if (type === 'updated') {
        const [itemRemoved, itemAdded] = item.values;

        return [
          ...acc,
          `Property '${path}${key}' was updated. From ${getStringifiedValue(
            itemRemoved,
          )} to ${getStringifiedValue(itemAdded)}`,
        ];
      }

      return acc;
    }, []);

    return result.join('\n');
  };

  return iter(tree);
};
