'use client'

import * as React from 'react'

import styles from './content.module.css'

import { useStore } from '@/store'

const LoggerContent = () => {
	const url = useStore((state) => state.url)
	const currentSelector = useStore((state) => state.currentSelector)

	if (!url) {
		return null
	}

	return (
		<div className={styles.wrapper}>
			<p className={styles.title}>操作記錄</p>
			<div className={styles.content}>{currentSelector}</div>
		</div>
	)
}

export default LoggerContent
