import * as React from 'react'

import type { PreviewItem } from '@/types'

const CrawledItem = ({ data }: { data: PreviewItem }) => {
	return (
		<div>
			<div>{data.title}</div>
			<div>{data.description}</div>
			<div>{data.url}</div>
		</div>
	)
}

CrawledItem.displayName = 'CrawledItem'

export default CrawledItem
