import type { Metadata } from 'next'

import styles from './page.module.css'

import SearchContainer from './features/search/container'
import SearchForm from './features/search/form'

import FramerMonitor from './features/frame/monitor'
import FrameCore from './features/frame/core'

import LoggerContainer from './features/logger/container'
import LoggerContent from './features/logger/content'

export const metadata: Metadata = {
	title: 'Mouse',
	description: 'Mouse is a interactive crawl interface.',
}

export default function Home() {
	return (
		<main style={{ position: 'relative', height: '100vh', width: '100vw' }}>
			<SearchContainer>
				<SearchForm />
			</SearchContainer>
			<div className={styles.dashboard}>
				<div className={styles.dashboard__frame}>
					<FramerMonitor>
						<FrameCore />
					</FramerMonitor>
				</div>
				<div className={styles.dashboard__sidebar}>
					<LoggerContainer>
						<LoggerContent />
					</LoggerContainer>
				</div>
			</div>
		</main>
	)
}
