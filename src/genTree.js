import _ from 'lodash';

export default (object1, object2) => {
  const iter = (obj1, obj2) => {
    const keys = [...new Set(Object.keys({ ...obj1, ...obj2 }))].toSorted();

    return keys.map((key) => {
      if (_.isPlainObject(obj1?.[key]) && _.isPlainObject(obj2?.[key])) {
        return {
          type: 'nested',
          key,
          value: iter(obj1[key], obj2[key]),
        };
      }

      if (!Object.hasOwn(obj1, key)) {
        return {
          type: 'added',
          key,
          value: obj2?.[key],
        };
      }

      if (!Object.hasOwn(obj2, key)) {
        return {
          type: 'removed',
          key,
          value: obj1?.[key],
        };
      }

      if (!_.isEqual(obj1?.[key], obj2?.[key])) {
        return {
          type: 'updated',
          key,
          value: [obj1?.[key], obj2?.[key]],
        };
      }

      return {
        type: 'unchanged',
        key,
        value: obj1?.[key],
      };
    });
  };

  return iter(object1, object2);
};
