'use client'

import * as React from 'react'

import { useStore } from '@/store'

import CrawlerList from './list'
import CrawlerSelectorHint from './selector-hint'
import CrawlerSubmitter from './submitter'

const Crawler = () => {
	const url = useStore((state) => state.url)

	if (!url) return null
	return (
		<div className="relative w-full h-full flex flex-col">
			<div className="flex-none mb-2 text-lg font-semibold">Cralwer Logger</div>
			<div className="flex-none mb-4">
				<CrawlerSelectorHint />
			</div>
			<div className="flex-auto mb-2 w-full h-full relative">
				<div className="w-full h-full overflow-y-scroll">
					<CrawlerList />
				</div>
			</div>
			<div className="flex-none">
				<CrawlerSubmitter />
			</div>
		</div>
	)
}

export default Crawler
