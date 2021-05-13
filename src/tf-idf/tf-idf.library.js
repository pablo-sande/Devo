const fs = require('fs').promises;
const path = require('path');

const newTfObject = (filename) => ({name: filename, words: {}})

const getTokensFromFile = async (filename) => 
    (await fs.readFile(path.resolve(__dirname, filename), {encoding: 'utf8'})).match(/\b(\w+)\b/g);

const getFileTf = (tokens, filename) => {
    const tfFile = newTfObject(filename);

    for (let word of tokens) {
        const lcw = word.toLowerCase();
        if (!tfFile.words[lcw]) {
            tfFile.words[lcw] = {count: 1, tf: 1 / tokens.length}
        } else {
            tfFile.words[lcw].count++;
            tfFile.words[lcw].tf = tfFile.words[lcw].count / tokens.length;
        }
    }

    return tfFile;
}

const calculateTfIdf = (terms, files) => {
    const allTfidfs = {};

    for (let term of terms) {
        term = term.toLowerCase();
        const filesWithTerm = files.filter(file => file.words[term] !== undefined);

        files.forEach(file => {
            const tf = file.words[term] ? file.words[term].tf : 0;
            const idf = Math.log(files.length / (filesWithTerm.length || 1));
            const tfidf = tf * idf;
            allTfidfs[file.name] = allTfidfs[file.name] ? allTfidfs[file.name] + tfidf : tfidf;
        })
    }

    return allTfidfs;
}

const getRanking = (tfIdfObj) => Object.entries(tfIdfObj).sort((a, b) => b[1] - a[1])
 
module.exports = { getFileTf, calculateTfIdf, getTokensFromFile, getRanking };