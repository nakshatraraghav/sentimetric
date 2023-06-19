export function textSimilarityErrors(number: number) {
  return {
    required_error: `ERROR(Missing): text-${number} is required for text similarity`,
    invalid_type: `ERROR(Invalid Type): text-${number} should be of the string data type`,
    min_length: `ERROR(Invalid Length): text-${number} should be longer than 2 Characters`,
    max_length: `ERROR(Invalid Length): text-${number} cannot be longer than 5 Characters`,
  };
}

export const sentimentErrors = {
  required_error: `ERROR(Missing): text is required for text sentiment analysis`,
  invalid_type: `ERROR(Invalid Type): text should be of the string data type`,
  min_length: `ERROR(Invalid Length): text should be longer than 10 Characters`,
  max_length: `ERROR(Invalid Length): text cannot be longer than 1000 Characters`,
};

export function phoneticMatchingErrors(number: number) {
  return {
    required_error: `ERROR(Missing): word-${number} is required for text similarity`,
    invalid_type: `ERROR(Invalid Type): word-${number} should be of the string data type`,
    min_length: `ERROR(Invalid Length): word-${number} should be longer than 10 Characters`,
    max_length: `ERROR(Invalid Length): word-${number} cannot be longer than 1000 Characters`,
  };
}
