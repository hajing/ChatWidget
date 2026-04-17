import { Menu, ChevronRight, Bell, ChevronDown } from 'lucide-react'

export default function StageHeader({ breadcrumbs = [] }) {
  return (
    <header className="flex items-center justify-between h-14 min-h-[56px] bg-white border-b border-gray-200 px-5">
      {/* Left side: hamburger + breadcrumbs */}
      <div className="flex items-center gap-3">
        <button className="p-1 rounded hover:bg-gray-100 transition-colors">
          <Menu size={20} className="text-gray-500" />
        </button>
        <div className="flex items-center gap-1">
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1
            return (
              <div key={idx} className="flex items-center gap-1">
                {idx > 0 && <ChevronRight size={14} className="text-[#6e768c]" />}
                <span
                  className={`text-sm ${
                    isLast ? 'text-gray-900 font-medium' : 'text-[#6e768c]'
                  }`}
                >
                  {item}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right side: notification + avatar + name */}
      <div className="flex items-center gap-4">
        {/* Bell with badge */}
        <button className="relative p-1 rounded hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white leading-none">
            5
          </span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div
            className="w-8 h-8 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          />
          <span className="text-sm text-gray-700 font-medium">Xiao Zhang</span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  )
}
