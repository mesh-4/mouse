import * as React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'

import type { PreviewItem } from '@/types'

const ListRow = ({ data, index, style }: { data: PreviewItem[]; index: number; style: React.CSSProperties }) => {
	const item = data[index]
	return (
		<div style={style}>
			<div>{item.title}</div>
			<div>{item.url}</div>
		</div>
	)
}

type ListProps = {
	items: PreviewItem[]
}

const CrawlerList = ({ items }: ListProps) => {
	return (
		<AutoSizer disableHeight>
			{({ width }) => (
				<List height={items.length * 35} width={width} itemCount={items.length} itemData={items} itemSize={35}>
					{ListRow}
				</List>
			)}
		</AutoSizer>
	)
}

CrawlerList.displayName = 'CrawlerList'

export default CrawlerList
