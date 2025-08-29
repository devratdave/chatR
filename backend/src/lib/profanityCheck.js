import { Filter } from "bad-words";

const customBadWords = process.env.PROFANITY_WORDS?.split(",") || [];

// Set up filter
const filter = new Filter();
filter.addWords(...customBadWords);

function containsProfanity(str) {
  str = str.toLowerCase().trim(); // Normalize
  const words = str.split(/\s+/); // Split by whitespace
  return words.some(word => filter.isProfane(word));
}

export default containsProfanity;
