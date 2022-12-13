const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9081,
    proxy: {
      '^/eatcoin-api/histories': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
