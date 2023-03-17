'use client'

import * as React from 'react'

import styles from './content.module.css'

import { useStore } from '@/store'
import CrawlBtn from './crawl-btn'
import CrawledItem from './item'

const LoggerContent = () => {
	const url = useStore((state) => state.url)
	const currentSelector = useStore((state) => state.currentSelector)
	const crawledItems = useStore((state) => state.crawledItems)

	if (!url) {
		return null
	}
	return (
		<div className={styles.wrapper}>
			<p className={styles.title}>操作記錄</p>

			<div className={styles.content}>
				<div className={styles.selector}>{currentSelector}</div>

				{crawledItems.map((item) => (
					<CrawledItem key={item.url} data={item} />
				))}
			</div>

			<div className={styles.submitor}>
				<CrawlBtn url={url} selector={currentSelector} />
			</div>
		</div>
	)
}

export default LoggerContent
