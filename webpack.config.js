var path = require('path');
module.exports = {
  entry: './src/index.js',
  devtool: 'cheap-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [["@babel/env", {
              targets: {
                browsers: ['last 2 versions'],
              },
              modules: false,
            }]],
            plugins: [
              "transform-object-rest-spread",
              "@babel/transform-react-jsx",
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              ["@babel/plugin-proposal-private-methods", { "loose": true }],
              ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
            ]
          }
        }
      }
    ]
  },
  externals: [
    {
      'react': 'commonjs react',
      'react-dom': 'react-dom',
      "graphql": "graphql",
      "@apollo/client": "@apollo/client",
      "@apollo/client/react/hoc": "@apollo/client/react/hoc",
      "react-router-dom": "react-router-dom",
    },
    /@mui\/.*/,
  ],
  optimization: {
    nodeEnv: false
  }
};