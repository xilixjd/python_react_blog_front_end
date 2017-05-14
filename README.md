# xilixjd's blog
[xjd的博客](http://www.xilixjd.cc)

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
$ cd python_react_blog_front_end
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
- socketio
- es6

## 日志更新

### v0.1 基本功能实现

#### 登录，注册，评论，markdown 显示博文

### v0.2 bug 修复，完成搜索功能

#### page 页面的前进后退

## todo
SEO 服务端渲染
