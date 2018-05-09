const ExtractTextPlugin = require(`extract-text-webpack-plugin`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const path = require(`path`);


const BABEL_LOADER = {
  loader: `babel-loader`,
  options: {
    presets: [`env`],
  },
};
const STYLUS_LOADERS = [
  {loader: `css-loader`},
  {loader: `postcss-loader`},
  {loader: `stylus-loader`},
];

const webpackConfig = {
  entry: {
    farm: `./src/index.js`,
  },
  output: {
    path: path.join(__dirname, `build`),
    filename: `[name].bundle.js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          BABEL_LOADER,
        ],
      },
      {
        test: /\.jade$/,
        exclude: /node_modules/,
        use: [
          BABEL_LOADER,
          {
            loader: `virtual-jade-loader`,
            options: {
              vdom: `snabbdom`,
              runtime: `var h = require("panel").h;`,
            },
          },
        ],
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /inline/,
            loader: STYLUS_LOADERS,
          },
          {
            loader: ExtractTextPlugin.extract({
              use: STYLUS_LOADERS,
              fallback: `style-loader`,
            }),
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin(`[name].bundle.css`),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: 'index.template.html',
    }),
  ],
};

module.exports = webpackConfig;
