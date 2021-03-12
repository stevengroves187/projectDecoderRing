// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  // Base arrays for referencing index values//
  const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  const codedAlphabet = ["11","21","31","41","51","12","22","32","42","42","52","13","23","33","43","53","14","24","34","44","54","15","25","35","45","55"];
  const numbers = ["1","2","3","4","5"];
  
  function polybius(input, encode = true) {
    // Create array from input string // 
    const inputArray = Array.from(input);
    
    // Decoding //
    if(!encode){
      // Testing if odd number of numbers //
      const numbersOnly = inputArray.filter((index) => numbers.some((number) => number === index));
      if(numbersOnly.length&1===1) return false;

      // Counters for reduce //
      let counter1 = 0;
      let counter2 = 0;

      // Reduce joining the individual numbers into their groups of two for decoding //
      const fixedArray = inputArray.reduce((acc,char) =>{
        // Conditional for maintaining non-numerical characters //
        if (!numbers.some((number) => number === inputArray[counter2])) {
        acc[counter1] = inputArray[counter2];
        counter2++;
        } else {
        acc[counter1] = `${inputArray[counter2]}${inputArray[counter2+1]}`;  
        counter2+=2;  
       }
        counter1++;
        return acc;
      },[]);
      
      // Cuts off the extra length of shortened array //
      const cutOff = fixedArray.findIndex((index)=> index === undefined);
      fixedArray.length = cutOff;
      
      // Decode array via map //
      const decodedArray = fixedArray.map((char) => {
        // Conditional for maintaining non-coded characters //
        if (!codedAlphabet.some((number) => number === char))
          return char;
        // Conditional for 42 equaling i or j //
        if (char === "42") return "(i/j)";
        // Decode via array index //
        let numberIndex = codedAlphabet.findIndex((number) => number === char);
        const decodedLetter = alphabet[numberIndex];
        return decodedLetter;
      });
      // Return string of decoded array //
      return decodedArray.join("");
    }
    
    // Code array via map //
    const codedArray = inputArray.map((char) => {
      // Conditional for maintaining non-alphabet characters //
      if (!alphabet.some((letter) => letter === char.toLowerCase()))
        return char;
      // Code via array index //
      let letterIndex = alphabet.findIndex(
        (letter) => letter === char.toLowerCase()
      );
      const codedLetter = codedAlphabet[letterIndex];
      return codedLetter;
      });
     
    // Test if valid coded message //
    const numbersOnly = codedArray.filter((index) => numbers.some((number) => number === index));
    if(numbersOnly.length&1===1) return false;
    // Return string of coded message //
    return codedArray.join("");
  }
  return {
    polybius,
  };
})();

module.exports = polybiusModule.polybius;
