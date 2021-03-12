const { expect } = require("chai");
const chai = require("chai");
const caesar = require("../src/caesar");

const sentence = "this is a sentence";
const capitalSentence = "This Is A Capitalized Sentence";
const symbolSentence = "This Sentence! has @symbols$$!";

describe("caesar()", () => {
    it ("should return false if the shift value is equal to 0", ()=> {
        const actual = caesar(sentence, 0, true);
        const expected = false;

        expect(actual).to.equal(expected);
    });

    it ("should return false if the shift value is less than -25", ()=> {
        const actual = caesar(sentence, -30, true);
        const expected = false;

        expect(actual).to.equal(expected);
    });

    it ("should return false if the shift value is greater than 25", ()=> {
        const actual = caesar(sentence, 30, true);
        const expected = false;

        expect(actual).to.equal(expected);
    });

    it ("should ignore capital letters", ()=> {
        const actual = caesar(capitalSentence, 5, true)
        const expected = caesar(capitalSentence.toLowerCase(), 5,true);

        expect(actual).to.equal(expected);
    })
    
    it ("should handle shifts that go past the end of the alphabet", ()=> {
        const actual = caesar(sentence, 20, true)
        const expected = "nbcm cm u myhnyhwy";

        expect(actual).to.equal(expected);
    })

    it ("should maintain spaces and other nonalphabetic symbols in the message, before and after encoding or decoding", ()=> {
        const actual = caesar(caesar(symbolSentence, 3, true), 3, false);
        const expected = symbolSentence.toLowerCase();

        expect(actual).to.equal(expected);
    })
})