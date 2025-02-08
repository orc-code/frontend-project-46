export default (file1, file2) => {
  const keys = Object.keys({ ...file1, ...file2 });
  const uniqueKeys = keys.filter((key, index, arr) => arr.indexOf(key) === index);
  const sortedKeys = uniqueKeys.sort();

  const result = sortedKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (!Object.hasOwn(file1, key)) {
      return `+ ${key}: ${value2}`;
    }

    if (!Object.hasOwn(file2, key)) {
      return `- ${key}: ${value1}`;
    }

    if (value1 === value2) {
      return `  ${key}: ${value1}`;
    }

    return `- ${key}: ${value1}\n  + ${key}: ${value2}`;
  });

  return `{\n  ${result.join('\n  ')}\n}`;
};
