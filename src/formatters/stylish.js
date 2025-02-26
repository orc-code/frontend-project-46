import _ from 'lodash';

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
    if (!_.isPlainObject(item)) {
      return item;
    }

    return `{\n${Object.keys(item)
      .map((key) => {
        const value = _.isPlainObject(item[key]) ? normalizeValue(item[key], depth + 2) : item[key];

        return `${getSpace(depth + 3)}${key}: ${value}`;
      })
      .join('\n')}\n${getSpace(depth + 1)}}`;
  };

  const iter = (items, depth = 1) => {
    const result = items.map((item) => {
      const { type, key, value } = item;
      const prefix = getPrefix(type);

      if (type === 'nested') {
        return `${getSpace(depth)}${prefix}${key}: {\n${iter(value, depth + 2)}\n${getSpace(
          depth + 1,
        )}}`;
      }

      if (type === 'updated') {
        const [itemRemoved, itemAdded] = value;
        return `${getSpace(depth)}${getPrefix('removed')}${key}: ${normalizeValue(
          itemRemoved,
          depth,
        )}\n${getSpace(depth)}${getPrefix('added')}${key}: ${normalizeValue(itemAdded, depth)}`;
      }

      return `${getSpace(depth)}${prefix}${key}: ${normalizeValue(value, depth)}`;
    });

    return result.join('\n');
  };

  return `{\n${iter(tree)}\n}`;
};
