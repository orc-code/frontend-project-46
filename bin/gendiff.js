#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/index.js';

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option(
    '-f, --format [type]',
    'output format, supported formats: plain, json, stylish',
    'stylish',
  )
  .argument('<filepath1>', 'path to first file, supported formats: json, yaml, yml')
  .argument('<filepath2>', 'path to second file, supported formats: json, yaml, yml');

program.action((filepath1, filepath2, options) => {
  console.log(gendiff(filepath1, filepath2, options.format));
});

program.parse();
