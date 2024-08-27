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
      { text: 'Column setup', link: '/columns/concepts' },
      { text: 'Model setup', link: '/models/concepts' }
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
        text: 'Defining columns',
        items: [
          { text: 'Columns concepts', link: '/columns/concepts' },
          { text: 'Column types', collapsed: true, items: [
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
          { text: 'Model concepts', link: '/models/concepts' },
          { text: 'Model factory methods', collapsed: true, items: [
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
