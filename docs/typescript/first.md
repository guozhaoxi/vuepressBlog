# 搭建TS自动更新+TS自动运行+Parcel打包环境 

1. npm init -y
2. 安装 typescript 
   
   全局安装: npm i -g typescript / cnpm i -g typescript
   
   本地安装: npm i typescript -D / cnpm i typescript -D
   
   yarn global add typescript
   
3. 初始化tsconfig.json
 
   tsc --init
 
4. 改tsconfig.json中的配置

   "outDir": "./dist", ts编译后生成的js文件保存的目录
   
   "rootDir": "./src"  自己编写的ts源文件所在的目录
   
5. 编译src目录及子目录下的ts文件

   tsc 
   
   会把src及其子目录下的ts文件都编译成js文件，并全部输出到dist目录中
   
6. 安装 ts-node

   全局安装: npm install -g ts-node
   
   本地安装: npm install -D ts-node
   
   使用yarn: yarn global add ts-node
   
7. 安装nodemon

   全局安装: npm i -g nodemon
   
   本地安装: npm i -D nodemon
   
   使用yarn: yarn add nodemon
   
8. 在package.json中配置script命令

   ```js
       "scripts": {
           "dev": "nodemon --watch src/ -e ts --exec ts-node ./src/index.ts"
        }
   ```
   
9. 使用parcel打包支持浏览器运行ts文件
 
   npm install parcel-bundler --save-dev
   
   在package.json中添加脚本文件:
   
   ```js
   "scripts": {
       "start": "parcel ./index.html"
   }
   ```
   
   启动 parcel工具打包: npm run start