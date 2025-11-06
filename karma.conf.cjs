module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    
    // Esta sección es la más importante.
    // Le dice a Karma que cargue 'setupTests.js' PRIMERO.
    files: [
      'src/test/setupTests.js',
      'src/test/**/*.spec.jsx'
    ],
    
    preprocessors: {
      // Ambos deben ser procesados por Webpack.
      'src/test/setupTests.js': ['webpack'],
      'src/test/**/*.spec.jsx': ['webpack']
    },
    
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      },
    },
    
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};