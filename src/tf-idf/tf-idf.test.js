const mockTokensLegal = require('./mocks/mockTokensLegal');
const tfidflib = require('./tf-idf.library');

describe("TF-IDF", () => {
    test("should tokenize the file ", async () => {
        const tokens = await tfidflib.getTokensFromFile('./mockFiles/legal.txt');
        const mockTokens = require('./mocks/mockTokensLegal').split(',');
        expect(tokens).toEqual(mockTokens);
    });

    test("should throw an error with an invalid file name ", async () => {
        let error;
        try {
            const tokens = await tfidflib.getTokensFromFile('wrongPath');
        } catch(err) {
            error = err;
        }
        expect(error).toBeTruthy();
    });

    test("should calculate the tf ", () => {
        const tokens = require('./mocks/mockTokensLegal').split(',');
        const tf = tfidflib.getFileTf(tokens, 'legal.txt');
        const devo = tf.words['devo'];
        expect(tf).toEqual(require('./mocks/mockTfLegal'));
        expect(devo.count).toBe(18);
        expect(devo.tf).toBe(devo.count / tokens.length);
    });
    
    test("should calculate the tf-idf ", () => {
        const files = [
            require('./mocks/mockTfCookies'),
            require('./mocks/mockTfPolicy'),
            require('./mocks/mockTfLegal')
        ];

        let ranking = tfidflib.getRanking(tfidflib.calculateTfIdf(['devo'], files)); 

        // Despite privacy.txt having more occurrences for 'devo', legal.txt has the highest tf-idf
        expect(ranking[0][0]).toBe('legal.txt');

        ranking = tfidflib.getRanking(tfidflib.calculateTfIdf(['legal', 'cookies', 'privacy'], files)); 

        /*
        This shows how cookies.txt has the highest tf-idf, as one of the terms (cookies) has a lot of
        occurrences there and it is quite irrelevant for the other documents 
        */
        expect(ranking[0][0]).toBe('cookies.txt');

        expect(ranking).toEqual(require('./mocks/mockTfIdf'));
    });
});
