module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = "Iterations";
            args[0].description = "Iterate versions of your drawing";
            args[0].keywords = "paint, drawing, iterations";
            return (
              args
            )
        })
  }
}
