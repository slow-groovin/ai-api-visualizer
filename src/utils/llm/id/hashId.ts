/**
 * Hash ID utilities
 * Simple hash generation for component IDs
 */

/**
 * Generate a simple hash from a string
 * @param str Input string
 * @returns Hash number
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Generate a hash-based ID
 * @param input Input string or object
 * @returns Unique ID string
 */
export function hashId(input: string | object): string {
  const str = typeof input === 'string' ? input : JSON.stringify(input);
  const hash = simpleHash(str);
  return `id-${hash.toString(36)}`;
}

/**
 * Generate a short random ID
 * @returns Random ID string
 */
export function shortId(): string {
  return Math.random().toString(36).substring(2, 10);
}
