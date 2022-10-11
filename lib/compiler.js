const fs = require("fs");
const path = require("path");
const { getAST, getDependencis, transform } = require('./parser');

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    // 所有模块
    this.modules = [];
  }

  run() {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);
    // 遍历所有依赖
    this.modules.map((_module) => {
      _module.dependencis.map((dependency) => {
        this.modules.push(this.buildModule(dependency, false));
      });
    });
    // 输出代码
    this.emitFiles();
  }

  // 获取抽象语法树
  buildModule(filename, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAST(filename);
    } else {
      let absolutePath = path.join(process.cwd(), './src', filename);
      ast = getAST(absolutePath);
    }
    return {
      filename,
      dependencis: getDependencis(ast), // 所有依赖
      transformCode: transform(ast) // ast -> 代码
    }
  }

  // 输出代码
  emitFiles() {
    const outputpath = path.join(this.output.path, this.output.filename);
    let modules = '';
    // 组装模块 { 文件名 : 函数(代码) }
    this.modules.map((_module) => {
      modules += `'${ _module.filename }' : function (require, module, exports) { ${_module.transformCode} },`
    });

    // 组装输出（用自执行函数包裹）
    const bundle = `
    (function(modules) {
      function require(fileName) {
        const fn = modules[fileName];
        const module = { exports: {} };
        fn(require, module, module.exports);
        return module.exports;
      }
      require('${this.entry}');
    })({${modules}})
    `;

    fs.writeFileSync(outputpath, bundle, 'utf-8');
    // console.log("输出", modules);
  }
}