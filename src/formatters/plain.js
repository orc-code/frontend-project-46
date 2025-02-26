import _ from 'lodash';

const getStringifiedValue = ({ type, value }) => {
  if (type === 'nested' || _.isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

export default (tree) => {
  const iter = (items, path = '') => {
    const result = items.map((item) => {
      const { type, key, value } = item;

      if (type === 'nested') {
        return iter(value, `${path}${key}.`);
      }

      if (type === 'added') {
        return `Property '${path}${key}' was added with value: ${getStringifiedValue(item)}`;
      }

      if (type === 'removed') {
        return `Property '${path}${key}' was removed`;
      }

      if (type === 'updated') {
        const [itemRemoved, itemAdded] = value;

        return `Property '${path}${key}' was updated. From ${getStringifiedValue({
          type: 'removed',
          value: itemRemoved,
        })} to ${getStringifiedValue({ type: 'added', value: itemAdded })}`;
      }

      return '';
    }, []);

    return result.filter((v) => v !== '').join('\n');
  };

  return iter(tree);
};
