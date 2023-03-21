'use client'
import * as React from 'react'

type Props = {
	tabs: { label: string; content: React.ReactNode }[]
}

const Tab = ({ tabs }: Props) => {
	const [activeTab, setActiveTab] = React.useState(0)

	return (
		<div className="w-full h-full flex flex-col">
			<div className="flex-none flex items-center justify-between">
				{tabs.map(({ label }, idx) => (
					<button key={idx} onClick={() => setActiveTab(idx)}>
						{label}
					</button>
				))}
			</div>
			<div className="flex-auto w-full h-full">{tabs[activeTab].content}</div>
		</div>
	)
}

export default React.memo(Tab)
