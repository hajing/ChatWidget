import { FileDown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PdfDownloadBlock({ block }) {
  const handleDownload = () => {
    alert(`Mock download: ${block.filename}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 py-2.5 px-3 my-1 rounded-xl bg-gray-50 border border-gray-100 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={handleDownload}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 shrink-0">
        <FileDown className="w-4 h-4 text-red-500" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-gray-700 font-medium truncate">{block.filename}</p>
        <p className="text-xs text-gray-400">Click to download PDF report</p>
      </div>
    </motion.div>
  )
}
