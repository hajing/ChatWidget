import { create } from 'zustand'
import { getMockResponse, generateTitle } from '@/lib/mock-responses'
import { SCENARIOS, delay as delayFn } from '@/lib/scenarios'
import { useStageStore } from '@/stores/stage-store'

let nextMsgId = 1
let streamTimer = null
let phaseTimer = null
let abortController = null

const _confirmResolvers = new Map()

export function registerConfirmAction(actionId) {
  return new Promise((resolve) => {
    _confirmResolvers.set(actionId, resolve)
  })
}

export function resolveConfirmAction(actionId, action) {
  const resolver = _confirmResolvers.get(actionId)
  if (resolver) {
    resolver(action)
    _confirmResolvers.delete(actionId)
  }
}

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
  isScenarioRunning: false,

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
    if (abortController) {
      abortController.abort()
      abortController = null
    }
    useStageStore.getState().reset()
    set({ activeSessionId: null, isThinking: false, isStreaming: false, isScenarioRunning: false })
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
    const assistantMsg = { id: nextMsgId++, role: 'assistant', thinking: '', content: '', blocks: [] }
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

  // --- scenario engine ---

  runScenario: async (scenarioId) => {
    const scenario = SCENARIOS[scenarioId]
    if (!scenario) return

    stopTimers()
    if (abortController) {
      abortController.abort()
    }
    abortController = new AbortController()
    const signal = abortController.signal

    let { activeSessionId } = get()
    if (!activeSessionId) {
      activeSessionId = get().createSession()
    }

    const sid = activeSessionId
    const userMsg = { id: nextMsgId++, role: 'user', content: scenario.prompt }
    const assistantMsg = { id: nextMsgId++, role: 'assistant', thinking: '', content: '', blocks: [] }
    const msgId = assistantMsg.id

    const session = get().sessions[sid]
    set((s) => ({
      sessions: {
        ...s.sessions,
        [sid]: {
          ...s.sessions[sid],
          messages: [...session.messages, userMsg, assistantMsg],
          title: session.title || scenario.title,
        },
      },
      isScenarioRunning: true,
      isThinking: false,
      isStreaming: false,
    }))

    // Helper: update message field
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

    // Helper: stream text as promise
    const streamTextAsync = (field, fullText, speed) => {
      return new Promise((resolve, reject) => {
        if (signal.aborted) { reject(new DOMException('Aborted', 'AbortError')); return }
        let idx = 0
        // Get current content to append to
        const currentMsg = get().sessions[sid]?.messages.find((m) => m.id === msgId)
        const existingText = currentMsg?.[field] || ''
        const combinedText = existingText + fullText

        streamTimer = setInterval(() => {
          if (signal.aborted) {
            clearInterval(streamTimer)
            streamTimer = null
            reject(new DOMException('Aborted', 'AbortError'))
            return
          }
          const chunk = Math.floor(Math.random() * 3) + 2
          idx = Math.min(idx + chunk, combinedText.length)
          updateMsg(field, combinedText.slice(0, idx))
          if (idx >= combinedText.length) {
            clearInterval(streamTimer)
            streamTimer = null
            resolve()
          }
        }, speed)
      })
    }

    // Helper: add block to message
    const addBlock = (block) => {
      set((s) => {
        const sess = s.sessions[sid]
        if (!sess) return s
        return {
          sessions: {
            ...s.sessions,
            [sid]: {
              ...sess,
              messages: sess.messages.map((m) =>
                m.id === msgId ? { ...m, blocks: [...(m.blocks || []), block] } : m,
              ),
            },
          },
        }
      })
    }

    // Helper: update block at index
    const updateBlock = (blockIdx, updates) => {
      set((s) => {
        const sess = s.sessions[sid]
        if (!sess) return s
        return {
          sessions: {
            ...s.sessions,
            [sid]: {
              ...sess,
              messages: sess.messages.map((m) => {
                if (m.id !== msgId) return m
                const newBlocks = [...(m.blocks || [])]
                newBlocks[blockIdx] = { ...newBlocks[blockIdx], ...updates }
                return { ...m, blocks: newBlocks }
              }),
            },
          },
        }
      })
    }

    // Helper: update task item in a task-list block
    const updateTaskItem = (blockIdx, itemIdx, done) => {
      set((s) => {
        const sess = s.sessions[sid]
        if (!sess) return s
        return {
          sessions: {
            ...s.sessions,
            [sid]: {
              ...sess,
              messages: sess.messages.map((m) => {
                if (m.id !== msgId) return m
                const newBlocks = [...(m.blocks || [])]
                const block = { ...newBlocks[blockIdx] }
                const newItems = [...block.items]
                newItems[itemIdx] = { ...newItems[itemIdx], done }
                block.items = newItems
                newBlocks[blockIdx] = block
                return { ...m, blocks: newBlocks }
              }),
            },
          },
        }
      })
    }

    // Helper: get current block count
    const getBlockCount = () => {
      const msg = get().sessions[sid]?.messages.find((m) => m.id === msgId)
      return msg?.blocks?.length || 0
    }

    const chatHelpers = {
      streamThinking: (text) => streamTextAsync('thinking', text, 20),
      streamContent: (text) => streamTextAsync('content', text, 15),
      addBlock,
      updateBlock,
      updateTaskItem,
      getBlockCount,
      setThinking: (val) => set({ isThinking: val }),
      setStreaming: (val) => set({ isStreaming: val }),
      registerConfirmAction,
    }

    const stageStore = useStageStore.getState()

    try {
      await scenario.run({
        chat: chatHelpers,
        stage: stageStore,
        delay: (ms) => delayFn(ms, signal),
      })
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Scenario failed:', e)
      }
    } finally {
      set({ isScenarioRunning: false, isThinking: false, isStreaming: false })
      stopTimers()
    }
  },
}))
