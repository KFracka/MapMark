const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
  config.plugins.push(
    new CopyWebpackPlugin([{ from: 'public', to: 'public' }])
  );

  return config;
};