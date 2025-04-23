/**
 * Modifies all <a> tags in the given HTML string to open in a new tab.
 *
 * Adds `target="_blank"` and `rel="noopener noreferrer"` to each link
 * for security and usability.
 *
 * @param html - The raw HTML string to process.
 * @returns The modified HTML string with updated anchor tags.
 */
export function modifyAnchorTags(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;

  const links = div.querySelectorAll("a");
  links.forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  return div.innerHTML;
}
