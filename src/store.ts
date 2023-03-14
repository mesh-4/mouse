import { create } from 'zustand'

type Store = {
	url: string
	setUrl: (val: string) => void
	currentSelector: string
	setCurrentSelector: (val: string) => void
}

export const useStore = create<Store>((set) => ({
	url: '',
	setUrl: (val) => set({ url: val }),
	currentSelector: '',
	setCurrentSelector: (val) => set({ currentSelector: val }),
}))
