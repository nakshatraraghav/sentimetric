import natural from "natural";
import logger from "../../libs/logger";

export function textSimilarity(text1: string, text2: string) {
  try {
    const similarity = natural.JaroWinklerDistance(text1, text2, {
      ignoreCase: false,
    });

    return similarity;
  } catch (error: any) {
    logger.error(error.message);
    return null;
  }
}

export function calculateTextSentiment(text: string) {
  try {
    const tokenizer = new natural.WordTokenizer();

    const tokens = tokenizer.tokenize(text);

    if (!tokens) {
      return null;
    }

    const stemmer = natural.PorterStemmer;

    const analyzer = new natural.SentimentAnalyzer("English", stemmer, "afinn");

    const sentiment = analyzer.getSentiment(tokens);

    return sentiment;
  } catch (error: any) {
    logger.error(error.message);
    return null;
  }
}

export async function phoneticMatching(worda: string, wordb: string) {
  const metaphone = natural.DoubleMetaphone;

  const match = metaphone.compare(worda.split(" ")[0], wordb.split(" ")[0]);

  return match;
}
