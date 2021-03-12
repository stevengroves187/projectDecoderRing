// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {
  // Alphabet array //
  const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];

  function caesar(input, shift, encode = true) {
    // Test if shift value is within an acceptable range //
    if (shift === 0 || shift > 25 || shift < -25) return false;

    // If decoding, reverse the shift value //
    if (!encode) {
      if (shift > 0) {
        shift = ~shift + 1;
      } else {
        shift = Math.abs(shift);
      }
    }

    // Create array from input string //
    const inputArray = Array.from(input);

    // Replace characters in array via map //
    const codedArray = inputArray.map((char) => {
      // If nonalphabet character, keep character in place //
      if (!alphabet.some((letter) => letter === char.toLowerCase()))
        return char;
      // Find index of alphabet letter //
      let letterIndex = alphabet.findIndex(
        (letter) => letter === char.toLowerCase()
      );
      // Shift index //
      let shiftedIndex = letterIndex + shift;
      // Conditionals to make shift wrap around the endpoints of the alphabet //
      if (shiftedIndex > 25) shiftedIndex = shiftedIndex - 26;
      if (shiftedIndex < 0) shiftedIndex = shiftedIndex + 26;
      // Replace letter with shifted index letter //
      const shiftedLetter = alphabet[shiftedIndex];
      return shiftedLetter;
    });
    
    // Return joined array of coded message //
    return codedArray.join("");
  }

  return {
    caesar,
  };
})();

module.exports = caesarModule.caesar;
