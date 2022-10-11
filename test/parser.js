/*
 * @Description: 
 * @Author: liyoucheng
 * @Date: 2022-10-11 09:20:59
 * @LastEditTime: 2022-10-11 10:34:21
 * @LastEditors: liyoucheng
 */
const path = require('path');
const { getAST, getDependencis, transform } = require('./../lib/parser');

const ast = getAST(path.join(__dirname, './../src/index.js'));
// console.log('抽象语法树', ast)
const dependencis = getDependencis(ast);
// console.log('依赖图', dependencis);
const code = transform(ast);
console.log("转换后的代码", code);