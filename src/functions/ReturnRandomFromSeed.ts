/**
 * Returns a deterministic "random" element from the given options based on a seed string.
 * The same seed and options will always produce the same result.
 *
 * @param {string} seed - The seed string used to generate a pseudo-random index.
 * @param {T[]} options - An array of options to select from.
 * @returns {T} - The selected option from the array based on the seed.
 * @throws {Error} If the options array is empty.
 */
export function returnRandomFromSeed(seed: string, options: any[]): any {
  if (options.length === 0) {
    throw new Error("Options array must not be empty.");
  }

  const index = _hashStringToNumber(seed) % options.length;
  return options[index];
}

/**
 * Hashes a string into a positive integer using a basic hashing algorithm.
 *
 * @param {string} str - The string to hash.
 * @returns {number} - A non-negative integer hash of the input string.
 */
function _hashStringToNumber(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}
