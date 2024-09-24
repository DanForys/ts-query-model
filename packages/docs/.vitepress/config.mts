import { defineConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ts-query-model",
  description: "API documentation for the ts-query-model NPM module",
  markdown: {
    codeTransformers: [
      transformerTwoslash() 
    ]
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Defining columns', link: '/columns/concepts' },
      { text: 'Model API', link: '/models/concepts' }
    ],

    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'About', link: '/about' },
          { text: 'Installation', link: '/installation' },
          { text: 'Configuration', link: '/configuration' },
          { text: 'Querying', link: '/querying' }
        ]
      },
      {
        text: 'Database columns',
        items: [
          { text: 'Defining columns', link: '/columns/concepts' },
          { text: 'Column sets', link: '/columns/columnSets' },
          { text: 'Column types', items: [
            { text: 'booleanIntColumn', link: '/columns/booleanIntColumn' },
            { text: 'dateColumn', link: '/columns/dateColumn' },
            { text: 'enumColumn', link: '/columns/enumColumn' },
            { text: 'jsonStringColumn', link: '/columns/jsonStringColumn' },
            { text: 'numberColumn', link: '/columns/numberColumn' },
            { text: 'stringColumn', link: '/columns/stringColumn' },
          ]}
        ]
      },
      {
        text: 'Creating models',
        items: [
          { text: 'Model API', link: '/models/concepts' },
          { text: 'Model factory methods', items: [
            { text: 'insert()', link: '/models/insert' },
            { text: 'getOne()', link: '/models/getOne' },
            { text: 'getMany()', link: '/models/getMany' },
            { text: 'getColumn()', link: '/models/getColumn' },
            { text: 'getValue()', link: '/models/getValue' },
            { text: 'write()', link: '/models/write' },
          ]}
        ]
      },
      {
        items: [
          { text: 'Changelog', link: '/CHANGELOG' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DanForys/ts-query-model' }
    ]
  }
})
