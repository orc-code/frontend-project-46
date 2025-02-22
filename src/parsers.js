import yaml from 'js-yaml';

export default (content, extension) => {
  if (extension === 'json') {
    return JSON.parse(content);
  }

  if (extension.match(/ya?ml/)) {
    return yaml.load(content);
  }

  throw new Error(`Unsupported file format - ${extension}`);
};
