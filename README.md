# rehype-mdx-export-headings
A rehype plugin to extract headings (e.g. h2, h3) from mdx, assign them ids, and export headings list

## Installation
```
# If you are using yarn
yarn add @sup39/rehype-mdx-export-headings

# If you are using npm
npm install @sup39/rehype-mdx-export-headings
```

## Configuration
|property|type|description|
|--|--|--|
|`tags`|`string[]`|Tag name of headings. Default value is `['h2']`|
|`name`|`string`|Export name. Default value is `'headings'`|

## Usage
### Next.js with MDX support
In next.config.js:
```javascript
const ExportHeadings = require('@sup39/rehype-mdx-export-headings');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [ExportHeadings],
  },
});
module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});
```

#### with options
```javascript
const ExportHeadings = require('@sup39/rehype-mdx-export-headings');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      [ExportHeadings, {
        tags: ['h2', 'h3'],
        name: 'labels',
      }],
    ],
  },
});
module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});
```

#### mjs
If you are using next.config.mjs:
```javascript
import mdx from '@next/mdx';
import ExportHeadings from '@sup39/rehype-mdx-export-headings';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      [ExportHeadings, {
        tags: ['h2', 'h3'],
        name: 'labels',
      }],
    ],
  },
});
export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});
```
