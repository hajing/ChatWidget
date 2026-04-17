// ========== CLIENTS ==========
export const CLIENTS = [
  {
    id: 'hector',
    name: 'Hector Tan',
    initials: 'HT',
    color: 'bg-blue-500',
    email: 'hector.tan@email.com',
    phone: '+60 12-345 6789',
    totalAUM: 'RM 2,450,000',
    portfolioCount: 4,
    change: '+1.2%',
    changePositive: true,
    riskProfile: 'Moderate',
    joinDate: '2023-03-15',
  },
  {
    id: 'ahmad',
    name: 'Ahmad bin Ibrahim',
    initials: 'AI',
    color: 'bg-emerald-500',
    email: 'ahmad.ibrahim@email.com',
    phone: '+60 13-456 7890',
    totalAUM: 'RM 1,200,000',
    portfolioCount: 2,
    change: '-12.3%',
    changePositive: false,
    riskProfile: 'Conservative',
    joinDate: '2022-07-10',
  },
  {
    id: 'mei-lin',
    name: 'Mei Lin Wong',
    initials: 'MW',
    color: 'bg-purple-500',
    email: 'meilin.wong@email.com',
    phone: '+60 14-567 8901',
    totalAUM: 'RM 3,100,000',
    portfolioCount: 5,
    change: '-11.7%',
    changePositive: false,
    riskProfile: 'Aggressive',
    joinDate: '2021-11-22',
  },
  {
    id: 'rajesh',
    name: 'Rajesh Kumar',
    initials: 'RK',
    color: 'bg-orange-500',
    email: 'rajesh.kumar@email.com',
    phone: '+60 15-678 9012',
    totalAUM: 'RM 890,000',
    portfolioCount: 1,
    change: '-10.5%',
    changePositive: false,
    riskProfile: 'Moderate',
    joinDate: '2024-01-08',
  },
  {
    id: 'sarah',
    name: 'Sarah Lim',
    initials: 'SL',
    color: 'bg-pink-500',
    email: 'sarah.lim@email.com',
    phone: '+60 16-789 0123',
    totalAUM: 'RM 4,500,000',
    portfolioCount: 6,
    change: '+3.4%',
    changePositive: true,
    riskProfile: 'Aggressive',
    joinDate: '2020-09-01',
  },
  {
    id: 'david',
    name: 'David Chen',
    initials: 'DC',
    color: 'bg-cyan-500',
    email: 'david.chen@email.com',
    phone: '+60 17-890 1234',
    totalAUM: 'RM 1,750,000',
    portfolioCount: 3,
    change: '+0.8%',
    changePositive: true,
    riskProfile: 'Conservative',
    joinDate: '2023-06-20',
  },
]

// ========== PORTFOLIOS ==========
export const PORTFOLIOS = {
  hector: [
    { id: 'green-energy', name: 'Green Energy', value: 'RM 650,000', return: '+8.3%', returnPositive: true, holdings: 12, riskLevel: 'Moderate' },
    { id: 'tech-growth', name: 'Tech Growth', value: 'RM 1,200,000', return: '+15.7%', returnPositive: true, holdings: 8, riskLevel: 'Aggressive' },
    { id: 'balanced-income', name: 'Balanced Income', value: 'RM 400,000', return: '+4.2%', returnPositive: true, holdings: 15, riskLevel: 'Conservative' },
    { id: 'asia-dividend', name: 'Asia Dividend', value: 'RM 200,000', return: '-2.1%', returnPositive: false, holdings: 6, riskLevel: 'Moderate' },
  ],
}

// ========== PORTFOLIO DETAILS ==========
export const PORTFOLIO_DETAILS = {
  'green-energy': {
    name: 'Green Energy',
    clientName: 'Hector Tan',
    totalValue: 'RM 650,000',
    totalReturn: '+8.3%',
    totalReturnValue: '+RM 49,895',
    ytdReturn: '+8.3%',
    inception: '2024-01-15',
    benchmark: 'FTSE4Good Bursa Malaysia',
    riskLevel: 'Moderate',
    holdings: [
      { name: 'MSOLAR ETF', ticker: 'MSOLAR', units: 15000, price: 'RM 15.20', value: 'RM 228,000', weight: '35.1%', change: '+2.1%', agency: 'Bursa Malaysia', assetClass: 'Equity', style: 'Large Growth', past1Y: '+12.8%', past2Y: '+9.3%', past3Y: '+7.1%' },
      { name: 'CIMB Islamic Green', ticker: 'CIMG', units: 8000, price: 'RM 12.50', value: 'RM 100,000', weight: '15.4%', change: '+1.5%', agency: 'CIMB', assetClass: 'Allocation', style: 'Large Growth', past1Y: '+6.8%', past2Y: '+5.2%', past3Y: '+4.8%' },
      { name: 'Maybank Sustainable', ticker: 'MBSF', units: 10000, price: 'RM 8.80', value: 'RM 88,000', weight: '13.5%', change: '-0.8%', agency: 'Maybank', assetClass: 'Equity', style: 'Mid Blend', past1Y: '-1.2%', past2Y: '+3.4%', past3Y: '+5.6%' },
      { name: 'RHB Green Bond', ticker: 'RHBG', units: 20000, price: 'RM 5.20', value: 'RM 104,000', weight: '16.0%', change: '+0.3%', agency: 'RHB', assetClass: 'Allocation', style: 'Mid Value', past1Y: '+3.1%', past2Y: '+2.8%', past3Y: '+3.5%' },
      { name: 'AmInvest Clean Energy', ticker: 'AMCE', units: 12000, price: 'RM 10.83', value: 'RM 130,000', weight: '20.0%', change: '+3.2%', agency: 'AmInvest', assetClass: 'Equity', style: 'Large Growth', past1Y: '+15.3%', past2Y: '+11.7%', past3Y: '+8.9%' },
    ],
    allocation: [
      { sector: 'Solar Energy', weight: 35 },
      { sector: 'Green Bonds', weight: 16 },
      { sector: 'Clean Tech', weight: 20 },
      { sector: 'Sustainable Finance', weight: 15 },
      { sector: 'Wind Energy', weight: 14 },
    ],
  },
}

// ========== FUNDS ==========
export const FUNDS = [
  { id: 'cimb-dali', name: 'CIMB Islamic DALI Equity Growth', code: 'CIMB-DALI', category: 'Equity', agency: 'CIMB', assetClass: 'Equity', style: 'Large Growth', nav: 'RM 1.2834', ytd: '+12.8%', past1Y: '+12.8%', past2Y: '+9.5%', past3Y: '+8.5%', risk: 'High', size: 'RM 2.1B', shariah: true },
  { id: 'maybank-growth', name: 'Maybank Malaysia Growth Fund', code: 'MBB-GF', category: 'Equity', agency: 'Maybank', assetClass: 'Equity', style: 'Large Growth', nav: 'RM 0.9521', ytd: '+9.4%', past1Y: '+9.4%', past2Y: '+7.2%', past3Y: '+7.2%', risk: 'Moderate', size: 'RM 1.8B', shariah: false },
  { id: 'public-growth', name: 'Public Growth Fund', code: 'PB-GF', category: 'Equity', agency: 'Public Mutual', assetClass: 'Equity', style: 'Mid Blend', nav: 'RM 1.4567', ytd: '+7.2%', past1Y: '+7.2%', past2Y: '+6.1%', past3Y: '+5.8%', risk: 'Moderate', size: 'RM 5.2B', shariah: false },
  { id: 'amislamic', name: 'AmIslamic Growth Fund', code: 'AM-IGF', category: 'Equity', agency: 'AmInvest', assetClass: 'Allocation', style: 'Mid Value', nav: 'RM 1.1023', ytd: '+6.8%', past1Y: '+6.8%', past2Y: '+5.4%', past3Y: '+4.9%', risk: 'Moderate', size: 'RM 890M', shariah: true },
  { id: 'kenanga-premier', name: 'Kenanga Premier Fund', code: 'KEN-PF', category: 'Mixed', agency: 'Kenanga', assetClass: 'Allocation', style: 'Large Growth', nav: 'RM 0.8712', ytd: '+5.3%', past1Y: '+5.3%', past2Y: '+4.8%', past3Y: '+4.2%', risk: 'Low', size: 'RM 1.5B', shariah: false },
  { id: 'eastspring-bond', name: 'Eastspring Bond Fund', code: 'ES-BF', category: 'Bond', agency: 'Eastspring', assetClass: 'Allocation', style: 'Mid Blend', nav: 'RM 1.0234', ytd: '+3.1%', past1Y: '+3.1%', past2Y: '+2.9%', past3Y: '+3.0%', risk: 'Low', size: 'RM 2.3B', shariah: false },
  { id: 'pnb-amanah', name: 'PNB Amanah Saham', code: 'PNB-AS', category: 'Mixed', agency: 'PNB', assetClass: 'Equity', style: 'Large Growth', nav: 'RM 1.3200', ytd: '+4.5%', past1Y: '+4.5%', past2Y: '+4.1%', past3Y: '+3.8%', risk: 'Low', size: 'RM 15.2B', shariah: true },
  { id: 'rhb-goldenlife', name: 'RHB GoldenLife Fund', code: 'RHB-GL', category: 'Equity', agency: 'RHB', assetClass: 'Equity', style: 'Mid Value', nav: 'RM 0.7834', ytd: '-1.2%', past1Y: '-1.2%', past2Y: '+2.3%', past3Y: '-0.5%', risk: 'High', size: 'RM 450M', shariah: false },
]

// ========== NEWS ==========
export const NEWS_ARTICLES = [
  {
    title: 'KLCI Falls 2.3% as US-Iran Tensions Escalate',
    source: 'The Edge Markets',
    date: '17 Apr 2026',
    summary: 'The FBM KLCI dropped 34.7 points to close at 1,478.23 as geopolitical tensions between the US and Iran intensified, causing widespread sell-offs across Asian markets.',
    tag: 'Markets',
  },
  {
    title: 'Ringgit Weakens to 4.52 Against US Dollar Amid Safe-Haven Flows',
    source: 'Reuters Malaysia',
    date: '17 Apr 2026',
    summary: 'The Malaysian ringgit slipped to its lowest level in six months as investors moved capital into safe-haven assets, with the USD strengthening broadly.',
    tag: 'Currency',
  },
  {
    title: 'Palm Oil Futures Surge 8.2% on Supply Chain Disruption Fears',
    source: 'Bloomberg',
    date: '17 Apr 2026',
    summary: 'Crude palm oil futures on Bursa Malaysia Derivatives surged to RM 4,850 per tonne as the Strait of Hormuz shipping route faces potential disruption.',
    tag: 'Commodities',
  },
  {
    title: 'BNM Signals Possible Rate Hold as Inflation Concerns Grow',
    source: 'The Star',
    date: '16 Apr 2026',
    summary: 'Bank Negara Malaysia hinted at maintaining the OPR at 3.00% in its upcoming meeting, balancing growth concerns against rising import-driven inflation.',
    tag: 'Policy',
  },
]

export const WAR_IMPACT_ANALYSIS = {
  title: 'US-Iran Conflict: Impact on Malaysian Financial Markets',
  sections: [
    {
      heading: 'Stock Market Impact',
      content: 'The KLCI is expected to face continued downward pressure in the short term. Historical analysis of similar geopolitical events suggests a 3-5% correction period lasting 2-4 weeks, followed by gradual recovery.',
      severity: 'high',
    },
    {
      heading: 'Currency Outlook',
      content: 'The Ringgit may weaken further to 4.55-4.60 range against USD as risk aversion persists. However, strong trade surplus from palm oil exports provides a natural hedge.',
      severity: 'moderate',
    },
    {
      heading: 'Sector Winners & Losers',
      content: 'Winners: Oil & Gas (Petronas ecosystem), Palm Oil producers (supply disruption premium). Losers: Airlines, Tourism, Import-dependent manufacturers.',
      severity: 'moderate',
    },
    {
      heading: 'Recommendation',
      content: 'Reduce exposure to rate-sensitive sectors. Increase allocation to commodity-linked stocks and defensive positions. Consider gold-backed Shariah funds as a hedge.',
      severity: 'low',
    },
  ],
}

// ========== FUND COMPARISON ==========
export const FUND_COMPARISON = {
  fund1: {
    name: 'CIMB Islamic DALI Equity Growth',
    shortName: 'CIMB Islamic DALI',
    color: '#3B82F6',
    metrics: {
      '1Y Return': '+12.8%',
      '3Y Annualized': '+8.5%',
      '5Y Annualized': '+7.1%',
      'Volatility': '14.2%',
      'Sharpe Ratio': '0.89',
      'Max Drawdown': '-15.3%',
      'Expense Ratio': '1.65%',
      'Fund Size': 'RM 2.1B',
      'Shariah': 'Yes',
    },
    returns: [3.2, 5.1, -2.3, 8.4, 12.8, 4.5, -1.2, 6.7, 9.3, 7.8, 11.2, 12.8],
  },
  fund2: {
    name: 'Maybank Malaysia Growth Fund',
    shortName: 'Maybank Growth',
    color: '#F59E0B',
    metrics: {
      '1Y Return': '+9.4%',
      '3Y Annualized': '+7.2%',
      '5Y Annualized': '+6.3%',
      'Volatility': '11.8%',
      'Sharpe Ratio': '0.76',
      'Max Drawdown': '-12.1%',
      'Expense Ratio': '1.48%',
      'Fund Size': 'RM 1.8B',
      'Shariah': 'No',
    },
    returns: [2.1, 4.3, -1.1, 5.6, 9.4, 3.8, -0.5, 5.2, 7.1, 6.2, 8.4, 9.4],
  },
  months: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
}
