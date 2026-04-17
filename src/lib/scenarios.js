import { Newspaper, PieChart, AlertTriangle, FolderPlus, BarChart3, UserPlus, Mic, Link } from 'lucide-react'

export const delay = (ms, signal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })

export const SCENARIOS = {
  'scenario-1': {
    id: 'scenario-1',
    icon: Newspaper,
    title: 'Financial News & Impact',
    subtitle: 'Malaysia news + US-Iran war impact analysis',
    prompt: 'Show me the latest Malaysia financial news and analyze how the US-Iran conflict impacts the Malaysian market.',
    run: async ({ chat, stage, delay }) => {
      // Step 1: Open playground loading
      stage.openPlayground('Financial News & Impact Analysis')
      await delay(500)

      // Step 2: Web search
      chat.addBlock({ type: 'web-search', query: 'Malaysia financial news US Iran war impact 2026', status: 'searching' })
      await delay(2500)
      chat.updateBlock(0, { status: 'done', results: 5 })
      await delay(300)

      // Step 3: Thinking
      chat.setThinking(true)
      await chat.streamThinking('正在分析搜索结果，评估美国-伊朗冲突对马来西亚金融市场的影响。主要关注 KLCI 指数走势、令吉汇率波动、棕榈油期货价格变化，以及对本地基金投资组合的潜在影响...')
      chat.setThinking(false)
      await delay(400)

      // Step 4: Stream content
      chat.setStreaming(true)
      await chat.streamContent('Done! I\'ve compiled the latest Malaysia financial news and analyzed the US-Iran conflict impact on the Malaysian market.\n\n**Key Findings:**\n- KLCI dropped 2.3% this week amid geopolitical tensions\n- Ringgit weakened to 4.52 against USD\n- Palm oil futures surged 8.2% due to supply chain concerns\n- Defense and energy sectors showing unusual activity\n\nThe full analysis with news articles is now displayed in the playground.')
      chat.setStreaming(false)

      // Step 5: Show playground content
      stage.updatePlayground('news-analysis')
    },
  },

  'scenario-2': {
    id: 'scenario-2',
    icon: PieChart,
    title: "Analyze Hector's Portfolio",
    subtitle: 'Green Energy portfolio analysis + PDF report',
    prompt: "Analyze Hector's Green Energy investment portfolio, provide optimization suggestions, and generate a PDF report.",
    run: async ({ chat, stage, delay }) => {
      // Step 1: Navigate to portfolio detail
      chat.addBlock({ type: 'tool-call', name: 'navigate_to_portfolio', label: "Opening Hector's Green Energy portfolio...", status: 'running' })
      await delay(800)
      stage.navigate('portfolio-detail', { clientId: 'hector', portfolioId: 'green-energy' })
      await delay(700)
      chat.updateBlock(0, { status: 'done' })
      await delay(300)

      // Step 2: Web search
      chat.addBlock({ type: 'web-search', query: 'green energy funds Malaysia 2026 ESG performance outlook', status: 'searching' })
      await delay(2000)
      chat.updateBlock(1, { status: 'done', results: 4 })
      await delay(300)

      // Step 3: Thinking
      chat.setThinking(true)
      await chat.streamThinking('正在深度分析 Hector 的 Green Energy 投资组合。审查当前持仓配置、各基金的历史表现、风险敞口、费用比率，并结合最新的 ESG 评级和市场趋势，制定优化建议...')
      chat.setThinking(false)
      await delay(400)

      // Step 4: Stream analysis
      chat.setStreaming(true)
      await chat.streamContent(`## Green Energy Portfolio Analysis — Hector Tan

### Current Performance
| Metric | Value |
|--------|-------|
| Total Value | RM 650,000 |
| YTD Return | +8.3% |
| Benchmark (FTSE4Good MY) | +6.1% |
| Sharpe Ratio | 1.42 |
| Risk Level | Moderate |

### Key Observations
1. **Outperforming benchmark** by 2.2% YTD — strong stock selection in solar sector
2. **Concentration risk**: 35% allocated to a single solar ETF (MSOLAR)
3. **Missing exposure**: No allocation to green bonds, which offer stability

### Optimization Suggestions
- **Reduce** MSOLAR from 35% → 20% to lower concentration risk
- **Add** 10% allocation to CIMB Islamic Green Bond Fund for stability
- **Add** 5% to Maybank Global Clean Energy Fund for geographic diversification
- **Rebalance** quarterly instead of semi-annually to capture momentum

### Risk Assessment
The portfolio's ESG score is **A-** (MSCI). With the suggested changes, expected risk-adjusted return improves by ~0.8% annually.`)
      chat.setStreaming(false)
      await delay(300)

      // Step 5: PDF download
      chat.addBlock({ type: 'pdf-download', filename: 'Hector_GreenEnergy_Analysis_2026.pdf' })
    },
  },

  'scenario-3': {
    id: 'scenario-3',
    icon: AlertTriangle,
    title: 'Clients with >10% Drop',
    subtitle: 'Find affected clients & send comfort emails',
    prompt: 'Find all clients whose portfolios dropped more than 10% today and send them personalized comfort emails.',
    run: async ({ chat, stage, delay }) => {
      // Step 1: Filter clients
      chat.addBlock({ type: 'tool-call', name: 'filter_clients', label: 'Scanning all client portfolios for drops exceeding 10%...', status: 'running' })
      await delay(1500)
      stage.navigate('client-list', { highlightClients: ['ahmad', 'mei-lin', 'rajesh'] })
      await delay(500)
      chat.updateBlock(0, { status: 'done' })
      await delay(300)

      // Step 2: Thinking
      chat.setThinking(true)
      await chat.streamThinking('已识别 3 位客户的投资组合今日跌幅超过 10%。正在分析每位客户的具体情况，并根据其风险偏好和投资目标，撰写个性化的安抚邮件...')
      chat.setThinking(false)
      await delay(400)

      // Step 3: Stream info
      chat.setStreaming(true)
      await chat.streamContent('Found **3 clients** with portfolio drops exceeding 10% today:\n\n1. **Ahmad bin Ibrahim** — Portfolio: -12.3% (KLSE exposure)\n2. **Mei Lin Wong** — Portfolio: -11.7% (Tech heavy)\n3. **Rajesh Kumar** — Portfolio: -10.5% (Emerging markets)\n\nComposing and sending personalized comfort emails now...')
      chat.setStreaming(false)
      await delay(500)

      // Step 4: Task list - send emails one by one
      chat.addBlock({
        type: 'task-list',
        items: [
          { label: 'Send email to Ahmad bin Ibrahim (Portfolio: -12.3%)', done: false },
          { label: 'Send email to Mei Lin Wong (Portfolio: -11.7%)', done: false },
          { label: 'Send email to Rajesh Kumar (Portfolio: -10.5%)', done: false },
        ],
      })
      const taskBlockIdx = chat.getBlockCount() - 1

      await delay(2000)
      chat.updateTaskItem(taskBlockIdx, 0, true)
      await delay(1800)
      chat.updateTaskItem(taskBlockIdx, 1, true)
      await delay(2200)
      chat.updateTaskItem(taskBlockIdx, 2, true)
      await delay(500)

      // Step 5: Done
      chat.setStreaming(true)
      await chat.streamContent('\n\nAll 3 comfort emails have been sent successfully. Each email includes:\n- Personalized greeting\n- Portfolio performance context\n- Market outlook reassurance\n- Invitation to schedule a review call\n\n**Task complete.**')
      chat.setStreaming(false)
    },
  },

  'scenario-4': {
    id: 'scenario-4',
    icon: FolderPlus,
    title: 'Create New Portfolio',
    subtitle: 'Apple/Google/Amazon portfolio for Hector',
    prompt: "Create a new investment portfolio for client Hector with: Apple 10,000 units, Google 10,000 units, Amazon 10,000 units.",
    run: async ({ chat, stage, delay }) => {
      // Step 1: Navigate to portfolio list
      chat.addBlock({ type: 'tool-call', name: 'navigate_to_portfolios', label: "Opening Hector's portfolio list...", status: 'running' })
      await delay(800)
      stage.navigate('portfolio-list', { clientId: 'hector' })
      await delay(700)
      chat.updateBlock(0, { status: 'done' })
      await delay(300)

      // Step 2: Thinking
      chat.setThinking(true)
      await chat.streamThinking('正在计算投资组合配置。查询 Apple (AAPL)、Google (GOOGL) 和 Amazon (AMZN) 的最新价格，计算总价值和各持仓占比...')
      chat.setThinking(false)
      await delay(400)

      // Step 3: Stream portfolio info
      chat.setStreaming(true)
      await chat.streamContent(`Creating a new portfolio for **Hector Tan** with the following holdings:

| Stock | Units | Price (USD) | Value (USD) | Weight |
|-------|-------|-------------|-------------|--------|
| Apple (AAPL) | 10,000 | $198.50 | $1,985,000 | 38.2% |
| Google (GOOGL) | 10,000 | $178.30 | $1,783,000 | 34.3% |
| Amazon (AMZN) | 10,000 | $142.80 | $1,428,000 | 27.5% |

**Total Value**: $5,196,000 (~RM 23,480,000)`)
      chat.setStreaming(false)
      await delay(500)

      // Step 4: Create portfolio
      chat.addBlock({ type: 'tool-call', name: 'create_portfolio', label: 'Creating portfolio "US Tech Giants"...', status: 'running' })
      await delay(2000)
      chat.updateBlock(chat.getBlockCount() - 1, { status: 'done' })
      await delay(300)

      // Step 5: Show new portfolio in list
      stage.applyPendingUpdate('newPortfolio', {
        id: 'us-tech-giants',
        name: 'US Tech Giants',
        value: 'RM 23,480,000',
        return: 'New',
        holdings: 3,
      })

      chat.setStreaming(true)
      await chat.streamContent('\n\nPortfolio **"US Tech Giants"** has been created successfully and is now visible in Hector\'s portfolio list.\n\n**Task complete.**')
      chat.setStreaming(false)
    },
  },

  'scenario-5': {
    id: 'scenario-5',
    icon: UserPlus,
    title: 'Create New Client',
    subtitle: 'Register a new client named Hejing',
    prompt: 'Create a new client named Hejing. Basic info: Male, Age 28, Malaysian IC 950415-14-5678, Email hejing@email.com, Phone +60 18-234 5678, Risk profile: Aggressive, Initial AUM: RM 500,000.',
    run: async ({ chat, stage, delay }) => {
      // Step 1: Navigate to client list
      chat.addBlock({ type: 'tool-call', name: 'navigate_to_clients', label: 'Opening client list...', status: 'running' })
      await delay(800)
      stage.navigate('client-list')
      await delay(700)
      chat.updateBlock(0, { status: 'done' })
      await delay(300)

      // Step 2: Thinking
      chat.setThinking(true)
      await chat.streamThinking('正在验证客户信息：姓名 Hejing、身份证号码 950415-14-5678、联系方式、风险偏好为进取型。检查是否存在重复客户记录，并准备创建新客户档案...')
      chat.setThinking(false)
      await delay(400)

      // Step 3: Stream confirmation
      chat.setStreaming(true)
      await chat.streamContent(`Creating a new client profile with the following details:

| Field | Value |
|-------|-------|
| Name | Hejing |
| Gender | Male |
| Age | 28 |
| IC Number | 950415-14-5678 |
| Email | hejing@email.com |
| Phone | +60 18-234 5678 |
| Risk Profile | Aggressive |
| Initial AUM | RM 500,000 |

Registering client in the system...`)
      chat.setStreaming(false)
      await delay(500)

      // Step 4: Create client
      chat.addBlock({ type: 'tool-call', name: 'create_client', label: 'Creating client profile for Hejing...', status: 'running' })
      await delay(2000)
      chat.updateBlock(chat.getBlockCount() - 1, { status: 'done' })
      await delay(300)

      // Step 5: Show new client in list
      stage.applyPendingUpdate('newClient', {
        id: 'hejing',
        name: 'Hejing',
        initials: 'HJ',
        color: 'bg-indigo-500',
        email: 'hejing@email.com',
        phone: '+60 18-234 5678',
        totalAUM: 'RM 500,000',
        portfolioCount: 0,
        change: '+0.0%',
        changePositive: true,
        riskProfile: 'Aggressive',
        joinDate: '2026-04-17',
      })

      chat.setStreaming(true)
      await chat.streamContent('\n\nClient **Hejing** has been registered successfully and is now visible in the client list. You can now create investment portfolios for this client.\n\n**Task complete.**')
      chat.setStreaming(false)
    },
  },

  'scenario-6': {
    id: 'scenario-6',
    icon: Mic,
    title: 'Live Meeting Transcript',
    subtitle: 'Real-time subtitles, action items & instant triggers',
    prompt: "Start live transcription for Hector's Google Meet call. Detect action items in real-time and trigger portfolio creation when mentioned.",
    run: async ({ chat, stage, delay }) => {
      // Step 1: Navigate to client list (Hector's card with recording icon)
      chat.addBlock({ type: 'tool-call', name: 'start_recording', label: "Connecting to Hector's Google Meet session...", status: 'running' })
      await delay(1200)
      stage.navigate('client-list', { recordingClient: 'hector' })
      await delay(600)
      chat.updateBlock(0, { status: 'done' })
      await delay(300)

      // Step 2: Start STT block
      chat.addBlock({
        type: 'stt-transcript',
        lines: [],
        isLive: true,
      })
      const sttBlockIdx = chat.getBlockCount() - 1

      chat.setStreaming(true)
      await chat.streamContent('Live transcription started. Listening to the meeting...\n')
      chat.setStreaming(false)
      await delay(1000)

      // Step 3: Simulate transcript lines one by one
      const transcript = [
        { speaker: 'Advisor', text: "Good morning Hector, let's review your portfolio performance this quarter.", color: '#2263f8' },
        { speaker: 'Hector', text: "Sure. I noticed the Green Energy portfolio did well. I'm thinking about adding more exposure.", color: '#078d39' },
        { speaker: 'Advisor', text: 'Yes, Green Energy returned 8.3% YTD. The solar sector is driving most of the gains.', color: '#2263f8' },
        { speaker: 'Hector', text: "That's great. I also want to diversify into US tech. Can we create a new portfolio?", color: '#078d39' },
        { speaker: 'Advisor', text: "Absolutely. What stocks are you interested in?", color: '#2263f8' },
        { speaker: 'Hector', text: "I'd like to create a new portfolio with Tesla 5,000 units, Microsoft 8,000 units, and Nvidia 3,000 units.", color: '#078d39' },
        { speaker: 'Advisor', text: "Got it. Let me set that up for you right away.", color: '#2263f8' },
      ]

      const currentLines = []
      for (let i = 0; i < transcript.length; i++) {
        currentLines.push(transcript[i])
        chat.updateBlock(sttBlockIdx, { lines: [...currentLines] })
        await delay(1800 + Math.random() * 1200)
      }
      await delay(500)

      // Step 4: Detected action item - show thinking
      chat.setThinking(true)
      await chat.streamThinking('检测到关键行动项：客户 Hector 要求创建新投资组合，包含 Tesla 5000 份、Microsoft 8000 份、Nvidia 3000 份。正在准备确认卡片...')
      chat.setThinking(false)
      await delay(400)

      // Step 5: Stop live indicator
      chat.updateBlock(sttBlockIdx, { isLive: false })

      // Step 6: Show confirm card (generative UI)
      chat.addBlock({
        type: 'confirm-card',
        title: 'Create Portfolio Detected',
        description: 'Hector mentioned creating a new portfolio: Tesla (5,000), Microsoft (8,000), Nvidia (3,000). Create it now?',
        primaryAction: 'Create Portfolio',
        secondaryAction: 'Dismiss',
      })
      await delay(2000)

      // Step 7: Simulate user clicking "Create Portfolio" — execute the creation
      chat.addBlock({ type: 'tool-call', name: 'navigate_to_portfolios', label: "Opening Hector's portfolio list...", status: 'running' })
      await delay(800)
      stage.navigate('portfolio-list', { clientId: 'hector' })
      await delay(700)
      chat.updateBlock(chat.getBlockCount() - 1, { status: 'done' })
      await delay(300)

      chat.setThinking(true)
      await chat.streamThinking('正在计算投资组合配置。查询 Tesla (TSLA)、Microsoft (MSFT) 和 Nvidia (NVDA) 的最新价格，计算总价值和各持仓占比...')
      chat.setThinking(false)
      await delay(400)

      chat.addBlock({ type: 'tool-call', name: 'create_portfolio', label: 'Creating portfolio "US Tech Premium"...', status: 'running' })
      await delay(2000)
      chat.updateBlock(chat.getBlockCount() - 1, { status: 'done' })
      await delay(300)

      stage.applyPendingUpdate('newPortfolio', {
        id: 'us-tech-premium',
        name: 'US Tech Premium',
        value: 'RM 12,850,000',
        return: 'New',
        holdings: 3,
        riskLevel: 'Aggressive',
      })

      chat.setStreaming(true)
      await chat.streamContent(`\n\nPortfolio **"US Tech Premium"** has been created from the meeting action item:

| Stock | Units | Est. Price (USD) | Est. Value (USD) |
|-------|-------|------------------|------------------|
| Tesla (TSLA) | 5,000 | $178.50 | $892,500 |
| Microsoft (MSFT) | 8,000 | $425.30 | $3,402,400 |
| Nvidia (NVDA) | 3,000 | $890.20 | $2,670,600 |

**Total**: ~$6,965,500 (~RM 12,850,000)

Meeting summary captured. 1 action item detected and executed.\n\n**Task complete.**`)
      chat.setStreaming(false)
    },
  },

  'scenario-7': {
    id: 'scenario-7',
    icon: Link,
    title: 'Scrape Web Link',
    subtitle: 'Extract data from URL & display in playground',
    prompt: 'Scrape https://www.bursamalaysia.com/market and extract the latest market data, top gainers and losers, and market commentary.',
    run: async ({ chat, stage, delay }) => {
      // Step 1: Open playground in loading state
      stage.openPlayground('Web Data Extraction')
      await delay(500)

      // Step 2: Web search / crawl
      chat.addBlock({ type: 'web-search', query: 'https://www.bursamalaysia.com/market — fetching page content', status: 'searching' })
      await delay(3000)
      chat.updateBlock(0, { status: 'done', results: 1 })
      await delay(300)

      // Step 3: Thinking
      chat.setThinking(true)
      await chat.streamThinking('成功获取 Bursa Malaysia 页面内容。正在解析 HTML 结构，提取市场指数数据、涨幅榜和跌幅榜、以及市场评论文本。清洗数据并组织为结构化格式...')
      chat.setThinking(false)
      await delay(400)

      // Step 4: Show scraped data in playground
      stage.updatePlayground('web-scrape')

      // Step 5: Stream summary
      chat.setStreaming(true)
      await chat.streamContent(`Done! I've scraped and extracted the data from **bursamalaysia.com/market**.

**Extracted content:**
- 4 market indices with real-time prices & changes
- Top 3 gainers (led by PCHEM +5.64%)
- Top 3 losers (led by TOPGLOV -15.00%)
- Full market commentary text

The structured data is now displayed in the playground.`)
      chat.setStreaming(false)
      await delay(400)

      // Step 6: Action buttons for saving
      chat.addBlock({
        type: 'action-buttons',
        buttons: [
          { label: 'Save to Hector', icon: 'Save', variant: 'primary' },
          { label: 'Save to New Client', icon: 'FileText', variant: 'default' },
          { label: 'Download as PDF', icon: 'Download', variant: 'default' },
          { label: 'Share via Email', icon: 'Send', variant: 'default' },
        ],
      })
    },
  },

  'scenario-8': {
    id: 'scenario-8',
    icon: BarChart3,
    title: 'Compare Two Funds',
    subtitle: 'Side-by-side fund performance comparison',
    prompt: 'Compare the performance of CIMB Islamic DALI Equity Growth Fund vs Maybank Malaysia Growth Fund.',
    run: async ({ chat, stage, delay }) => {
      // Step 1: Open playground
      stage.openPlayground('Fund Comparison: CIMB Islamic vs Maybank Growth')
      await delay(500)

      // Step 2: Web search
      chat.addBlock({ type: 'web-search', query: 'CIMB Islamic DALI Equity Growth Fund vs Maybank Malaysia Growth Fund 2026 performance', status: 'searching' })
      await delay(2500)
      chat.updateBlock(0, { status: 'done', results: 6 })
      await delay(300)

      // Step 3: Thinking
      chat.setThinking(true)
      await chat.streamThinking('正在对比分析两只基金的表现。比较维度包括：年化收益率、波动率、夏普比率、最大回撤、费用比率、基金规模、持仓集中度等关键指标...')
      chat.setThinking(false)
      await delay(400)

      // Step 4: Show comparison
      stage.updatePlayground('fund-comparison')

      // Step 5: Stream summary
      chat.setStreaming(true)
      await chat.streamContent(`## Fund Comparison Summary

| Metric | CIMB Islamic DALI | Maybank Growth |
|--------|-------------------|----------------|
| 1Y Return | +12.8% | +9.4% |
| 3Y Annualized | +8.5% | +7.2% |
| Volatility | 14.2% | 11.8% |
| Sharpe Ratio | 0.89 | 0.76 |
| Max Drawdown | -15.3% | -12.1% |
| Expense Ratio | 1.65% | 1.48% |
| Fund Size | RM 2.1B | RM 1.8B |

**Verdict**: CIMB Islamic DALI offers higher returns but with greater volatility. Maybank Growth is the more conservative choice. For growth-oriented clients, CIMB is recommended; for risk-averse clients, Maybank is preferable.

The detailed comparison charts are displayed in the playground.`)
      chat.setStreaming(false)
    },
  },
}
