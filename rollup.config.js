import babel from 'rollup-plugin-babel';
let pack = require('./package.json');
let external = Object.keys(pack.dependencies);

export default {
  entry: 'src/index.js',
  plugins: [babel()],
  external: external,
  targets: [
    {
      dest: 'dist/bundle.js',
      format: 'cjs',
      moduleName: 'html',
      sourceMap: true
    },
    {
      dest: 'dist/bundle.es.js',
      format: 'es',
      sourceMap: true
    }
  ]
};
/*export default {
  entry: 'src/index.js',
  format: 'cjs',
  plugins: [ babel() ],
  dest: 'dist/bundle.js' // equivalent to --output
};*/
