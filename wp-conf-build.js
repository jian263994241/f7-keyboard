const path = require('path');

module.exports = {
  entry: {
    'index': './src/index.js'
  },

  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryExport: "default" ,
    libraryTarget: "umd"
  },

  module: {
    rules: [
      webpack.preset.cssRule({modules: true, sourceMap: false,hmr: false}),
      webpack.preset.babelRule()
    ]
  },
  externals: ['react', 'react-dom', 'prop-types', 'rc-mounter', 'react-motion'],
  plugins:[
    new webpack.CleanWebpackPlugin(['dist'])
  ]
}
