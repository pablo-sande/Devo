const { program } = require('commander');
const kComplementary = require('./k-complementary.library');

program
  .requiredOption('-k <number>', 'the K to find complementary pairs', parseInt)
  .requiredOption('-l, --list <numbers...>', 'the list of numbers (space separated) to find k complementary pairs')

program.parse(process.argv);
const options = program.opts();

try {
    console.log('Number of K-Complementary pairs: ', kComplementary(options.k, options.list.map(_ => parseInt(_))));
} catch(err) {
    console.log(err);
}
