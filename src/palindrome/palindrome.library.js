const palindrome = (str) => {
    if (!typeof str === 'string') {
        throw new Error('Wrong parameters, expected (string)')
    }
    str = str.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
    for (let i = 0, l = str.length; i < l / 2; i++) {
      if (str[i] !== str[l - 1 - i]) {
          return false;
      }
    }
    return true;
}

module.exports = palindrome;