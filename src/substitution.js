// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  // Base arrays for referencing index values //
  const realAlphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  const symbolAlphabet = ["!","@","#","$","%","^","&","*","(",")"];
  const numberAlphabet = ["0","1","2","3","4","5","6","7","8","9"];

  function substitution(input, alphabet, encode = true) {
    // Test for no alphabet input //
    if(!alphabet) return false;

    // Create array from input //
    const inputArray = Array.from(input);

    // Conditional for input containing invalid characters //
    if(!inputArray.some((char)=> realAlphabet.includes(char)) && !inputArray.some((char)=> symbolAlphabet.includes(char)) && !inputArray.some((char)=> numberAlphabet.includes(char))) return false;

    // Create array from code alphabet input //
    const substitutionArray = Array.from(alphabet);

    // Test for duplicate characters in code alphabet //
    const uniqueTest = new Set(substitutionArray);
    if(!(uniqueTest.size === 26)) return false;
    
    // Decoding //
    if(!encode){
      const decodedArray = inputArray.map((char) => {
        // Decoding coded symbols that would have conflicted with code alphabet //
        if (numberAlphabet.some((number)=> number === char)) {
          const symbolIndex = numberAlphabet.findIndex((number) => number === char);
          const decodedSymbol = symbolAlphabet[symbolIndex];
          return decodedSymbol;
        }
        // Maintain non-code characters // 
        if (char === " " || !substitutionArray.some((character) => character === char))
          return char;
        
        // Decode characters via index //
        let letterIndex = substitutionArray.findIndex((letter) => letter === char);
        const decodedLetter = realAlphabet[letterIndex];
        return decodedLetter;
        });
      // Return string of decoded array //
      return decodedArray.join("");
    }
    
    // Encoding //

    // Test if input contains numbers //
    if(inputArray.some((char)=> numberAlphabet.includes(char))) return false;

    // Code array via map //
    const codedArray = inputArray.map((char) => {
      // Maintain non-code characters // 
      if (!realAlphabet.some((letter) => letter === char.toLowerCase()) && !substitutionArray.some((character) => character === char))
        return char;
      // Code symbols present in code alphabet as numbers to prevent decoding errors //
      if (!realAlphabet.some((letter) => letter === char.toLowerCase()) && substitutionArray.some((character) => character === char)) {
         const symbolIndex = symbolAlphabet.findIndex((symbol) => symbol === char);
         const codedSymbol = numberAlphabet[symbolIndex];
         return codedSymbol;
      }
      
      // Code message via index //
      const letterIndex = realAlphabet.findIndex(
        (letter) => letter === char.toLowerCase()
      );
      const codedLetter = substitutionArray[letterIndex];
      return codedLetter;
      });
    
    // Return string of coded array //
    return codedArray.join("");
  }

  return {
    substitution,
  };
})();

module.exports = substitutionModule.substitution;
