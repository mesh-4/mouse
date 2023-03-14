'use client'

import * as React from 'react'

import { useStore } from '@/store'

import styles from './monitor.module.css'

const FramerMonitor = ({ children }: React.PropsWithChildren) => {
	const url = useStore((state) => state.url)

	return (
		<div className={styles.container} data-show={url ? 'true' : 'false'}>
			<div className={styles['container--spacer']} />
			<div className={styles['container--content']}>{children}</div>
		</div>
	)
}

export default FramerMonitor
