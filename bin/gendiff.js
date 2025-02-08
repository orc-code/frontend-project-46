#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/index.js';

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    gendiff(filepath1, filepath2);
  });

program.parse();

if (program.args.length === 0) {
  program.outputHelp();
}
