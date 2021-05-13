const { program } = require('commander');
const fs = require('fs');
const tfidflib = require('./tf-idf.library');

const myParseInt = (value) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue < 0) {
      throw new program.InvalidOptionArgumentError('Not a valid number. Please provide positive integers.');
    }
    return parsedValue;
}

program
  .requiredOption('-d --directory <string>', 'the directory from which documents will be read')
  .requiredOption('-t, --terms [letters...]', 'the terms to be analyzed')
  .requiredOption('-n, --number <number>', 'the count of top results to show', myParseInt)
  .requiredOption('-p --period <number>', 'the period in millisecods to report the top count of results to show', myParseInt);

program.parse(process.argv);
const options = program.opts();
 
const files = [];
let newFiles = [];
let ranking = [];
let counter = 0;


const getNewRanking = async () => {
    if (newFiles.length) {
        while (newFiles.length) {
            const newFile = newFiles.shift();
            try {
                const tokens = await tfidflib.getTokensFromFile(options.directory + '/' + newFile);
                files.push(tfidflib.getFileTf(tokens, newFile));
            } catch(err) {
                return console.error(err);
            }
        }
        const tfIdfObj = tfidflib.calculateTfIdf(options.terms, files);
        ranking = tfidflib.getRanking(tfIdfObj).slice(0, options.number);
    }
    console.log(`===== (time X${counter ? ' + ' + counter: ''}) =====`, ranking)
    counter += options.period;
}

fs.readdir(options.directory, (err, data) => {
    newFiles = data;
    setInterval(getNewRanking, options.period);
    getNewRanking();
});

fs.watch(options.directory, (eventType, filename) => {
    if (filename) {
        console.log(`new file found: ${filename}`);

        if (!files.find(f => f.name === filename) && newFiles.indexOf(filename) < 0) {
            newFiles.push(filename);
        }
    }
});

