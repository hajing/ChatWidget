import { motion } from 'framer-motion'
import { Globe, TrendingUp, TrendingDown, Maximize2 } from 'lucide-react'
import {
  MARKET_INDICES,
  TOP_GAINERS,
  TOP_LOSERS,
  MARKET_COMMENTARY,
} from '@/lib/mock-data'
import { useStageStore } from '@/stores/stage-store'

export default function WebScrapeBlock() {
  const navigate = useStageStore((s) => s.navigate)

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container my-2 rounded-xl border border-gray-200 bg-white overflow-hidden"
    >
      <div className="flex items-start justify-between gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2 min-w-0">
          <Globe className="w-4 h-4 text-gray-400 shrink-0" />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              Bursa Malaysia Market Summary
            </h3>
            <p className="text-[10px] text-gray-400 truncate">
              https://www.bursamalaysia.com/market
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('insight-web-scrape')}
          title="在画布中查看"
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-[#2263f8] hover:bg-[#2263f8]/10 transition-colors shrink-0"
        >
          <Maximize2 className="w-3 h-3" />
          <span className="hidden @[22rem]:inline">在画布中查看</span>
        </button>
      </div>

      <div className="p-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg border border-gray-200 overflow-hidden"
        >
          <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
            <h4 className="text-[13px] font-semibold text-gray-900">Market Indices</h4>
          </div>
          <table className="w-full text-[12px]">
            <thead>
              <tr className="text-[10px] text-gray-400 border-b border-gray-100">
                <th className="text-left px-3 py-1.5 font-medium">Index</th>
                <th className="text-right px-3 py-1.5 font-medium">Last</th>
                <th className="hidden @[24rem]:table-cell text-right px-3 py-1.5 font-medium">Chg</th>
                <th className="text-right px-3 py-1.5 font-medium">%</th>
              </tr>
            </thead>
            <tbody>
              {MARKET_INDICES.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0">
                  <td className="px-3 py-2 font-medium text-gray-900">{row.index}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{row.last}</td>
                  <td className={`hidden @[24rem]:table-cell px-3 py-2 text-right ${row.isNeg ? 'text-red-600' : 'text-green-600'}`}>
                    {row.change}
                  </td>
                  <td className={`px-3 py-2 text-right font-medium ${row.isNeg ? 'text-red-600' : 'text-green-600'}`}>
                    {row.pctChange}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="grid grid-cols-1 @[28rem]:grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border border-gray-200 bg-white p-3"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-green-500" />
              <h4 className="text-[12px] font-semibold text-gray-900">Top Gainers</h4>
            </div>
            <div className="space-y-1.5">
              {TOP_GAINERS.map((stock, idx) => (
                <div key={idx} className="flex items-center justify-between text-[12px]">
                  <span className="font-medium text-gray-700 truncate">{stock.name}</span>
                  <span className="text-green-600 font-medium text-[11px]">{stock.pct}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-lg border border-gray-200 bg-white p-3"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingDown className="w-3.5 h-3.5 text-red-500" />
              <h4 className="text-[12px] font-semibold text-gray-900">Top Losers</h4>
            </div>
            <div className="space-y-1.5">
              {TOP_LOSERS.map((stock, idx) => (
                <div key={idx} className="flex items-center justify-between text-[12px]">
                  <span className="font-medium text-gray-700 truncate">{stock.name}</span>
                  <span className="text-red-600 font-medium text-[11px]">{stock.pct}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg border border-gray-200 bg-white p-3 space-y-2"
        >
          <h4 className="text-[13px] font-semibold text-gray-900">Market Commentary</h4>
          {MARKET_COMMENTARY.map((text, idx) => (
            <p key={idx} className="text-[12px] text-gray-600 leading-relaxed">
              {text}
            </p>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
