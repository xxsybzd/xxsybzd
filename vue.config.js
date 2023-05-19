module.exports = {
  publicPath: './',
    devServer: {
      host:'192.168.31.70',
      prot:9999,
      proxy: {
        '/api': {
          target: 'https://www.kuaikanmanhua.com',//漫画
          // target:"https://api.zhuishushenqi.com",//小说
          changeOrigin: true,
          pathRewrite:{  // 路径重写，
            '^/api': ''  
          }
        },
        '/m': {
          target: 'https://m.kuaikanmanhua.com',//漫画
          // target:"https://api.zhuishushenqi.com",//小说
          changeOrigin: true,
          pathRewrite:{  // 路径重写，
            '^/api': ''  
          }
        },
        },
  }
}