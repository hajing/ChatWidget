import { create } from 'zustand'

export const useStageStore = create((set) => ({
  currentView: 'client-list',
  viewParams: {},
  playground: {
    isOpen: false,
    isLoading: true,
    title: '',
    content: null,
  },
  pendingUpdates: {},

  navigate: (view, params = {}) => {
    set({ currentView: view, viewParams: params })
  },

  openPlayground: (title) => {
    set({
      playground: { isOpen: true, isLoading: true, title, content: null },
    })
  },

  updatePlayground: (contentKey) => {
    set((s) => ({
      playground: { ...s.playground, isLoading: false, content: contentKey },
    }))
  },

  closePlayground: () => {
    set({
      playground: { isOpen: false, isLoading: true, title: '', content: null },
    })
  },

  applyPendingUpdate: (key, data) => {
    set((s) => ({
      pendingUpdates: { ...s.pendingUpdates, [key]: data },
    }))
  },

  reset: () => {
    set({
      currentView: 'client-list',
      viewParams: {},
      playground: { isOpen: false, isLoading: true, title: '', content: null },
      pendingUpdates: {},
    })
  },
}))
