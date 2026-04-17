import { Users, Database, Briefcase, Shield, LayoutGrid, Settings, HelpCircle } from 'lucide-react'

const NAV_ITEMS = [
  { key: 'client-list', label: 'Client List', icon: Users },
  { key: 'fund-list', label: 'Fund Library', icon: Database },
  { key: 'model-portfolio', label: 'Model Portfolio', icon: Briefcase },
  { key: 'advisor-controls', label: 'Advisor Controls', icon: Shield },
  { key: 'guard-rail', label: 'Guard Rail', icon: LayoutGrid },
]

const BOTTOM_ITEMS = [
  { key: 'settings', label: 'Settings', icon: Settings },
  { key: 'help', label: 'Help & Support', icon: HelpCircle },
]

export default function Sidebar({ activeNav }) {
  return (
    <aside className="flex flex-col w-[220px] min-w-[220px] h-full bg-white shadow-[4px_0_16px_0_rgba(0,0,0,0.06)] z-10">
      {/* Logo area */}
      <div className="flex items-center h-16 px-4 gap-2.5">
        <div className="w-7 h-7 rounded-md bg-[#2263f8] flex items-center justify-center">
          <span className="text-white text-xs font-bold">T</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#2263f8] leading-tight tracking-wide">
            THALEON
          </span>
          <span className="text-[8px] text-gray-400 leading-tight tracking-wider">
            CLARITY. CONTROL. CONFIDENCE.
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex flex-col gap-0.5 px-3 mt-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.key
          const Icon = item.icon
          return (
            <div
              key={item.key}
              className={`flex items-center gap-3 h-[44px] px-4 rounded-lg cursor-pointer transition-colors ${
                isActive
                  ? 'bg-[rgba(34,99,248,0.12)] text-[#2263f8] font-bold'
                  : 'text-[#5a607f] font-normal hover:bg-gray-50'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="text-sm">{item.label}</span>
            </div>
          )
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom section */}
      <div className="px-3 pb-4">
        <div className="px-4 mb-1">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">
            Other Information
          </span>
        </div>
        <nav className="flex flex-col gap-0.5">
          {BOTTOM_ITEMS.map((item) => {
            const isActive = activeNav === item.key
            const Icon = item.icon
            return (
              <div
                key={item.key}
                className={`flex items-center gap-3 h-[44px] px-4 rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[rgba(34,99,248,0.12)] text-[#2263f8] font-bold'
                    : 'text-[#5a607f] font-normal hover:bg-gray-50'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                <span className="text-sm">{item.label}</span>
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
