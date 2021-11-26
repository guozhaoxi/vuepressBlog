# 使用antd来美化我们的界面样式
[antd](https://ant.design/docs/react/introduce-cn)是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

### 引入antd
```js
yarn add antd
```

修改src/index.tsx
```tsx
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadDevTools } from "jira-dev-tool";
import { AppProviders } from "context";

loadDevTools(() =>
    ReactDOM.render(
        <React.StrictMode>
            <AppProviders>
                <App />
            </AppProviders>
        </React.StrictMode>,
        document.getElementById("root")
    )
);

reportWebVitals();
```

有些时候我们想对antd的主题进行配置，这个时候我们就要用到一个工具叫[craco](https://github.com/gsoft-inc/craco)

```js
yarn add @craco/craco
```

在根目录下新建craco.config.js
```js
const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": "rgb(0, 82, 204)",
                            "@font-size-base": "16px",
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
```

```js
yarn add craco-less
```

我们如何在react项目中使用css-in-js的解决方案呢？这里我们使用的是emotion，也是一个比较成熟的解决方案。

```js
yarn add @emotion/react @emotion/styled
```

我们在页面内就可以这样来改我们的样式了
```tsx
const Header = styled.header`
    width: 100%;
    background: url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
`;
```

有时候我们需要在antd组件的基础上对他们进行一些修改
```tsx
const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    text-align: center;
`;
```