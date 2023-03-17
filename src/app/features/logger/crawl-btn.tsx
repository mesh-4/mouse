import * as React from 'react'
import { usePreviewCrawl } from '@/hooks'

type CrawlBtnProps = {
	url: string
	selector: string
}

const CrawlBtn = ({ url, selector }: CrawlBtnProps) => {
	const { trigger, isMutating } = usePreviewCrawl()

	const handleCrawl = () => {
		trigger({ url, selector })
	}

	return (
		<button className="button primary" disabled={isMutating} type="button" onClick={handleCrawl}>
			Crawl
		</button>
	)
}

CrawlBtn.displayName = 'CrawlBtn'

export default CrawlBtn
