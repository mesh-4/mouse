import * as React from 'react'

import { useStore } from '@/store'
import { usePreviewCrawl } from '@/hooks'

const CrawlerSubmitter = () => {
	const url = useStore((state) => state.url)
	const selector = useStore((state) => state.currentSelector)
	const setCrawledItems = useStore((state) => state.setCrawledItems)

	const { data, trigger, isMutating } = usePreviewCrawl()

	const handleCrawl = () => {
		trigger({ url, selector })
	}

	React.useEffect(() => {
		if (data) {
			setCrawledItems(data)
		}
	}, [data])

	return (
		<button
			type="button"
			className="w-full cursor-pointer rounded text-white py-2 flex items-center justify-center bg-purple-500 hover:bg-purple-600 disabled:bg-purple-100 disabled:pointer-events-none"
			disabled={!selector || isMutating}
			onClick={handleCrawl}>
			Crawl
		</button>
	)
}

CrawlerSubmitter.displayName = 'CrawlerSubmitter'

export default CrawlerSubmitter
