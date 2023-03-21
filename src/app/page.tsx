import type { Metadata } from 'next'

import Search from './features/search'
import Frame from './features/frame'
import Crawler from './features/crawler'
import Footer from './features/aside/footer'
import Logger from './features/logger'
import Tab from './features/tab'

export const metadata: Metadata = {
	title: 'Mouse',
	description: 'Mouse is a interactive crawl interface.',
}

export default function Home() {
	return (
		<main className="relative w-screen h-screen">
			<Search />
			<div className="flex py-[10vh] px-[2.5vw] w-full h-full">
				<div className="flex-auto w-full mr-5 flex flex-col justify-center">
					<Frame />
				</div>
				<div className="flex-none w-[400px] flex flex-col justify-center">
					<div className="w-full h-[50vh]">
						<Tab
							tabs={[
								{
									label: 'Logger',
									content: <Logger />,
								},
								{
									label: 'Crawler',
									content: <Crawler />,
								},
							]}
						/>
					</div>
				</div>
			</div>
			<Footer />
		</main>
	)
}
