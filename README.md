# ChatWidget

可嵌入各产品的独立 AI 聊天组件。外层容器尺寸由宿主产品控制，ChatWidget 自适应填充并保证最小尺寸下的排版完整性。

## 技术栈

- **构建**: Vite + pnpm
- **框架**: React 18 (JSX)
- **样式**: Tailwind CSS v4 + shadcn/ui
- **状态管理**: Zustand
- **路由**: React Router v7
- **Markdown**: react-markdown + react-syntax-highlighter
- **HTTP**: Axios + @tanstack/react-query + @microsoft/fetch-event-source (SSE)
- **动画**: Framer Motion

## 快速开始

```bash
pnpm install
pnpm dev
```

## 项目结构

```
src/
├── pages/                        # 页面级组件（路由入口，连接 store，编排子组件）
│   ├── chat/index.jsx            # 聊天页
│   └── history/index.jsx         # 历史记录页
├── components/
│   ├── chat/                     # ChatWidget 及其所有内部组件
│   │   ├── ChatWidget.jsx        # 外壳容器（w-full h-full，自适应外层）
│   │   ├── ChatHeader.jsx        # 顶栏
│   │   ├── StartScreen.jsx       # 起始页（无会话时显示）
│   │   ├── Composer.jsx          # 消息输入框
│   │   ├── ModelSelector.jsx     # 模型选择下拉
│   │   ├── message/              # 消息相关组件
│   │   │   ├── MessageList.jsx   # 消息列表（含自动滚动）
│   │   │   ├── UserMessage.jsx   # 用户消息气泡
│   │   │   ├── AssistantMessage.jsx  # AI 回复（Markdown 渲染）
│   │   │   ├── MessageActions.jsx    # 消息操作按钮（复制/点赞/重试）
│   │   │   ├── ThinkingBlock.jsx     # AI 思考过程展示
│   │   │   └── CodeBlock.jsx         # 代码块（语法高亮 + 复制）
│   │   └── history/              # 历史记录相关组件
│   │       ├── HistoryPanel.jsx  # 历史列表（日期分组）
│   │       └── HistoryItem.jsx   # 单条历史项（三点菜单）
│   ├── dev/                      # 开发调试工具（不随产品交付）
│   │   └── ResizableContainer.jsx    # 拖拽手柄，模拟不同容器尺寸
│   └── ui/                       # shadcn/ui 基础组件
├── stores/
│   └── chat-store.js             # Zustand 全局状态（多会话 + 流式输出）
├── lib/
│   ├── utils.js                  # 工具函数（cn 类名合并）
│   └── mock-responses.js         # Mock 数据（开发阶段，后续替换为真实接口）
├── App.jsx                       # 路由表 + 全局 Provider
└── main.jsx                      # 入口
```

## 架构要点

### ChatWidget 自适应

ChatWidget 使用 `w-full h-full` 填充外层容器，自身设定 `min-w-[320px] min-h-[480px]` 保底。宿主产品只需控制外层容器尺寸，ChatWidget 内部弹性布局自动适配。

开发阶段通过 `ResizableContainer`（左/右/下三个拖拽手柄）模拟不同容器尺寸。

### 状态管理

使用 Zustand 管理多会话状态。Store 结构：

```
sessions: { [id]: { id, title, messages[], createdAt } }
activeSessionId: string | null
isThinking / isStreaming: boolean
```

### 数据流

```
pages（连接 store + 路由）→ components（通过 props 接收数据，纯 UI）
```

### Mock → 真实接口

当前所有 AI 回复由 `lib/mock-responses.js` 提供，流式输出通过定时器模拟。后续对接真实接口时，只需替换 `stores/chat-store.js` 中的 `sendMessage` 方法，组件层无需改动。
