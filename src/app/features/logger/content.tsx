'use client'

import * as React from 'react'

import { useStore } from '@/store'

const LoggerContent = () => {
	const currentSelector = useStore((state) => state.currentSelector)

	return (
		<div>
			<div>{currentSelector}</div>
		</div>
	)
}

export default LoggerContent
