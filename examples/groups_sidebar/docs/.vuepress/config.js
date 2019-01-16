const path = require('path')
module.exports = {
  title: 'Vue Kawaii',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/' },
      { text: 'Github', link: 'https://github.com/youngtailors/vue-kawaii' }
    ],
    sidebar: {
        '/guide/': [
            "",
            "getting-started", 
            {
              title: "OK",
              collapsable: false,
              children: [
                ""
              ]
            }
        ],
    }
  },
  plugins: [
    [
      require("../.../../../../../dist/index.js"),
      {
        rootDir: path.join(__dirname, '../../../components'),
      },
    ],
  ],
}
