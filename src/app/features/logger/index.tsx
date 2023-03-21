'use client'
import * as React from 'react'

import { useStore } from '@/store'

const Logger = () => {
	const bottomRef = React.useRef<HTMLDivElement>(null)
	const logs = useStore((state) => state.logs)

	React.useEffect(() => {
		if (!bottomRef.current) return
		bottomRef.current.scrollIntoView({ behavior: 'smooth' })
	}, [logs])

	return (
		<div className="w-full h-full overflow-y-auto">
			{logs.map((log, idx) => (
				<p key={idx}>{log}</p>
			))}
			<div ref={bottomRef} className="w-full h-[1px]" />
		</div>
	)
}

Logger.displayName = 'Logger'

export default Logger
