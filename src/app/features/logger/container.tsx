'use client'

import * as React from 'react'

import { useStore } from '@/store'

import styles from './container.module.css'

const LoggerContainer = ({ children }: React.PropsWithChildren) => {
	const url = useStore((state) => state.url)

	return (
		<div className={styles.container} data-show={url ? 'true' : 'false'}>
			{children}
		</div>
	)
}

export default LoggerContainer
