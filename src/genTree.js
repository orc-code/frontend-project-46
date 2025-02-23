import { isObject } from './utility.js';

export default (object1, object2) => {
  const iter = (obj1, obj2) => {
    const keys = [...new Set(Object.keys({ ...obj1, ...obj2 }))].toSorted();

    return keys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (isObject(value1) && isObject(value2)) {
        return {
          type: 'complex value',
          key,
          value: iter(value1, value2),
        };
      }

      if (!Object.hasOwn(obj1, key)) {
        return {
          type: 'added',
          key,
          value: value2,
        };
      }

      if (!Object.hasOwn(obj2, key)) {
        return {
          type: 'removed',
          key,
          value: value1,
        };
      }

      if (value1 !== value2) {
        return {
          type: 'updated',
          key,
          values: [
            {
              type: 'removed',
              key,
              value: value1,
            },
            {
              type: 'added',
              key,
              value: value2,
            },
          ],
        };
      }

      return {
        type: 'default',
        key,
        value: value1,
      };
    });
  };

  return iter(object1, object2);
};
