import yaml from 'js-yaml';

export default (content, type) => {
  if (type === 'json') {
    return JSON.parse(content);
  }

  if (type.match(/ya?ml/)) {
    return yaml.load(content);
  }

  throw new Error(`Unsupported file format - ${type}`);
};
