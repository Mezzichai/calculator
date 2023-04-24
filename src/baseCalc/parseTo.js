function parseToInt(input) {
    if (typeof input === "object" && input !== null) {
      for (let key in input) {
        if (typeof input[key] === "string") {
          input[key] = parseFloat(input[key], 10);
        }
      }
      return input;
    } else {
      return parseFloat(input, 10);
    }
  }

    export default parseToInt