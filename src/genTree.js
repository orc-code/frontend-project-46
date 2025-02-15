export default (object1, object2) => {
  const isObject = (obj) => obj !== null && typeof obj === 'object' && !Array.isArray(obj);

  const iter = (obj1, obj2, depth = 1) => {
    const keys = Object.keys({ ...obj1, ...obj2 });
    const uniqueKeys = keys.filter((key, index, arr) => arr.indexOf(key) === index);
    const sortedKeys = uniqueKeys.sort();

    const result = sortedKeys.flatMap((key) => {
      const getNested = (object, firstValue, secondValue) => ({
        ...object,
        value: iter(firstValue, secondValue, depth + 2),
        isNest: true,
      });

      const getItem = (type, value) => ({
        type,
        depth,
        key,
        value,
      });

      const getAdded = (value) => {
        const item = getItem('added', value);

        return isObject(value) ? getNested(item, value, value) : item;
      };

      const getRemoved = (value) => {
        const item = getItem('removed', value);

        return isObject(value) ? getNested(item, value, value) : item;
      };

      const value1 = obj1[key];
      const value2 = obj2[key];

      if (isObject(value1) && isObject(value2)) {
        return getNested(getItem('nested', {}), value1, value2);
      }

      if (!Object.hasOwn(obj1, key)) {
        return getAdded(value2);
      }

      if (!Object.hasOwn(obj2, key)) {
        return getRemoved(value1);
      }

      if (value1 !== value2) {
        return [getRemoved(value1), getAdded(value2)];
      }

      return getItem('default', value1);
    });

    return result;
  };

  return iter(object1, object2);
};
