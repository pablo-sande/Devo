const { program } = require('commander');
const palindrome = require('./palindrome.library');

program
  .requiredOption('-s <string>', 'the string to determine wether it is a palindrome or not')

program.parse(process.argv);
const options = program.opts();

console.log(`${options.s} is${palindrome(options.s) ? '' : ' NOT'} a palindrome`);