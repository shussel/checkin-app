const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'checkin.shanesadventure.com',
    port: 8080,
    https: {
      key: fs.readFileSync('./certs/checkin.shanesadventure.com+3-key.pem'),
      cert: fs.readFileSync('./certs/checkin.shanesadventure.com+3.pem'),
      //ca: fs.readFileSync('./certs/my-ca.crt')
    },
    allowedHosts: "all",
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
    }
  }
})
