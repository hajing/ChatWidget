export default function UserMessage({ content }) {
  return (
    <div className="flex justify-end px-6 py-1">
      <div className="max-w-[85%] bg-[#f4f4f4] rounded-3xl px-5 py-2.5 text-[15px] leading-relaxed text-gray-900 break-words">
        {content}
      </div>
    </div>
  )
}
