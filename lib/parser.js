const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core')

module.exports = {
  // 文件内容 -> 抽象语法树 
  getAST: (path) => {
    const content = fs.readFileSync(path, 'utf-8');

    return babylon.parse(content, {
      sourceType: 'module'
    });
  },
  // 获取依赖
  getDependencis: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      }
    });
    return dependencies;
  },
  // ast -> es5
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['env']
    });
    return code;
  }
}