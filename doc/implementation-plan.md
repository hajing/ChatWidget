# Thaleon AI Assistant Demo - Implementation Plan

## Context

Thaleon (thaleon.io) 是马来西亚基金投顾 Web 应用，目前集成了 OpenAI ChatKit 作为单向 AI 聊天助手。本项目目标是用 ChatWidget 做一个前端 mock demo，展示"真正的 AI Assistant"——能够驱动主界面、执行任务、实时联动，用以惊艳投资顾问客户。

**当前状态**：独立居中的 ChatWidget (448×820px)，含 Background3D + ResizableContainer，5 个通用 starter prompts，单一 Zustand store 管理聊天 session/消息/流式模拟。

**目标状态**：全屏两栏布局 — Main Stage (75% 左侧, Thaleon 系统页面) + Dispatcher (25% 右侧, ChatWidget)。5 个场景驱动两栏联动。纯前端 mock，无真实后端。

---

## 5 个 Demo 场景

| # | 场景 | Main Stage 行为 | ChatWidget 行为 | 交互模式 |
|---|------|----------------|-----------------|---------|
| 1 | 马来西亚金融新闻 + 美伊战争影响 | 弹出 Playground → loading → 新闻+分析 | web search → 思考 → 流式输出 → Done | Playground 弹窗 |
| 2 | 分析 Hector 的 Green Energy 组合 + PDF | 导航到组合详情页 | web search → 思考 → 流式输出分析+建议 → PDF 下载 | 页面导航 + 导出 |
| 3 | 找跌幅>10%客户 + 发安抚邮件 | 客户列表页高亮筛选 | 思考 → 分析 → 邮件发送进度(todo 打勾) → 完成 | 批量操作 + 进度 |
| 4 | 为 Hector 创建投资组合 (AAPL/GOOGL/AMZN) | 导航到组合列表页 → 刷新出新组合 | 思考 → 分析 → 创建中 → 完成 | 创建实体 + 刷新 |
| 5 | 比较两个基金表现 | 弹出 Playground → loading → 对比图表 | web search → 思考 → 流式输出对比总结 | Playground 图表 |

---

## 架构设计

### 布局变更

```
当前: Background3D + centered ResizableContainer > ChatWidget > Routes
目标: 全屏 flex-row → MainStage (w-3/4) + ChatWidget (w-1/4, border-l)
```

### 状态管理 (双 Store)

```
useStageStore (新建)          useChatStore (扩展)
├─ currentView               ├─ sessions, activeSessionId
├─ viewParams                ├─ isThinking, isStreaming
├─ playground { isOpen,      ├─ isScenarioRunning    ← 新增
│   isLoading, content }     ├─ runScenario()        ← 新增
├─ pendingUpdates            ├─ sendMessage()        (保留)
├─ navigate()                └─ abortController      ← 新增
├─ openPlayground()
├─ updatePlayground()
├─ closePlayground()
└─ reset()
```

**为什么用 Zustand 而不是 React Router 管理 Main Stage**：场景编排代码需要在 setTimeout/async 中命令式调用 `stage.navigate()`，Zustand 的 `getState()` 可以在任何地方调用，比 useNavigate hook 更适合。

### 消息扩展 — blocks 数组

```javascript
// 现有消息结构
{ id, role, content, thinking }

// 扩展后 (assistant 消息)
{ id, role, content, thinking, blocks: [
  { type: 'web-search', query: '...', status: 'searching'|'done', results: N },
  { type: 'tool-call', name: '...', label: '...', status: 'running'|'done' },
  { type: 'pdf-download', filename: '...' },
  { type: 'task-list', items: [{ label: '...', done: false }] },
]}
```

### 场景编排器

```javascript
// 每个场景是一个 async 函数
async run({ chat, stage, delay }) {
  stage.openPlayground('...')
  chat.addBlock({ type: 'web-search', ... })
  await delay(2500)
  chat.updateBlock(0, { status: 'done' })
  await chat.streamThinking('分析中...')
  await chat.streamContent('Done. ...')
  stage.updatePlayground('news-analysis')
}
```

`chat` helper 提供: `streamThinking()`, `streamContent()`, `addBlock()`, `updateBlock()`, `setThinking()`, `setStreaming()`
`stage` 就是 `useStageStore.getState()`
`delay(ms)` 支持 AbortSignal，中断场景时可取消

---

## 实施阶段

### Phase 1 — 布局改造 (基础框架)

**修改文件**:
- `src/App.jsx` — 移除 Background3D/ResizableContainer，改为全屏 flex-row 两栏
- `src/components/chat/ChatWidget.jsx` — 移除 min-w 约束，调整阴影

**新建文件**:
- `src/components/stage/MainStage.jsx` — 左侧容器，读取 useStageStore 渲染对应视图
- `src/components/stage/StageWelcome.jsx` — 默认欢迎状态 (Thaleon logo + 提示文字)

**验证**: `pnpm dev` 看到 75/25 分屏，左侧空白，右侧 ChatWidget 正常工作。

---

### Phase 2 — Stage Store

**新建文件**:
- `src/stores/stage-store.js`

```javascript
// State:
currentView: 'welcome',  // 'welcome'|'client-list'|'portfolio-list'|'portfolio-detail'|'playground'
viewParams: {},
playground: { isOpen: false, isLoading: true, title: '', content: null },
pendingUpdates: {},

// Actions:
navigate(view, params)
openPlayground(title)
updatePlayground(contentKey)
closePlayground()
applyPendingUpdate(key, data)
reset()
```

**验证**: 在 MainStage 临时加按钮切换 view，确认状态切换正常。

---

### Phase 3 — 场景编排引擎 + Chat Store 扩展

**新建文件**:
- `src/lib/scenarios.js` — 5 个场景定义骨架 + delay helper

**修改文件**:
- `src/stores/chat-store.js`:
  - 提取 `streamText` 为返回 Promise 的 `streamTextAsync`
  - 新增 `runScenario(scenarioId)` action
  - 新增 `addBlock(msgId, block)` / `updateBlock(msgId, blockIdx, updates)` helper
  - 新增 `isScenarioRunning` state + AbortController 管理
  - `resetChat` 时同时调用 `useStageStore.getState().reset()` + abort 进行中场景

**验证**: 硬编码一个最简场景（仅 addBlock + streamContent），确认引擎跑通。

---

### Phase 4 — 消息 Block 组件

**新建文件** (`src/components/chat/message/blocks/`):
- `BlockRenderer.jsx` — 根据 block.type 分发渲染
- `WebSearchBlock.jsx` — 搜索动画 → "Found N results" ✓
- `ToolCallBlock.jsx` — 工具调用指示器 (spinner → checkmark)
- `PdfDownloadBlock.jsx` — 文件图标 + 下载按钮 (mock)
- `TaskListBlock.jsx` — todo 勾选列表，逐条打勾动画

**修改文件**:
- `src/components/chat/message/MessageList.jsx` — 在 AssistantMessage 后渲染 blocks

**UI 细节**:
- 使用 `framer-motion` 做入场动画 (已安装)
- 使用 `lucide-react` 图标: Globe, Search, FileDown, CheckCircle, Circle, Loader2 等
- 每个 block 紧凑单行/双行设计，不占太多空间

**验证**: 手动往消息 push 各类型 block，确认渲染和动画正确。

---

### Phase 5 — Main Stage 页面 + Playground

**新建文件** (`src/components/stage/pages/`):
- `ClientListPage.jsx` — 客户卡片网格 (参考 Figma node 471-2479)
  - Mock 6-8 个客户卡片
  - 场景 3 支持 `highlightClients` prop 高亮跌幅>10%的客户
- `PortfolioListPage.jsx` — 组合列表卡片 (参考 Figma node 2362-18058)
  - Mock Hector 的 3-4 个组合
  - 场景 4 支持 `newPortfolio` 动画插入
- `PortfolioDetailPage.jsx` — 组合详情 (参考 Figma node 475-494)
  - Mock 持仓表、表现指标
  - 场景 2 使用
- `FundListPage.jsx` — 基金列表 (参考 Figma node 6527-39585)
  - Mock 基金表格

**新建文件** (`src/components/stage/`):
- `Playground.jsx` — 浮动弹窗覆盖层 (loading → content)，带关闭按钮，framer-motion 动画

**新建文件** (`src/components/stage/playground/`):
- `PlaygroundNewsAnalysis.jsx` — 新闻文章 + 影响分析 (场景 1)
- `PlaygroundFundComparison.jsx` — 基金对比图表 (场景 5，用 CSS/SVG 简单图表)

**新建文件**:
- `src/lib/mock-data.js` — 集中管理所有 mock 数据 (clients, portfolios, funds, news, etc.)

**页面实现策略**:
- 先用 Tailwind 搭建近似 Figma 的布局
- 后续可用 `/figma-implement-design` skill 还原精确设计
- 占位头像用首字母彩色圆圈
- 图表用 CSS bar 或简单 SVG，不引入新 chart 库

**验证**: 逐个设置 stageStore.currentView，确认每个页面渲染正常。Playground 开关正常。

---

### Phase 6 — StartScreen 替换 + 场景接线

**修改文件**:
- `src/components/chat/StartScreen.jsx`:
  - 替换 STARTER_PROMPTS 为 5 个场景按钮
  - 每个按钮: icon + title + subtitle
  - callback 改为 `onSelectScenario(scenarioId)`

- `src/pages/chat/index.jsx`:
  - 新增 `handleSelectScenario` 调用 `store.runScenario(scenarioId)`
  - 传给 StartScreen

**验证**: 点击场景按钮，确认 user message 发出，场景开始运行。

---

### Phase 7 — 5 个场景脚本实现

将 `src/lib/scenarios.js` 中每个场景的 `run()` 函数完善为完整编排脚本。

每个场景的详细步骤序列:

**场景 1 (新闻 Playground)**:
1. `stage.openPlayground('Financial News & Impact Analysis')`
2. `addBlock(web-search, searching)` → delay 2.5s → `updateBlock(done)`
3. `streamThinking('分析搜索结果...')` → delay 400ms
4. `streamContent('Done. 新闻与分析已展示...')`
5. `stage.updatePlayground('news-analysis')`

**场景 2 (组合分析 + PDF)**:
1. `stage.navigate('portfolio-detail', { clientId: 'hector', portfolioId: 'green-energy' })`
2. `addBlock(tool-call, navigating)` → delay 1.5s → done
3. `addBlock(web-search, searching)` → delay 2s → done
4. `streamThinking('深度分析持仓...')` → delay 400ms
5. `streamContent(长篇分析 + markdown 表格 + 优化建议)`
6. `addBlock(pdf-download, filename)`

**场景 3 (筛选客户 + 发邮件)**:
1. `stage.navigate('client-list', { highlightClients: [...] })`
2. `addBlock(tool-call, filtering)` → delay 1.5s → done
3. `streamThinking('识别受影响客户...')` → delay 400ms
4. `streamContent('Found 3 clients...')`
5. `addBlock(task-list, 3 items)` → 每 2s 勾一个 → 全部完成
6. `streamContent('All emails sent. Task complete.')`

**场景 4 (创建组合)**:
1. `stage.navigate('portfolio-list', { clientId: 'hector' })`
2. `addBlock(tool-call, navigating)` → done
3. `streamThinking('计算组合配置...')` → delay 400ms
4. `streamContent('Creating portfolio...')`
5. `addBlock(tool-call, creating)` → delay 2s → done
6. `stage.applyPendingUpdate('newPortfolio', {...})`
7. `streamContent('Portfolio created. Task complete.')`

**场景 5 (基金对比)**:
1. `stage.openPlayground('Fund Comparison')`
2. `addBlock(web-search, searching)` → delay 2.5s → done
3. `streamThinking('对比分析中...')` → delay 400ms
4. `stage.updatePlayground('fund-comparison')`
5. `streamContent(对比总结)`

**验证**: 逐个跑 5 个场景，确认完整编排、时序自然、两栏联动正确。

---

### Phase 8 — 边界情况 + 打磨

- 场景运行中 "New Chat" → abort + reset 两个 store
- 场景运行中禁用 Composer 和场景按钮 (isScenarioRunning flag)
- Main Stage 页面切换加 framer-motion 过渡动画
- MessageList 滚动跟随 blocks 更新
- 两栏之间加微妙分割线/阴影
- 整体 UI 色调统一

**验证**: 运行场景 1 → 中途 New Chat → 运行场景 3 → 完成 → New Chat → 运行场景 5，全程无报错/状态残留。

---

## 文件清单

### 新建文件 (17 个)

```
src/stores/stage-store.js
src/components/stage/MainStage.jsx
src/components/stage/StageWelcome.jsx
src/components/stage/Playground.jsx
src/components/stage/pages/ClientListPage.jsx
src/components/stage/pages/PortfolioListPage.jsx
src/components/stage/pages/PortfolioDetailPage.jsx
src/components/stage/pages/FundListPage.jsx
src/components/stage/playground/PlaygroundNewsAnalysis.jsx
src/components/stage/playground/PlaygroundFundComparison.jsx
src/components/chat/message/blocks/BlockRenderer.jsx
src/components/chat/message/blocks/WebSearchBlock.jsx
src/components/chat/message/blocks/ToolCallBlock.jsx
src/components/chat/message/blocks/PdfDownloadBlock.jsx
src/components/chat/message/blocks/TaskListBlock.jsx
src/lib/mock-data.js
src/lib/scenarios.js
```

### 修改文件 (6 个)

```
src/App.jsx                              — 布局改造
src/stores/chat-store.js                 — 场景引擎 + blocks 支持
src/components/chat/ChatWidget.jsx       — 移除尺寸约束
src/components/chat/StartScreen.jsx      — 场景按钮替换
src/components/chat/message/MessageList.jsx — 渲染 blocks
src/pages/chat/index.jsx                 — 场景触发接线
```

### 不再引用 (保留文件但移除 import)

```
src/components/background/Background3D.jsx
src/components/dev/ResizableContainer.jsx
```

## 依赖

无需安装新依赖。已有: framer-motion, lucide-react, zustand, react-markdown, tailwindcss v4。

## 验证方案

1. `pnpm dev` 启动，确认两栏布局正常
2. 逐个点击 5 个场景按钮，观察:
   - ChatWidget: user message → blocks 动画 → thinking → streaming → 完成
   - Main Stage: 正确导航/弹出 Playground
3. 场景运行中点 "New Chat"，确认干净重置
4. 完成一个场景后再运行另一个，确认状态切换正常
5. 浏览器缩放/resize，确认布局不破

## 实施顺序建议

**Phase 1 → 2 → 3 → 4 → 6 → 5 → 7 → 8**

先搭基础设施 (1-4)，再接线 UI (6)，再填充内容 (5)，再写场景脚本 (7)，最后打磨 (8)。

建议 **先完整实现场景 1 作为垂直切片** (贯穿所有 phase)，确认架构跑通后，再横向铺开其余 4 个场景。
