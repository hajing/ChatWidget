import { create } from 'zustand'
import { getMockResponse, generateTitle } from '@/lib/mock-responses'

let nextMsgId = 1
let streamTimer = null
let phaseTimer = null

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function stopTimers() {
  if (streamTimer) { clearInterval(streamTimer); streamTimer = null }
  if (phaseTimer) { clearTimeout(phaseTimer); phaseTimer = null }
}

export const useChatStore = create((set, get) => ({
  sessions: {},
  activeSessionId: null,
  isThinking: false,
  isStreaming: false,

  // --- session management ---

  createSession: () => {
    stopTimers()
    const id = uid()
    set((s) => ({
      sessions: {
        ...s.sessions,
        [id]: { id, title: '', messages: [], createdAt: Date.now() },
      },
      activeSessionId: id,
      isThinking: false,
      isStreaming: false,
    }))
    return id
  },

  switchSession: (id) => {
    stopTimers()
    set({ activeSessionId: id, isThinking: false, isStreaming: false })
  },

  deleteSession: (id) => {
    set((s) => {
      const next = { ...s.sessions }
      delete next[id]
      return {
        sessions: next,
        activeSessionId: s.activeSessionId === id ? null : s.activeSessionId,
      }
    })
  },

  renameSession: (id, title) => {
    set((s) => ({
      sessions: {
        ...s.sessions,
        [id]: { ...s.sessions[id], title },
      },
    }))
  },

  resetChat: () => {
    stopTimers()
    set({ activeSessionId: null, isThinking: false, isStreaming: false })
  },

  // --- active session helpers ---

  getActiveSession: () => {
    const { sessions, activeSessionId } = get()
    return activeSessionId ? sessions[activeSessionId] : null
  },

  // --- messaging ---

  sendMessage: (content) => {
    if (!content.trim()) return

    stopTimers()
    let { activeSessionId, sessions } = get()

    if (!activeSessionId) {
      activeSessionId = get().createSession()
    }

    const session = get().sessions[activeSessionId]
    const userMsg = { id: nextMsgId++, role: 'user', content: content.trim() }
    const assistantMsg = { id: nextMsgId++, role: 'assistant', thinking: '', content: '' }
    const newMessages = [...session.messages, userMsg, assistantMsg]
    const newTitle = session.title || generateTitle(content)

    set((s) => ({
      sessions: {
        ...s.sessions,
        [activeSessionId]: { ...s.sessions[activeSessionId], messages: newMessages, title: newTitle },
      },
    }))

    const response = getMockResponse(content)
    const sid = activeSessionId
    const msgId = assistantMsg.id

    const updateMsg = (field, value) => {
      set((s) => {
        const sess = s.sessions[sid]
        if (!sess) return s
        return {
          sessions: {
            ...s.sessions,
            [sid]: {
              ...sess,
              messages: sess.messages.map((m) =>
                m.id === msgId ? { ...m, [field]: value } : m,
              ),
            },
          },
        }
      })
    }

    const streamText = (field, fullText, speed, onDone) => {
      let idx = 0
      streamTimer = setInterval(() => {
        const chunk = Math.floor(Math.random() * 3) + 2
        idx = Math.min(idx + chunk, fullText.length)
        updateMsg(field, fullText.slice(0, idx))
        if (idx >= fullText.length) {
          clearInterval(streamTimer)
          streamTimer = null
          onDone?.()
        }
      }, speed)
    }

    set({ isThinking: true })
    streamText('thinking', response.thinking, 20, () => {
      set({ isThinking: false })
      phaseTimer = setTimeout(() => {
        set({ isStreaming: true })
        streamText('content', response.content, 15, () => {
          set({ isStreaming: false })
        })
      }, 400)
    })
  },

  retryLastMessage: () => {
    const session = get().getActiveSession()
    if (!session) return
    const lastUser = [...session.messages].reverse().find((m) => m.role === 'user')
    if (!lastUser) return

    stopTimers()
    const lastIdx = session.messages.findLastIndex((m) => m.role === 'user')

    set((s) => ({
      sessions: {
        ...s.sessions,
        [session.id]: {
          ...s.sessions[session.id],
          messages: s.sessions[session.id].messages.slice(0, lastIdx),
        },
      },
      isThinking: false,
      isStreaming: false,
    }))

    setTimeout(() => get().sendMessage(lastUser.content), 50)
  },
}))
