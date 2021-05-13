const { expect, test } = require('@jest/globals');
const complementaryKPairs = require('./k-complementary.library');

test('should calculate the complementary k pairs ', () => {
    let pairs = [], error;

    try {
        pairs = [
            complementaryKPairs(10, [1, 2, 5, 0, 4, 9, 6, 11, -1]),
            complementaryKPairs(10, [1, 2, 4, 4, 7, 20, -11]),
            complementaryKPairs(6, [1, 8, -3, 0, 1, 3, -2, 4, 5]),
            complementaryKPairs(6, []),
        ]
    } catch(err) {
        error = err;
    }
    expect(pairs.length).toBe(4);
    expect(pairs[0]).toBe(7);
    expect(pairs[1]).toBe(0);
    expect(pairs[2]).toBe(7);
    expect(pairs[3]).toBe(0);
    expect(error).toBeUndefined();
})

test('should throw an error ', () => {
    let error, pairs;
    try {
        pairs = complementaryKPairs("5", [1, 2, 3]);
    } catch(err) {
        error = err;
    }
    expect(pairs).toBeUndefined();
    expect(error).toBeTruthy();

    error = undefined;
    try {
        pairs = complementaryKPairs(5, {});
    } catch(err) {
        error = err;
    }
    expect(pairs).toBeUndefined();
    expect(error).toBeTruthy();
});
