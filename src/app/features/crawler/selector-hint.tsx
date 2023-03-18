import * as React from 'react'

import { useStore } from '@/store'

const CrawlerSelectorHint = () => {
	const selector = useStore((state) => state.currentSelector)

	return (
		<div className="w-full h-[30px] p-1 rounded border border-gray-500 bg-gray-200 text-sm text-ellipsis overflow-hidden">
			{selector}
		</div>
	)
}

CrawlerSelectorHint.displayName = 'CrawlerSelectorHint'

export default CrawlerSelectorHint
