const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9081,
    proxy: {
      '^/eatcoin-api': {
        target: 'http://54.90.208.39:3000',
        // target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
