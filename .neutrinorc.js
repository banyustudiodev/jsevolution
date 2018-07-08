module.exports = {
  use: [
    '@neutrinojs/airbnb-base',
    [
      '@neutrinojs/library',
      {
        name: 'jsevolution',
        babel: {
          presets: [
            ['babel-preset-env', {
              targets: {
                'node': 'current'
              }
            }]
          ]
        }
      }
    ],
    '@neutrinojs/jest'
  ]
};
