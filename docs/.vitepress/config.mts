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
      { text: 'Examples', link: '/markdown-examples' }
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
          { text: 'Columns concepts', link: '/' },
          { text: 'Column types', collapsed: true, items: [
            { text: 'booleanIntColumn', link: '/columns/booleanIntColumn' },
            { text: 'dateColumn', link: '/columns/dateColumn' },
            { text: 'enumColumn', link: '/columns/enumColumn' },
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
