const { expect } = require("chai");
const chai = require("chai");
const substitution = require("../src/substitution");

const sentence = "This is a joke";
const capitalSentence = "This Is A Capitalized Sentence";
const symbolSentence = "This Sentence! has @symbols$$!";
const codedAlphabet = "plmoknijbuhvygctfxrdzeswaq";
const shortAlphabet = "apoles";
const longAlphabet = "qwertyuiopasdfghjklzxcvbnm$@!";
const duplicateAlphabet ="aabbccddeeffgghiksf";
const symbolAlphabet = "$wae&zrdxtfcygvuhbijnokmpl";

describe("substitution()", () => {
    it ("should return false if the given alphabet isn't exactly 26 characters", ()=> {
        const actual1 = substitution(sentence, shortAlphabet);
        const actual2 = substitution(sentence, longAlphabet);

        expect(actual1).to.not.be.ok;
        expect(actual2).to.not.be.ok;
    });

    it ("should return false if the given input contains numbers", ()=> {
        const actual = substitution("I have 5 dollars!", codedAlphabet);
        

        expect(actual).to.not.be.ok;
    });

    it ("should correctly translate the given phrase, based on the alphabet given to the function", ()=> {
        const actual = substitution("message", codedAlphabet);

        expect(actual).to.equal("ykrrpik");
    });

    it ("should return false if there are any duplicate characters in the given alphabet", ()=> {
        const actual = substitution(sentence, duplicateAlphabet)

        expect(actual).to.not.be.ok;
    })
    
    it ("should maintain spaces and basic symbols in the message, before and after encoding or decoding", ()=> {
        const actual = substitution(substitution(symbolSentence, symbolAlphabet),symbolAlphabet, false);
        const expected = symbolSentence.toLowerCase();

        expect(actual).to.equal(expected);
    })

    it ("should ignore capital letters", ()=> {
        const actual = substitution(capitalSentence, codedAlphabet)
        const expected = substitution(capitalSentence.toLowerCase(), codedAlphabet);
        expect(actual).to.equal(expected);
    })
})