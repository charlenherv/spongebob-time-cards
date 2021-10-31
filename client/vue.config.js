module.exports = { 
    devServer: {
        proxy: "http://localhost:5000"
    },
    css: {
        sourceMap: true,
        loaderOptions: {
            sass: {
                //prependData: `@import "~@/scss/_variables.scss";`
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
      }
  };  