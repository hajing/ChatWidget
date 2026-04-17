import { useStageStore } from '@/stores/stage-store'
import { motion, AnimatePresence } from 'framer-motion'
import StageWelcome from './StageWelcome'
import Playground from './Playground'
import Sidebar from './Sidebar'
import StageHeader from './StageHeader'
import ClientListPage from './pages/ClientListPage'
import PortfolioListPage from './pages/PortfolioListPage'
import PortfolioDetailPage from './pages/PortfolioDetailPage'
import FundListPage from './pages/FundListPage'

const VIEW_MAP = {
  welcome: StageWelcome,
  'client-list': ClientListPage,
  'portfolio-list': PortfolioListPage,
  'portfolio-detail': PortfolioDetailPage,
  'fund-list': FundListPage,
}

const BREADCRUMB_MAP = {
  'client-list': ['Client List'],
  'portfolio-list': ['Asset Management', 'Client List', 'Client Details'],
  'portfolio-detail': ['Asset Management', 'Client List', 'Client Details', 'Portfolio'],
  'fund-list': ['Fund Library'],
}

export default function MainStage() {
  const currentView = useStageStore((s) => s.currentView)
  const ViewComponent = VIEW_MAP[currentView] || StageWelcome
  const breadcrumbs = BREADCRUMB_MAP[currentView] || []

  return (
    <div className="relative flex h-full bg-[#f3f3f3] overflow-hidden">
      <Sidebar activeNav={currentView} />
      <div className="flex-1 flex flex-col min-w-0">
        <StageHeader breadcrumbs={breadcrumbs} />
        <div className="flex-1 overflow-auto p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <ViewComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Playground />
    </div>
  )
}
