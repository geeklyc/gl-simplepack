/*
 * @Description: 
 * @Author: liyoucheng
 * @Date: 2022-10-11 09:57:59
 * @LastEditTime: 2022-10-11 09:59:09
 * @LastEditors: liyoucheng
 */
const Compiler = require('./../lib/compiler')
const options = require('./../simplepack.config');

(new Compiler(options)).run();