import { isObject } from '../utility.js';

export default (tree) => {
  const getPrefix = (type) => {
    const prefixes = {
      added: '+ ',
      removed: '- ',
      default: '  ',
    };

    return prefixes[type] || prefixes.default;
  };

  const getSpace = (depth) => getPrefix('default').repeat(depth);

  const normalizeValue = (item, depth) => {
    if (!isObject(item)) {
      return item;
    }

    return `{\n${Object.keys(item)
      .map((key) => {
        const value = isObject(item[key]) ? normalizeValue(item[key], depth + 2) : item[key];

        return `${getSpace(depth + 3)}${key}: ${value}`;
      })
      .join('\n')}\n${getSpace(depth + 1)}}`;
  };

  const iter = (items, depth = 1) => {
    const stringify = (obj) => {
      const { type, key, value } = obj;
      const prefix = getPrefix(type);

      if (type === 'complex value') {
        return `${getSpace(depth)}${prefix}${key}: {\n${iter(value, depth + 2)}\n${getSpace(
          depth + 1,
        )}}`;
      }

      if (type === 'updated') {
        return iter(obj.values, depth);
      }

      return `${getSpace(depth)}${prefix}${key}: ${normalizeValue(value, depth)}`;
    };

    return items.map(stringify).join('\n');
  };

  return `{\n${iter(tree)}\n}`;
};
