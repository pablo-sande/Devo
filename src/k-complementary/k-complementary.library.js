const errorMsg = 'Wrong parameters, expecting (int, int[])';

const complementaryKPairs = (k, arr) => {
    if (!Number.isInteger(k) || !(arr instanceof Array)) {
        throw new Error(errorMsg);
    }
    let matches = {};
    let pairsCount = 0;

    arr.forEach(n => {
        if (!Number.isInteger(n)) {
            throw new Error(errorMsg);
        }
        if (!matches[n]) {
            return matches[n] = 1;
        } else {
            matches[n]++;
        }
    });

    Object.keys(matches).forEach(key => {
        let complementaryNumber = k - key;
        if (complementaryNumber in matches) {
            pairsCount += matches[key] * matches[complementaryNumber];
        }
    })

    return pairsCount;
}

module.exports = complementaryKPairs;