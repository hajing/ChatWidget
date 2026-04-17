import { useState } from 'react'
import { FUNDS } from '@/lib/mock-data'
import { motion } from 'framer-motion'
import { Search, ChevronRight, ChevronLeft, SlidersHorizontal } from 'lucide-react'

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

export default function FundListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredFunds = FUNDS.filter(
    (fund) =>
      fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fund.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fund.agency.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filteredFunds.length / itemsPerPage))
  const paginatedFunds = filteredFunds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="h-full flex flex-col bg-[#f3f3f3]">
      {/* Page Header */}
      <div className="px-8 pt-8 pb-2">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between"
        >
          <div>
            <h1 className="text-[28px] font-bold text-black leading-tight">
              Fund Library
            </h1>
            <p className="text-[14px] text-[#5a607f] mt-1">
              Monitor distributors and return benchmarks in one view.
            </p>
          </div>
          <button className="px-5 py-2.5 rounded-[10px] bg-[#2263f8] text-white text-[14px] font-medium hover:bg-[#1b53d4] transition-colors">
            Fund House Selection
          </button>
        </motion.div>
      </div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="px-8 py-4 flex items-center gap-4"
      >
        {/* Agency filter pill */}
        <button className="px-4 py-2 rounded-full bg-[#2263f8] text-white text-[13px] font-medium">
          All Agencies
        </button>

        {/* Search bar */}
        <div className="flex-1 flex items-center gap-3">
          <div className="relative flex-1 max-w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e768c]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-[#e6e9f4] bg-white text-[14px] text-black placeholder:text-[#6e768c] focus:outline-none focus:border-[#2263f8] transition-colors"
            />
          </div>
          <button className="flex items-center gap-1.5 text-[14px] text-[#2263f8] font-medium hover:underline">
            <SlidersHorizontal className="w-4 h-4" />
            Advanced Filter
          </button>
        </div>

        {/* Fund Comparison button */}
        <button className="px-5 py-2.5 rounded-[10px] border border-[#e6e9f4] bg-white text-[14px] font-medium text-black hover:bg-gray-50 transition-colors">
          Fund Comparison
        </button>
      </motion.div>

      {/* Data Table */}
      <div className="flex-1 overflow-hidden px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="h-full rounded-[10px] border border-[#e6e9f4] bg-white flex flex-col overflow-hidden"
        >
          {/* Table with sticky header */}
          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="border-b-2 border-[#e6e9f4]">
                  <th className="text-left px-6 py-3 text-[14px] font-medium text-[#6e768c] w-[230px]">
                    Fund Name / Code
                  </th>
                  <th className="text-left px-4 py-3 text-[14px] font-medium text-[#6e768c] w-[120px]">
                    Agency Name
                  </th>
                  <th className="text-left px-4 py-3 text-[14px] font-medium text-[#6e768c] w-[128px]">
                    Asset Class
                  </th>
                  <th className="text-left px-4 py-3 text-[14px] font-medium text-[#6e768c] w-[150px]">
                    Style
                  </th>
                  <th className="text-right px-4 py-3 text-[14px] font-medium text-[#6e768c] w-[120px]">
                    Past 1 Year
                  </th>
                  <th className="text-right px-4 py-3 text-[14px] font-medium text-[#6e768c] w-[120px]">
                    Past 2 Year
                  </th>
                  <th className="text-right px-4 py-3 text-[14px] font-medium text-[#6e768c] w-[148px]">
                    Past 3 Year
                  </th>
                  <th className="text-center px-4 py-3 text-[14px] font-medium text-[#6e768c] w-[120px]">
                    {/* Actions */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedFunds.map((fund, idx) => (
                  <motion.tr
                    key={fund.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.12 + idx * 0.03 }}
                    className="border-b border-[#e6e9f4] hover:bg-gray-50 transition-colors h-[68px]"
                  >
                    {/* Fund Name / Code */}
                    <td className="px-6 py-3 w-[230px]">
                      <p className="font-bold text-[16px] text-black leading-tight">
                        {fund.name}
                      </p>
                      <p className="text-[14px] text-[#6e768c] mt-0.5">
                        {fund.code}
                      </p>
                    </td>
                    {/* Agency Name */}
                    <td className="px-4 py-3 text-[14px] text-[#5a607f] w-[120px]">
                      {fund.agency}
                    </td>
                    {/* Asset Class */}
                    <td className="px-4 py-3 w-[128px]">
                      <AssetClassTag label={fund.assetClass} />
                    </td>
                    {/* Style */}
                    <td className="px-4 py-3 w-[150px]">
                      <StylePill label={fund.style} />
                    </td>
                    {/* Past 1 Year */}
                    <td className="text-right px-4 py-3 w-[120px]">
                      <ReturnCell value={fund.past1Y} />
                    </td>
                    {/* Past 2 Year */}
                    <td className="text-right px-4 py-3 w-[120px]">
                      <ReturnCell value={fund.past2Y} />
                    </td>
                    {/* Past 3 Year */}
                    <td className="text-right px-4 py-3 w-[148px]">
                      <ReturnCell value={fund.past3Y} />
                    </td>
                    {/* Actions */}
                    <td className="text-center px-4 py-3 w-[120px]">
                      <button className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#d9e6f9] transition-colors">
                        <ChevronRight className="w-4 h-4 text-[#6e768c]" />
                      </button>
                    </td>
                  </motion.tr>
                ))}

                {paginatedFunds.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-16 text-[14px] text-[#6e768c]"
                    >
                      No funds found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-[#e6e9f4] bg-white">
            <p className="text-[13px] text-[#6e768c]">
              Showing {filteredFunds.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
              -{Math.min(currentPage * itemsPerPage, filteredFunds.length)} of{' '}
              {filteredFunds.length} funds
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center w-8 h-8 rounded-[6px] border border-[#e6e9f4] bg-white text-[#6e768c] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-[6px] text-[13px] font-medium transition-colors ${
                    page === currentPage
                      ? 'bg-[#2263f8] text-white'
                      : 'border border-[#e6e9f4] bg-white text-[#6e768c] hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center w-8 h-8 rounded-[6px] border border-[#e6e9f4] bg-white text-[#6e768c] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
