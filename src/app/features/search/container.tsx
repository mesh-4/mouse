'use client'

import * as React from 'react'

import { useStore } from '@/store'

import styles from './container.module.css'

const SeachContainer = ({ children }: React.PropsWithChildren) => {
	const url = useStore((state) => state.url)

	return (
		<div className={styles.container} data-active={url ? 'true' : 'false'}>
			{children}
		</div>
	)
}

SeachContainer.displayName = 'SeachContainer'

export default SeachContainer
