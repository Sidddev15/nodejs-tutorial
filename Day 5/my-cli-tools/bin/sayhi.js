#!/usr/bin/env node
import chalk from 'chalk';

const name = process.argv[2] || 'Developer';

console.log(chalk.green(`Hey ${name}, You're crushing NodeJS! 🚀`));
