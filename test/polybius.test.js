const { expect } = require("chai");
const chai = require("chai");
const polybius = require("../src/polybius");

const sentence = "This is a joke";
const capitalSentence = "This Is A Capitalized Sentence";
const symbolSentence = "This Sentence! has @symbols$$!";

describe("polybius()", () => {
    it ("should translate both i and j to 42", ()=> {
        const actual = polybius(sentence, true);
        const expected = "44324234 4234 11 42435251";

        expect(actual).to.equal(expected);
    });

    it ("should decode 42 to (i/j)", ()=> {
        const actual = polybius("44324234 4234 11 42435251", false);

        expect(actual).to.include("(i/j)");
    });

    it ("should ignore capital letters", ()=> {
        const actual = polybius(capitalSentence, true)
        const expected = polybius(capitalSentence.toLowerCase(), true);

        expect(actual).to.equal(expected);
    })
    
    it ("should maintain spaces and other nonalphabetic symbols in the message, before and after encoding or decoding", ()=> {
        const actual = polybius(polybius(symbolSentence, true), false);
        const expected = "th(i/j)s sentence! has @symbols$$!";

        expect(actual).to.equal(expected);
    })
})