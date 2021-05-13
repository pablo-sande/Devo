const { expect } = require('@jest/globals');
const palindrome = require('./palindrome.library')

test('should determine if it is a palindrome ', () => {
    expect(palindrome('oso')).toBe(true);
    expect(palindrome('cacahuete')).toBe(false);
    expect(palindrome('dabale arroz a la zorra el abad')).toBe(true);
    expect(palindrome('esto no es un palindromo')).toBe(false);
    expect(palindrome('1234567654321')).toBe(true);
    expect(palindrome('A man, a plan, a canal. Panama')).toBe(true);
});

test('should throw an error ', () => {
    let error;

    try {
        palindrome({});     
    } catch(err) {
        error = err;
    }

    expect(error).toBeTruthy();
});