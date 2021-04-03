module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: process.env.BACKEND,
        changeOrigin: true
      }
    }
  }
}

