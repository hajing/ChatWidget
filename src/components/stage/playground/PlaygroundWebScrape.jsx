import { motion } from 'framer-motion'
import { Globe, TrendingUp, TrendingDown } from 'lucide-react'

const MARKET_DATA = [
  { index: 'FBMKLCI', last: '1,478.23', change: '-34.70', pctChange: '-2.29%', isNeg: true },
  { index: 'KLCI Futures', last: '1,475.00', change: '-38.50', pctChange: '-2.54%', isNeg: true },
  { index: 'FBM EMAS', last: '10,312.45', change: '-198.30', pctChange: '-1.89%', isNeg: true },
  { index: 'FBM70', last: '13,024.11', change: '-156.22', pctChange: '-1.19%', isNeg: true },
]

const TOP_GAINERS = [
  { name: 'PCHEM', price: '7.12', change: '+0.38', pct: '+5.64%' },
  { name: 'DIALOG', price: '2.45', change: '+0.12', pct: '+5.15%' },
  { name: 'SAPNRG', price: '1.08', change: '+0.05', pct: '+4.85%' },
]

const TOP_LOSERS = [
  { name: 'TOPGLOV', price: '1.02', change: '-0.18', pct: '-15.00%' },
  { name: 'GENTING', price: '4.15', change: '-0.55', pct: '-11.70%' },
  { name: 'AIRASIA', price: '1.38', change: '-0.16', pct: '-10.39%' },
]

export default function PlaygroundWebScrape() {
  return (
    <div className="p-6 space-y-6">
      {/* Page source indicator */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-xs text-gray-400"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>Extracted from: https://www.bursamalaysia.com/market</span>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <h3 className="text-lg font-bold text-gray-900">Bursa Malaysia Market Summary</h3>
        <p className="text-xs text-gray-400 mt-1">Last updated: 17 Apr 2026, 4:45 PM MYT</p>
      </motion.div>

      {/* Market Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-gray-200 bg-white overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <h4 className="text-sm font-semibold text-gray-900">Market Indices</h4>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-100">
              <th className="text-left px-4 py-2 font-medium">Index</th>
              <th className="text-right px-4 py-2 font-medium">Last</th>
              <th className="text-right px-4 py-2 font-medium">Change</th>
              <th className="text-right px-4 py-2 font-medium">% Change</th>
            </tr>
          </thead>
          <tbody>
            {MARKET_DATA.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-2.5 font-medium text-gray-900">{row.index}</td>
                <td className="px-4 py-2.5 text-right text-gray-700">{row.last}</td>
                <td className={`px-4 py-2.5 text-right ${row.isNeg ? 'text-red-600' : 'text-green-600'}`}>
                  {row.change}
                </td>
                <td className={`px-4 py-2.5 text-right font-medium ${row.isNeg ? 'text-red-600' : 'text-green-600'}`}>
                  {row.pctChange}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <h4 className="text-sm font-semibold text-gray-900">Top Gainers</h4>
          </div>
          <div className="space-y-2">
            {TOP_GAINERS.map((stock, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{stock.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">{stock.price}</span>
                  <span className="text-green-600 font-medium text-xs">{stock.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-red-500" />
            <h4 className="text-sm font-semibold text-gray-900">Top Losers</h4>
          </div>
          <div className="space-y-2">
            {TOP_LOSERS.map((stock, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{stock.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">{stock.price}</span>
                  <span className="text-red-600 font-medium text-xs">{stock.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Extracted Text */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-gray-200 bg-white p-4 space-y-3"
      >
        <h4 className="text-sm font-semibold text-gray-900">Extracted Market Commentary</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          The Malaysian equity market experienced broad-based selling pressure today, driven by escalating geopolitical tensions and rising global interest rate expectations. The FBMKLCI fell 2.29% to close at 1,478.23, its lowest level in three months.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Trading volume surged to 5.8 billion shares valued at RM 4.2 billion, well above the 3-month average. Foreign investors were net sellers at RM 380 million, marking the fifth consecutive day of foreign outflows. Analysts recommend a cautious approach with a focus on defensive sectors.
        </p>
      </motion.div>
    </div>
  )
}
