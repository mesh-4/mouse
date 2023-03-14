import * as React from 'react'

import styles from './dashboard.module.css'

import FramerMonitor from './features/frame/monitor'
import FrameCore from './features/frame/core'

import LoggerContainer from './features/logger/container'
import LoggerContent from './features/logger/content'

const Dashboard = () => {
	return (
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
	)
}

export default Dashboard
