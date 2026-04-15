# 项目编码规范

本文档定义 ChatWidget 项目的编码约定和架构规则。所有参与开发的人员和 AI 工具均需遵守。

## 技术约束

- 使用 **React 18** + **JSX**，不使用 TypeScript
- 使用 **Tailwind CSS v4**，不使用 CSS Modules 或 styled-components
- 使用 **pnpm** 作为包管理器
- 使用 **Vite** 作为构建工具
- UI 基础组件优先使用 **shadcn/ui**

## 目录职责

### `src/pages/`
- 页面级组件，每个页面一个文件夹，入口为 `index.jsx`
- 职责：连接 Zustand store、处理路由逻辑、编排子组件
- 可以直接使用 `useChatStore`、`useNavigate`、`useParams` 等

### `src/components/chat/`
- ChatWidget 的内部组件，纯 UI 层
- 通过 **props** 接收数据和回调，不直接依赖 store 或 router
- 例外：`HistoryPanel` 等少数组件因历史原因内部使用了 store 和 router，后续有机会应逐步提纯

### `src/components/ui/`
- shadcn/ui 生成的基础组件，一般不手动修改
- 如需调整样式，在组件的 className 中修改而非改动 ui/ 源文件

### `src/components/dev/`
- 开发调试工具，不随产品交付
- 如 `ResizableContainer`（拖拽手柄模拟容器尺寸）

### `src/stores/`
- Zustand 全局状态
- Store 命名：`use*Store`（如 `useChatStore`）
- 组件中不直接调用 `set()`，所有状态变更通过 store 暴露的 action 方法

### `src/lib/`
- 工具函数和数据层
- `mock-responses.js` 后续将被真实 API 调用替换

## 组件规范

### 命名
- 组件使用 **PascalCase**：`ChatHeader`、`MessageList`
- 文件名与组件名一致：`ChatHeader.jsx` 导出 `ChatHeader`
- 页面入口文件统一命名 `index.jsx`

### Props 优先
- 组件通过 props 接收数据，保持可测试性和可复用性
- 避免在深层组件中直接读取全局状态

### 导出方式
- 每个组件文件使用 `export default`

## 样式规范

- 使用 Tailwind 类名，不写内联 `style`（dev 工具除外）
- 弹窗类组件（DropdownMenu、Tooltip 等）使用白底 + 柔和阴影，不使用黑色边框
- ChatWidget 使用 `w-full h-full` 自适应外层容器，禁止写死宽高
- 最小尺寸保护：`min-w-[320px] min-h-[480px]`

## Import 顺序

按以下分组排列，组间空一行：

1. React / 三方库（`react`、`react-router-dom`、`lucide-react` 等）
2. `@/` 别名路径（`@/components/...`、`@/stores/...`、`@/lib/...`）
3. 相对路径（`./`、`../`）

## 状态管理

- 全局状态使用 **Zustand**，不使用 React Context 做状态管理
- 在 pages 层调用 store，将数据通过 props 传给 components
- 需要在组件外访问状态时使用 `useChatStore.getState()`

## 路由

- 路由配置集中在 `App.jsx`
- 页面组件不处理路由配置，只处理当前路由的参数（`useParams`）和导航（`useNavigate`）
- 路由路径：`/`（起始页）、`/chat/:id`（聊天）、`/history`（历史记录）

## 新增功能指引

1. **新增页面**：在 `src/pages/` 下新建文件夹 + `index.jsx`，在 `App.jsx` 注册路由
2. **新增 ChatWidget 内部组件**：放在 `src/components/chat/` 对应子文件夹下
3. **新增全局状态**：在 `src/stores/` 下新建 store 文件
4. **对接真实接口**：替换 `stores/chat-store.js` 中的 `sendMessage` 方法和 `lib/mock-responses.js`，组件层无需改动
