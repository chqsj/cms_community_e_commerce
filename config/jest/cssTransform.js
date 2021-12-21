

// 这是一个自定义Jest转换器，用于将样式导入转换为空对象。
// http://facebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
  process () {
    return 'module.exports = {};';
  },
  getCacheKey () {
    // 保持输出一致
    return 'cssTransform';
  },
};
