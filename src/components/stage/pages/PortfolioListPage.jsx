import { CLIENTS, PORTFOLIOS } from '@/lib/mock-data'
import { useStageStore } from '@/stores/stage-store'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  Briefcase,
  Plus,
  BarChart3,
  RefreshCw,
  Trash2,
  GitCompareArrows,
} from 'lucide-react'

function PortfolioCard({ portfolio, isNew, isOfficial, index }) {
  return (
    <motion.div
      initial={
        isNew
          ? { opacity: 0, scale: 0.92, y: 20 }
          : { opacity: 0, y: 12 }
      }
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={
        isNew
          ? { type: 'spring', stiffness: 300, damping: 25 }
          : { delay: index * 0.08, duration: 0.35 }
      }
      className={`relative rounded-[10px] border bg-white p-5 transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${
        isNew
          ? 'border-[#078d39] ring-1 ring-[#078d39]/20'
          : 'border-[#e6e9f4]'
      }`}
    >
      {/* Tag at top-right */}
      {isNew ? (
        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#078d39] to-[#10b050] text-white text-[12px] font-medium">
          New
        </span>
      ) : isOfficial ? (
        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#2263f8] to-[#4b83ff] text-white text-[12px] font-medium">
          Official Holdings
        </span>
      ) : null}

      {/* Icon + Label */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 shrink-0 rounded-lg bg-[#2263f8] flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[16px] font-semibold text-black truncate leading-tight">
            {portfolio.name}
          </h3>
          <p className="text-[12px] text-[#9ba1ae] mt-0.5">Current Holdings</p>
        </div>
      </div>

      {/* Value + Assets */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-[24px] font-bold text-[#2263f8] leading-tight">
          {portfolio.value}
        </span>
        <span className="text-[14px] text-[#6e768c]">|</span>
        <span className="text-[14px] text-[#6e768c]">
          {portfolio.holdings} Assets
        </span>
      </div>

      {/* Risk + Return */}
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#d9e6f9] text-[#2263f8] text-[12px] font-medium">
          {portfolio.riskLevel}
        </span>
        <span
          className={`text-[13px] font-semibold ${
            portfolio.returnPositive !== false
              ? 'text-[#078d39]'
              : 'text-[#cb3d00]'
          }`}
        >
          {portfolio.return} YTD
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-[#d7dde7] pt-3">
        {/* Actions row */}
        <div className="flex items-center justify-between">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e6e9f4] bg-white text-[13px] text-[#5a607f] font-medium hover:bg-[#f3f3f3] transition-colors">
            <BarChart3 className="w-3.5 h-3.5" />
            Portfolio Analysis
          </button>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-md text-[#9ba1ae] hover:text-[#5a607f] hover:bg-[#f3f3f3] transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-md text-[#9ba1ae] hover:text-[#cb3d00] hover:bg-[#f3f3f3] transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Last updated */}
        <p className="text-[11px] text-[#9ba1ae] text-center mt-2">
          Last Updated: 17 Apr 2026
        </p>
      </div>
    </motion.div>
  )
}

function AddPortfolioCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.35 }}
      className="rounded-[10px] border-2 border-dashed border-[#d7dde7] bg-white/60 p-5 flex flex-col items-center justify-center min-h-[220px] cursor-pointer hover:border-[#2263f8] hover:bg-[#d9e6f9]/20 transition-colors group"
    >
      <div className="w-12 h-12 rounded-full bg-[#f3f3f3] flex items-center justify-center mb-3 group-hover:bg-[#d9e6f9] transition-colors">
        <Plus className="w-6 h-6 text-[#9ba1ae] group-hover:text-[#2263f8] transition-colors" />
      </div>
      <span className="text-[14px] font-medium text-[#6e768c] group-hover:text-[#2263f8] transition-colors">
        Add Portfolio
      </span>
    </motion.div>
  )
}

export default function PortfolioListPage() {
  const viewParams = useStageStore((s) => s.viewParams)
  const pendingUpdates = useStageStore((s) => s.pendingUpdates)
  const clientId = viewParams.clientId || 'hector'
  const portfolios = PORTFOLIOS[clientId] || []
  const newPortfolio = pendingUpdates.newPortfolio

  const allPortfolios = newPortfolio
    ? [...portfolios, newPortfolio]
    : portfolios

  // Try to find the client info for the avatar
  const client = CLIENTS.find((c) => c.id === clientId) || {
    name: 'Client',
    initials: 'C',
    color: 'bg-blue-500',
  }

  return (
    <div className="h-full flex flex-col bg-[#f3f3f3]">
      {/* Breadcrumb */}
      <div className="px-6 pt-4 pb-0">
        <nav className="flex items-center gap-1 text-[12px] text-[#9ba1ae] mb-4">
          <span className="hover:text-[#5a607f] cursor-pointer transition-colors">
            Asset Management
          </span>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-[#5a607f] cursor-pointer transition-colors">
            Client List
          </span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#5a607f] font-medium">Client Details</span>
        </nav>
      </div>

      {/* Header */}
      <div className="px-6 pb-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-[60px] h-[60px] shrink-0 rounded-full ${client.color} flex items-center justify-center text-white text-[20px] font-semibold`}
            >
              {client.initials}
            </div>
            <div>
              <h1 className="text-[28px] font-bold text-black leading-tight">
                Asset Portfolio
              </h1>
              <p className="text-[14px] text-[#5a607f] mt-1">
                Manage all your investment portfolios in one place.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#e6e9f4] bg-white text-[14px] text-[#5a607f] font-medium hover:bg-[#f3f3f3] transition-colors">
              <GitCompareArrows className="w-4 h-4" />
              Portfolio Comparison
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2263f8] text-white text-[14px] font-medium hover:bg-[#1b52d6] transition-colors">
              <Plus className="w-4 h-4" />
              Add Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio cards */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence>
            {allPortfolios.map((portfolio, idx) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                isNew={newPortfolio?.id === portfolio.id}
                isOfficial={idx === 0}
                index={idx}
              />
            ))}
          </AnimatePresence>
          <AddPortfolioCard />
        </div>
      </div>
    </div>
  )
}
