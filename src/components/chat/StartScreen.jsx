import { SCENARIOS } from '@/lib/scenarios'

const SCENARIO_LIST = Object.values(SCENARIOS)

export default function StartScreen({ greeting, onSelectScenario, disabled }) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-3">
      <div className="flex flex-col min-h-full">
        <div className="mt-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 px-1">
            {greeting}
          </h2>
          <div className="flex flex-col gap-1 w-full">
            {SCENARIO_LIST.map(({ id, icon: Icon, title, subtitle }) => (
              <button
                key={id}
                disabled={disabled}
                onClick={() => onSelectScenario(id)}
                className="group flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <span className="flex items-center justify-center w-5 h-5 shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </span>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <span className="block text-[13px] font-medium text-gray-700 truncate">{title}</span>
                  <span className="block text-[11px] text-gray-400 truncate">{subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
