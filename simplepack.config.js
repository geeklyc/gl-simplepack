/*
 * @Description: 
 * @Author: liyoucheng
 * @Date: 2022-10-11 09:11:25
 * @LastEditTime: 2022-10-11 09:15:33
 * @LastEditors: liyoucheng
 */
'use strict'

const path = require('path');

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js'
  }
}