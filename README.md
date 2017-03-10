# xilixjd's blog

## 环境搭建

### 运行环境

- [node.js@5.8.0](https://nodejs.org)

```bash
$ node -v
v5.8.0

$ npm -v
3.7.3
```


### 依赖

- webpack@1.13.2

```bash
$ npm install -g webpack@1.13.2
```

## 命令使用

### 安装

``` bash
$ cd cobish.github.io
$ npm install
```

### 运行

``` js
"scripts": {
  "dev": "cross-env NODE_ENV=development webpack-dev-server --hot --inline",
  "build": "cross-env NODE_ENV=production webpack"
},
```

#### 命令

``` bash
// 开发
$ npm run dev

// 打包
$ npm run build
```

## 技术栈

- react@15.3.1
- react-router@15.3.1
- redux@3.6.0
- webpack@1.13.2
- es6

## 浏览器兼容

- Chrome
- Firefox
- Safari
- IE10+

## 日志更新

v0.1 基本功能实现（登录，注册，评论，markdown 显示博文）
