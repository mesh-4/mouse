import * as React from 'react'
import { FiGithub, FiTwitter } from 'react-icons/fi'

const Footer = () => {
	return (
		<footer className="w-full h-6 px-2 flex items-center justify-between absolute bottom-0 border-t border-gray-500">
			<p className="text-sm">Made by Mesh Sun</p>

			<div className="flex items-center gap-1">
				<a href="https://github.com/mesh-4/mouse" target="_blank" rel="noopener noreferrer">
					<div className="flex items-center text-sm mr-2">
						<FiGithub className="mr-1" />
						Github
					</div>
				</a>
				<a href="https://twitter.com/senlima4" target="_blank" rel="noopener noreferrer">
					<div className="flex items-center text-sm ">
						<FiTwitter className="mr-1" />
						Twitter
					</div>
				</a>
			</div>
		</footer>
	)
}

Footer.displayName = 'Footer'

export default Footer
