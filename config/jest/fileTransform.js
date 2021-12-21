

const path = require('path');

// 这是一个自定义Jest转换器，将文件导入转换为文件名
// http://facebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
  process (src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
