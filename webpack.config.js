const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './routes'),
    filename: 'index.js'
  },
  mode: "none"
};