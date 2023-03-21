import { create } from 'zustand'

import type { PreviewItem } from '@/types'

type Store = {
	url: string
	setUrl: (val: string) => void
	currentSelector: string
	setCurrentSelector: (val: string) => void
	crawledItems: PreviewItem[]
	setCrawledItems: (val: PreviewItem[]) => void

	logs: string[]
	setLogs: (val: string[]) => void
	addLog: (val: string) => void
}

export const useStore = create<Store>((set) => ({
	url: '',
	setUrl: (val) => set({ url: val }),
	currentSelector: '',
	setCurrentSelector: (val) => set({ currentSelector: val }),
	crawledItems: [],
	setCrawledItems: (val) => set({ crawledItems: val }),

	logs: [],
	setLogs: (val) => set({ logs: val }),
	addLog: (val) => set((state) => ({ logs: [...state.logs, val] })),
}))
