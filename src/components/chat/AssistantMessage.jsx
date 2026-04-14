import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdownComponents = {
  p: ({ children }) => (
    <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 last:mb-0 pl-6 space-y-1.5 list-disc">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 last:mb-0 pl-6 space-y-1.5 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  h3: ({ children }) => (
    <h3 className="text-[15px] font-semibold mt-4 mb-2">{children}</h3>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  pre: ({ children }) => (
    <div className="my-3 rounded-lg overflow-hidden bg-[#1e1e1e]">
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed">
        {children}
      </pre>
    </div>
  ),
  code: ({ node, children, ...props }) => {
    const isBlock = node?.position?.start?.line !== node?.position?.end?.line
      || node?.parent?.tagName === 'pre'
    if (props.className || isBlock) {
      return <code className="text-gray-200 font-mono">{children}</code>
    }
    return (
      <code className="px-1.5 py-0.5 bg-gray-100 rounded text-[13px] font-mono">
        {children}
      </code>
    )
  },
}

export default function AssistantMessage({ content, isStreaming }) {
  return (
    <div className="px-6 py-2 text-[15px] text-gray-900">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-[3px] h-[18px] bg-gray-400 ml-0.5 animate-pulse align-text-bottom" />
      )}
    </div>
  )
}
