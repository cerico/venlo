const dontCapitalize = ["and", "the", "from", "to", "with", "is", "of", "in", "a", "an", "for", "by", "on", "at"];

const capitalizeTitle = (title) => {
  const words = title.split(" ");
  const capitalizedWords = words.map((word, index) => (dontCapitalize.includes(word.toLowerCase()) && index !== 0) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return capitalizedWords.join(" ");
}

export { capitalizeTitle }
