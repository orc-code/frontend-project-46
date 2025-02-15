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

  const iter = (items) => {
    const stringify = (obj) => {
      // eslint-disable-next-line object-curly-newline
      const { type, key, value, depth, isNest = false } = obj;
      const prefix = getPrefix(type);

      return `${getSpace(depth)}${prefix}${key}: ${
        isNest ? `{\n${iter(value)}\n${getSpace(depth + 1)}}` : value
      }`;
    };

    if (Array.isArray(items)) {
      return items.map(stringify).join('\n');
    }

    return stringify(items);
  };

  return `{\n${iter(tree)}\n}`;
};
