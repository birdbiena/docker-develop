# ECAS 前端开发文档

![NodeJS](https://img.shields.io/badge/Node.js-6.12.2-green.svg)
![npm](https://img.shields.io/badge/npm-3.10.10-blue.svg)
![AngularJS](https://img.shields.io/badge/AngularJS-1.6.8-green.svg)
![webpack](https://img.shields.io/badge/webpack-4.x-green.svg)

> 该项目通过使用[AngularJS 1.6.8](https://code.angularjs.org/1.6.8/docs/api)为基础框架，实现ECAS业务功能开发。项目中使用的相关组件参考package.json文件中"depenencies"中的依赖。全部业务功能开发使用HTML、CSS、Javascript实现，路由功能由前端组件实现SPA([ui.router](https://ui-router.github.io/ng1/))，代码书写参考[ES2015](https://www.w3schools.com/js/js_es6.asp)相关规范，本地调试使用Gulp结合JSPM完成"开发"和"生产"等模式的支持。项目开发中严格按照[AngularJS](https://github.com/Gillespie59/eslint-plugin-angular)、[Airbnb](https://github.com/airbnb/javascript)推荐规范执行，由于我们的基础框架使用AngularJS，所以我们同样引用"[John Papa](https://github.com/johnpapa)"定制的[AngularJS 1.x风格指南](https://github.com/johnpapa/angular-styleguide/blob/master/a1/i18n/zh-CN.md)来规范通过AngularJS框架开发的业务代码。同样我们在ECAS项目中，使用了Javascript新的标准[ES2015](https://www.w3schools.com/js/js_es6.asp)，这样对于"[John Papa](https://github.com/johnpapa)"定制的[AngularJS 1.x风格指南](https://github.com/johnpapa/angular-styleguide/blob/master/a1/i18n/zh-CN.md)插件有部分内容是不符合新标准的，但是大部分AngularJS 1.x的规范对我们是依然有效（有工具提示功能），我们保留了对我们项目规范中有益的部分规则，并且参考了AngularJS 1.x关于ES2015的最新标准，详见：[AngularJS 1.x风格指南（ES2015）](https://github.com/toddmotto/angularjs-styleguide/blob/master/i18n/zh-cn.md)，关于[Todd Motto](https://github.com/toddmotto)文档也是以[John Papa](https://github.com/johnpapa)的文档规范为基础，所以两者并不冲突。

>> 关于Eslint的前端代码验证问题，首先开发人员应通过前端开发工具配置项目中已有Eslint验证规则（.eslintrc）文件，在代码编辑的过程中即可通过开发工具自动验证代码的规范及风格，后续文档中会说明前端团队开发工具具体的配置方法。其次，开发人员在代码提交之前，应手动在本地执行Eslint代码验证来确定提交代码是符合验证规范。

---

## 项目相关技术栈

- 开发工具：[Visual Studio Code](https://code.visualstudio.com/)
- 项目管理工具：[JIRA](https://easystack.atlassian.net/)
- 设计工具：[蓝湖](https://lanhuapp.com/)
- Review：[Gerrit](https://review.easystack.cn/)
- 前端技术栈：[AngularJS](https://angularjs.org/)、[Bottstrap](https://angular-ui.github.io/bootstrap/)、[JSPM](https://jspm.io/)、[Webpack](https://webpack.js.org)、[Eslint](https://eslint.org/)、[Gulp](https://gulpjs.com/) 等
- 后端技术栈：[Django](https://www.djangoproject.com/) 等

---

## 环境部署

### 原码下载
```bash
git clone ssh://\<your name>@review.easystack.cn:29418/easystack/roller-dashboard
git branch -b stable/5.0 v5.0
cd roller_dashboard
```

### 搭建后端开发环境
```bash
cd roller_dashboard

// 安装虚拟环境
virtualenv .venv

// 进入虚拟环境
source .venv/bin/activate

// 安装roller-dashboard依赖
pip install -r requirements.txt

// 启动服务
python manage.py runserver 0.0.0.0:8888
```

### 搭建前端开发环境
> 目前使用的nodeJS是公司多个项目中统一版本，如果没有特别问题不建议升级或更新。

```bash
curl -sSL -o /tmp/nodejs.tar.gz http://fs.easystack.cn/node-v6.12.2-linux-x64.tar.gz
tar xvf /tmp/nodejs.tar.gz -C /opt/
rm -f /tmp/nodejs.tar.gz
sudo ln -s /opt/node-v6.12.2-linux-x64/bin/node /usr/bin/node
sudo ln -s /opt/node-v6.12.2-linux-x64/bin/npm /usr/bin/npm

node -v
6.12.2

npm -v
3.10.10
```

### 安装前端项目依赖包
```bash
cd roller

// 安装项目依赖
npm install

// 启动调试服务
gulp serve

// 构建项目代码
gulp build
```

### 接口环境配置
> 添加可用Keystone地址

```bash
sudo vim /etc/hosts

// IP地址随服务器运行地址更换
172.16.7.176 keystone.openstack.svc.cluster.local
```

### 本地代理环境
> 创建 /etc/roller/client/config.yaml

```yaml
SERVER_ADDRESS: "172.16.7.176" // "KeyStone地址，如：192.168.x.x"
SERVER_PORT: "8001"
KEYSTONE_USER: "coaster"
KEYSTONE_PASS: "password"
KEYSTONE_PORT: "80"
KEYSTONE_ADDRESS: "keystone.openstack.svc.cluster.local" // "KeyStone地址，如：192.168.x.x"
```

---

## ECAS前端目录
```bash
├── build (构建项目文件)
├── src (渲染进程代码目录)
│   ├── app (项目目录)
│   │   ├── common (通用组件库)
│   │   │   ├── components (组件库)
│   │   │   │   ├── components.scss (组件库样式引用汇总)
│   │   │   │   └── index.js (组件引用汇总)
│   │   │   ├── directives (页面控件)
│   │   │   ├── filters (过滤器)
│   │   │   ├── services (服务及工厂)
│   │   │   └── index.js
│   │   ├── config (项目入口配置)
│   │   ├── dashboard (业务功能)
│   │   │   ├── components (业务组件)
│   │   │   │   ├── components.scss (业务组件样式引用汇总)
│   │   │   │   └── index.js (业务组件引用汇总)
│   │   │   ├── environment (环境单例)
│   │   │   ├── environments (环境复数)
│   │   │   ├── expansion (扩容)
│   │   │   ├── hosts (高可用)
│   │   │   ├── migrate (迁移)
│   │   │   ├── dashboard.js (业务功能引用入口)
│   │   │   └── translations.js (业务功能翻译)
│   ├── assets (资源文件目录)
│   ├── public
│   ├── index.html (渲染进程入口)
│   └── routes.json (路由配置文件)
├── gulpfile.js (Gulp入口)
├── karma.conf.js (Karma配置)
├── system.config.js (systemJS 配置)
├── package.json (项目信息)
├── README.md
├── .babelrc (babel配置)
├── .editorconfig (项目格式配置)
├── .eslintignore (Eslint验证配置)
├── .eslintrc (Eslint规则配置)
└── .gitignore
```
> 开发中应遵循上述目录结构，公共组件应放在项目目录的common目录内统一文件结构，业务组件应在dashboard目录中进行管理，项目入口配置文件在config文件夹中集中管理，比如子路由配置、路由拦截器、启动执行功能。SCSS文件组织方式应由统一的一个业务一个样式文件，在父业务样式文件中引入子业务的样式文件，不单独在各自的模块JS文件里进行分别引入。

---

## 前端开发工具 / Development Tools

### VS Code 必装插件

- Beautify (前端代码美化)
- Eslint (前端代码规范工具)
- EditorConfig for VS Code (项目标准化工具)
- Javascript(ES2015) code snippets (ES2015代码片段)
- PathIntellisense (路径提示)
- Prettier-Code formatter (格式化代码)
- HTML CSS Support (HTML、CSS提示)
- Auto Close Tag (标签自动闭合)

---

## Liense
Copyright (c) Easystack Corporation. All rights reserved.