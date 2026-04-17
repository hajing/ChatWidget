import { FUND_COMPARISON } from '@/lib/mock-data'
import { motion } from 'framer-motion'

function MiniBarChart({ returns, color, maxVal }) {
  return (
    <div className="flex items-end gap-1 h-24">
      {returns.map((val, idx) => {
        const height = Math.max(Math.abs(val) / maxVal * 100, 4)
        const isNeg = val < 0
        return (
          <div key={idx} className="flex-1 flex flex-col justify-end items-center">
            <div
              className="w-full rounded-t"
              style={{
                height: `${height}%`,
                backgroundColor: isNeg ? '#EF4444' : color,
                opacity: 0.8,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

function MetricRow({ label, val1, val2 }) {
  return (
    <div className="flex items-center py-2 border-b border-gray-50 text-sm">
      <span className="flex-1 text-gray-500">{label}</span>
      <span className="w-32 text-right font-medium text-gray-900">{val1}</span>
      <span className="w-32 text-right font-medium text-gray-900">{val2}</span>
    </div>
  )
}

export default function PlaygroundFundComparison() {
  const { fund1, fund2, months } = FUND_COMPARISON
  const allReturns = [...fund1.returns, ...fund2.returns]
  const maxVal = Math.max(...allReturns.map(Math.abs))

  return (
    <div className="p-6 space-y-6">
      {/* Fund Headers */}
      <div className="grid grid-cols-2 gap-6">
        {[fund1, fund2].map((fund, idx) => (
          <motion.div
            key={fund.shortName}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: fund.color }}
              />
              <h3 className="text-sm font-semibold text-gray-900">{fund.shortName}</h3>
            </div>

            {/* Mini Chart */}
            <MiniBarChart returns={fund.returns} color={fund.color} maxVal={maxVal} />
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-gray-400">{months[0]}</span>
              <span className="text-[10px] text-gray-400">{months[months.length - 1]}</span>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">1Y Return</p>
                <p className="text-sm font-bold text-gray-900">{fund.metrics['1Y Return']}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Volatility</p>
                <p className="text-sm font-bold text-gray-900">{fund.metrics['Volatility']}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Sharpe</p>
                <p className="text-sm font-bold text-gray-900">{fund.metrics['Sharpe Ratio']}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-gray-200 bg-white p-5"
      >
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Detailed Comparison</h3>
        <div className="flex items-center pb-2 border-b border-gray-200 text-xs text-gray-400">
          <span className="flex-1">Metric</span>
          <span className="w-32 text-right" style={{ color: fund1.color }}>{fund1.shortName}</span>
          <span className="w-32 text-right" style={{ color: fund2.color }}>{fund2.shortName}</span>
        </div>
        {Object.keys(fund1.metrics).map((key) => (
          <MetricRow
            key={key}
            label={key}
            val1={fund1.metrics[key]}
            val2={fund2.metrics[key]}
          />
        ))}
      </motion.div>
    </div>
  )
}
