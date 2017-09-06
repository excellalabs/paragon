const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    Button: path.resolve('./packages/Button/index.jsx'),
    Dropdown: path.resolve('./packages/Dropdown/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, './packages'),
    filename: '[name]/dist/index.js',
    library: 'paragon',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new BabiliPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'babili'],
            },
          },
          { loader: 'source-map-loader' },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              data: '@import "paragon-reset";',
              includePaths: [
                path.join(__dirname, './packages/utils'),
              ],
            },
          },
        ],
      },
    ],
  },
  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
  {
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  {
    'react-addons-transition-group': {
      commonjs: 'react-addons-transition-group',
      commonjs2: 'react-addons-transition-group',
      amd: 'react-addons-transition-group',
      root: ['React', 'addons', 'TransitionGroup'],
    },
  },
  {
    'react-addons-css-transition-group': {
      commonjs: 'react-addons-css-transition-group',
      commonjs2: 'react-addons-css-transition-group',
      amd: 'react-addons-css-transition-group',
      root: ['React', 'addons', 'CSSTransitionGroup'],
    },
  }],
};
