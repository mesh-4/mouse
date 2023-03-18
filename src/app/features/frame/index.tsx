import * as React from 'react'

import FrameMonitor from './monitor'
import FrameCore from './core'

const Frame = () => {
	return (
		<FrameMonitor>
			<FrameCore />
		</FrameMonitor>
	)
}

Frame.displayName = 'Frame'

export default Frame
