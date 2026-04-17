import { PORTFOLIO_DETAILS } from '@/lib/mock-data'
import { useStageStore } from '@/stores/stage-store'
import { motion } from 'framer-motion'
import { TrendingUp, Shield, Calendar, ChevronRight } from 'lucide-react'

function ReturnCell({ value }) {
  const isPositive = value.startsWith('+')
  return (
    <span
      className="font-bold text-[14px]"
      style={{ color: isPositive ? '#078d39' : '#cb3d00' }}
    >
      {value}
    </span>
  )
}

function AssetClassTag({ label }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium bg-[#d9e6f9] text-[#2263f8]">
      {label}
    </span>
  )
}

function StylePill({ label }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium bg-green-100 text-[#078d39]">
      {label}
    </span>
  )
}

export default function PortfolioDetailPage() {
  const viewParams = useStageStore((s) => s.viewParams)
  const portfolioId = viewParams.portfolioId || 'green-energy'
  const detail = PORTFOLIO_DETAILS[portfolioId]

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-full text-[#6e768c]">
        Portfolio not found
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-[#f3f3f3]">
      {/* Page Header */}
      <div className="px-8 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-[28px] font-bold text-black leading-tight">
            Data Analysis-Current Holdings
          </h1>
          <p className="text-[14px] text-[#5a607f] mt-1">
            Portfolio X-Ray Analysis for {detail.clientName} - {detail.name}
          </p>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-4 gap-4 px-8 pb-6"
      >
        <div className="rounded-[10px] border border-[#e6e9f4] bg-white p-5">
          <p className="text-[13px] text-[#6e768c] mb-1">Total Value</p>
          <p className="text-[22px] font-bold text-black">{detail.totalValue}</p>
        </div>
        <div className="rounded-[10px] border border-[#e6e9f4] bg-white p-5">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3.5 h-3.5" style={{ color: '#078d39' }} />
            <p className="text-[13px] text-[#6e768c]">YTD Return</p>
          </div>
          <p className="text-[22px] font-bold" style={{ color: '#078d39' }}>
            {detail.ytdReturn}
          </p>
          <p className="text-[13px] text-[#6e768c] mt-0.5">{detail.totalReturnValue}</p>
        </div>
        <div className="rounded-[10px] border border-[#e6e9f4] bg-white p-5">
          <div className="flex items-center gap-1.5 mb-1">
            <Shield className="w-3.5 h-3.5 text-[#6e768c]" />
            <p className="text-[13px] text-[#6e768c]">Risk Level</p>
          </div>
          <p className="text-[22px] font-bold text-black">{detail.riskLevel}</p>
        </div>
        <div className="rounded-[10px] border border-[#e6e9f4] bg-white p-5">
          <div className="flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#6e768c]" />
            <p className="text-[13px] text-[#6e768c]">Inception</p>
          </div>
          <p className="text-[22px] font-bold text-black">{detail.inception}</p>
          <p className="text-[13px] text-[#6e768c] mt-0.5">
            Benchmark: {detail.benchmark}
          </p>
        </div>
      </motion.div>

      {/* Holdings Table */}
      <div className="flex-1 overflow-hidden px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="h-full rounded-[10px] border border-[#e6e9f4] bg-white flex flex-col overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-[#e6e9f4]">
            <h2 className="text-[16px] font-semibold text-black">Holdings</h2>
          </div>

          {/* Table with sticky header */}
          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="border-b-2 border-[#e6e9f4]">
                  <th className="text-left px-6 py-3 text-[14px] font-medium text-[#6e768c]">
                    Fund Name / Code
                  </th>
                  <th className="text-left px-4 py-3 text-[14px] font-medium text-[#6e768c]">
                    Agency Name
                  </th>
                  <th className="text-left px-4 py-3 text-[14px] font-medium text-[#6e768c]">
                    Asset Class
                  </th>
                  <th className="text-left px-4 py-3 text-[14px] font-medium text-[#6e768c]">
                    Style
                  </th>
                  <th className="text-right px-4 py-3 text-[14px] font-medium text-[#6e768c]">
                    Past 1Y
                  </th>
                  <th className="text-right px-4 py-3 text-[14px] font-medium text-[#6e768c]">
                    Past 2Y
                  </th>
                  <th className="text-right px-4 py-3 text-[14px] font-medium text-[#6e768c]">
                    Past 3Y
                  </th>
                  <th className="text-center px-4 py-3 text-[14px] font-medium text-[#6e768c] w-[60px]">
                    {/* Actions */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {detail.holdings.map((holding, idx) => (
                  <motion.tr
                    key={holding.ticker}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 + idx * 0.04 }}
                    className="border-b border-[#e6e9f4] hover:bg-gray-50 transition-colors h-[68px]"
                  >
                    {/* Fund Name / Code */}
                    <td className="px-6 py-3">
                      <p className="font-bold text-[15px] text-black leading-tight">
                        {holding.name}
                      </p>
                      <p className="text-[13px] text-[#6e768c] mt-0.5">
                        {holding.ticker}
                      </p>
                    </td>
                    {/* Agency */}
                    <td className="px-4 py-3 text-[14px] text-[#5a607f]">
                      {holding.agency}
                    </td>
                    {/* Asset Class */}
                    <td className="px-4 py-3">
                      <AssetClassTag label={holding.assetClass} />
                    </td>
                    {/* Style */}
                    <td className="px-4 py-3">
                      <StylePill label={holding.style} />
                    </td>
                    {/* Past 1Y */}
                    <td className="text-right px-4 py-3">
                      <ReturnCell value={holding.past1Y} />
                    </td>
                    {/* Past 2Y */}
                    <td className="text-right px-4 py-3">
                      <ReturnCell value={holding.past2Y} />
                    </td>
                    {/* Past 3Y */}
                    <td className="text-right px-4 py-3">
                      <ReturnCell value={holding.past3Y} />
                    </td>
                    {/* Expand Action */}
                    <td className="text-center px-4 py-3">
                      <button className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#d9e6f9] transition-colors">
                        <ChevronRight className="w-4 h-4 text-[#6e768c]" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
