import { useState } from 'react'
import { CLIENTS } from '@/lib/mock-data'
import { useStageStore } from '@/stores/stage-store'
import { motion } from 'framer-motion'
import {
  Search,
  SlidersHorizontal,
  Plus,
  LayoutGrid,
  List,
  TrendingUp,
  TrendingDown,
  Mic,
} from 'lucide-react'

function ClientCard({ client, highlighted, recording, isNew, index }) {
  const borderClass = isNew
    ? 'border-[#078d39] ring-1 ring-[#078d39]/20'
    : highlighted
      ? 'border-[#cb3d00] ring-1 ring-[#cb3d00]/20'
      : recording
        ? 'border-red-400 ring-1 ring-red-400/20'
        : 'border-[#e6e9f4]'

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
          : { delay: index * 0.06, duration: 0.35 }
      }
      className={`relative rounded-[10px] border bg-white p-5 transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${borderClass}`}
    >
      {/* Tag at top-right corner */}
      {isNew ? (
        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#078d39] to-[#10b050] text-white text-[12px] font-medium">
          New
        </span>
      ) : recording ? (
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500 text-white text-[12px] font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          Recording
        </span>
      ) : highlighted ? (
        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#cb3d00] to-[#e85d2a] text-white text-[12px] font-medium">
          Alert
        </span>
      ) : (
        client.changePositive && (
          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#2263f8] to-[#4b83ff] text-white text-[12px] font-medium">
            Active
          </span>
        )
      )}

      {/* Avatar + Name + Email */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 shrink-0 rounded-full ${client.color} flex items-center justify-center text-white text-[13px] font-semibold`}
        >
          {client.initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[16px] font-semibold text-black truncate leading-tight">
            {client.name}
          </h3>
          <p className="text-[14px] text-[#5a607f] truncate leading-tight mt-0.5">
            {client.email}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-[12px] text-[#9ba1ae] mb-1">Total AUM</p>
          <p className="text-[14px] font-semibold text-black">{client.totalAUM}</p>
        </div>
        <div>
          <p className="text-[12px] text-[#9ba1ae] mb-1">Portfolios</p>
          <p className="text-[14px] font-semibold text-black">{client.portfolioCount}</p>
        </div>
        <div>
          <p className="text-[12px] text-[#9ba1ae] mb-1">Today</p>
          <div className="flex items-center gap-1">
            {client.changePositive ? (
              <TrendingUp className="w-3.5 h-3.5 text-[#078d39]" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-[#cb3d00]" />
            )}
            <p
              className={`text-[14px] font-semibold ${
                client.changePositive ? 'text-[#078d39]' : 'text-[#cb3d00]'
              }`}
            >
              {client.change}
            </p>
          </div>
        </div>
      </div>

      {/* Divider + Bottom */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#d7dde7]">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#d9e6f9] text-[#2263f8] text-[12px] font-medium">
          {client.riskProfile}
        </span>
        <div className="flex items-center gap-2">
          {recording && (
            <span className="p-1 rounded-full bg-red-50">
              <Mic className="w-3.5 h-3.5 text-red-500" />
            </span>
          )}
          <span className="text-[12px] text-[#9ba1ae]">Since {client.joinDate}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function ClientListPage() {
  const viewParams = useStageStore((s) => s.viewParams)
  const pendingUpdates = useStageStore((s) => s.pendingUpdates)
  const highlightClients = viewParams.highlightClients || []
  const recordingClient = viewParams.recordingClient || null
  const [viewMode, setViewMode] = useState('grid')

  const newClient = pendingUpdates.newClient
  const allClients = newClient
    ? [...CLIENTS, newClient]
    : CLIENTS

  return (
    <div className="h-full flex flex-col bg-[#f3f3f3]">
      {/* Header */}
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-[28px] font-bold text-black leading-tight">
              Client List
            </h1>
            <p className="text-[14px] text-[#5a607f] mt-1">
              Customer info &amp; assets, supports adding, viewing details &amp;
              management.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {highlightClients.length > 0 && (
              <span className="px-3 py-1.5 rounded-lg bg-[#cb3d00]/10 text-[#cb3d00] text-[13px] font-medium">
                {highlightClients.length} need attention
              </span>
            )}
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2263f8] text-white text-[14px] font-medium hover:bg-[#1b52d6] transition-colors">
              <Plus className="w-4 h-4" />
              Add Customer
            </button>
          </div>
        </div>

        {/* Search bar + filter + view switcher */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ba1ae]" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#e6e9f4] bg-white text-[14px] text-black placeholder:text-[#9ba1ae] outline-none focus:border-[#2263f8] focus:ring-1 focus:ring-[#2263f8]/20 transition-colors"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 text-[14px] text-[#2263f8] font-medium hover:underline whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4" />
            Advanced Filter
          </button>
          <div className="flex items-center border border-[#e6e9f4] rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#2263f8] text-white'
                  : 'bg-white text-[#6e768c] hover:bg-[#f3f3f3]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#2263f8] text-white'
                  : 'bg-white text-[#6e768c] hover:bg-[#f3f3f3]'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Card grid */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="grid grid-cols-3 gap-4">
          {allClients.map((client, idx) => (
            <ClientCard
              key={client.id}
              client={client}
              highlighted={highlightClients.includes(client.id)}
              recording={recordingClient === client.id}
              isNew={newClient?.id === client.id}
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
