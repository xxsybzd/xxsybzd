module.exports = {
  publicPath: './',
    devServer: {
      proxy: {
        '/api': {
          target: 'https://www.kuaikanmanhua.com',//漫画
          // target:"https://api.zhuishushenqi.com",//小说
          changeOrigin: true,
          pathRewrite:{  // 路径重写，
            '^/api': ''  
          }
        },
        },
  }
}