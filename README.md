# gl-simplepack
简易 webpack 实现

+ 根据文件内容生成 AST(抽象语法树)
+ 根据 AST 获取全部依赖
+ 根据 AST 转换成浏览器识别的代码
+ 使用自执行函数包括模块

```
    (function(modules) {
      function require(fileName) {
        const fn = modules[fileName];
        const module = { exports: {} };
        fn(require, module, module.exports);
        return module.exports;
      }
      require('${this.entry}');
    })({${modules}})
```
