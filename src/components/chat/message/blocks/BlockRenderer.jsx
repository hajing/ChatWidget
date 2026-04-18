import WebSearchBlock from './WebSearchBlock'
import ToolCallBlock from './ToolCallBlock'
import PdfDownloadBlock from './PdfDownloadBlock'
import TaskListBlock from './TaskListBlock'
import SttTranscriptBlock from './SttTranscriptBlock'
import ConfirmCardBlock from './ConfirmCardBlock'
import ActionButtonsBlock from './ActionButtonsBlock'
import NewsAnalysisBlock from './NewsAnalysisBlock'
import FundComparisonBlock from './FundComparisonBlock'
import WebScrapeBlock from './WebScrapeBlock'

const BLOCK_MAP = {
  'web-search': WebSearchBlock,
  'tool-call': ToolCallBlock,
  'pdf-download': PdfDownloadBlock,
  'task-list': TaskListBlock,
  'stt-transcript': SttTranscriptBlock,
  'confirm-card': ConfirmCardBlock,
  'action-buttons': ActionButtonsBlock,
  'news-analysis': NewsAnalysisBlock,
  'fund-comparison': FundComparisonBlock,
  'web-scrape': WebScrapeBlock,
}

// Action blocks appear before thinking; result blocks appear after content
const TOP_TYPES = new Set(['web-search', 'tool-call', 'stt-transcript'])

function renderBlocks(list) {
  if (!list || list.length === 0) return null
  return (
    <div className="px-1">
      {list.map((block, idx) => {
        const Component = BLOCK_MAP[block.type]
        if (!Component) return null
        return <Component key={idx} block={block} />
      })}
    </div>
  )
}

export function TopBlocks({ blocks }) {
  return renderBlocks(blocks?.filter((b) => TOP_TYPES.has(b.type)))
}

export function BottomBlocks({ blocks }) {
  return renderBlocks(blocks?.filter((b) => !TOP_TYPES.has(b.type)))
}

export default function BlockRenderer({ blocks }) {
  return renderBlocks(blocks)
}
