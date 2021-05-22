const autoprefixer = require('autoprefixer');
const atImport = require('postcss-import');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    atImport,
    cssnano({ preset: 'default'}),
  ]
}
