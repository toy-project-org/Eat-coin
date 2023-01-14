const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve('../server/public'),
  devServer: {
    port: 9081,
    proxy: {
      '^/eatcoin-api': {
        target: 'http://54.90.208.39:3000',
        changeOrigin: true,
      },
    },
  },
});
