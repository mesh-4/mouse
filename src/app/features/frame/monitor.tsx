import * as React from 'react'

import styles from './monitor.module.css'

const FramerMonitor = ({ children }: React.PropsWithChildren) => {
	return (
		<div className={styles.container}>
			<div className={styles['container--spacer']} />
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
				}}>
				{children}
			</div>
		</div>
	)
}

export default FramerMonitor
