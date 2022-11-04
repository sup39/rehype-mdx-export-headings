/**
 * @typedef {{
 *   tags: string[]
 *   name: string
 * }} ExportHeadingsOptions
 *
 * @typedef {{
 *   tagName: string
 *   label: string
 *   id: string
 * }} HeadingInfo
 */

/** @type {(e: import('hast').RootContent) => string[]} */
const getInnerText = e =>
  e.type === 'text' ? [e.value] :
    e.type === 'element' ? e.children.flatMap(getInnerText) : [];

/** @type {import('unified').Plugin<[Partial<ExportHeadingsOptions>?], import('hast').Root>} */
const ExportHeadings = ({
  tags = ['h2'],
  name = 'headings',
} = {}) => ({children}) => {
  /** @type {any[]} */
  const items = [];
  children.forEach(node => {
    if (node.type !== 'element' || !tags.includes(node.tagName)) return;
    const innerText = getInnerText(node).join('').trim();
    // TODO uniqueness
    const id = String(node.properties?.id || innerText.replace(/\s+/g, '-'));
    if (node.properties == null) node.properties = {id};
    else node.properties.id = id;
    // push item
    /** @type {HeadingInfo} */
    const item = {tagName: node.tagName, label: innerText, id};
    items.push({
      type: 'ObjectExpression',
      properties: Object.entries(item).map(([name, value]) => ({
        type: 'Property',
        method: false,
        shorthand: false,
        computed: false,
        key: {type: 'Identifier', name},
        value: {type: 'Literal', value},
        kind: 'init',
      })),
    });
  });

  // prepend: export const headings = [...]
  children.unshift(/**@type{import('mdast-util-mdx').MdxjsEsm}*/({
    type: 'mdxjsEsm',
    value: '',
    data: {estree: {type: 'Program', sourceType: 'module', body: [{
      type: 'ExportNamedDeclaration',
      specifiers: [],
      declaration: {
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: [{
          type: 'VariableDeclarator',
          id: {type: 'Identifier', name},
          init: {
            type: 'ArrayExpression',
            elements: items,
          },
        }],
      },
    }]}},
  }));
};
module.exports = ExportHeadings;
