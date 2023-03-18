'use client'

import * as React from 'react'

import { useStore } from '@/store'

const FramerMonitor = ({ children }: React.PropsWithChildren) => {
	const url = useStore((state) => state.url)

	return (
		<div
			className="relative w-full pointer-events-none data-[show=true]:pointer-events-auto"
			data-show={url ? 'true' : 'false'}>
			<div className="w-full h-0 pt-[56.25%]" />
			<div className="absolute top-0 right-0 bottom-0 left-0 ">{children}</div>
		</div>
	)
}

FramerMonitor.displayName = 'FramerMonitor'

export default FramerMonitor
