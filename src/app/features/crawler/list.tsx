import * as React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List, ListChildComponentProps, areEqual } from 'react-window'

import { useStore } from '@/store'
import type { PreviewItem } from '@/types'

const CrawlerListRow = React.memo(({ data, index, style }: ListChildComponentProps<PreviewItem[]>) => {
	const item = data[index]

	return (
		<div className="px-2" style={style}>
			<div className="flex">
				<div className="flex-none mr-2 w-12 h-[27px] relative">
					<div
						className="w-full h-full bg-center bg-no-repeat bg-cover bg-slate-500"
						style={{ backgroundImage: `url(${item.socialImage})` }}
					/>
				</div>
				<div className="flex-auto text-sm">{item.title}</div>
			</div>
		</div>
	)
}, areEqual)

const CrawlerList = () => {
	const items = useStore((state) => state.crawledItems)

	return (
		<AutoSizer disableHeight>
			{({ width }) => (
				<List height={items.length * 60} width={width} itemCount={items.length} itemData={items} itemSize={60}>
					{CrawlerListRow}
				</List>
			)}
		</AutoSizer>
	)
}

CrawlerList.displayName = 'CrawlerList'

export default CrawlerList
