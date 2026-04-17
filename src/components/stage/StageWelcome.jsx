export default function StageWelcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg">
        <span className="text-white text-2xl font-bold">T</span>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Thaleon</h1>
      <p className="text-sm text-gray-500 max-w-sm">
        Select a scenario from the assistant to get started. The AI will guide you through the experience.
      </p>
    </div>
  )
}
