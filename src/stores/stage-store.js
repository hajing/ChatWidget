import { create } from 'zustand'

export const useStageStore = create((set) => ({
  currentView: 'client-list',
  viewParams: {},
  pendingUpdates: {},

  navigate: (view, params = {}) => {
    set({ currentView: view, viewParams: params })
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
      pendingUpdates: {},
    })
  },
}))
