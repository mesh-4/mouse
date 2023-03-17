import type { NextApiRequest, NextApiResponse } from 'next'

import { sleep } from '@/utils'
import { crawlFetcher } from '@/crawl/fetcher'
import { getAnchorList, getSiteMeta } from '@/crawl/selectors'

async function handler(request: NextApiRequest, response: NextApiResponse) {
	if (request.method !== 'POST') {
		return response.status(405).end()
	}

	try {
		const [target, selector] = request.body.split('=====')

		let url: URL
		let sourceUrl: URL
		try {
			url = new URL(target)
			sourceUrl = new URL('/', target)
		} catch (e) {
			return response.status(400).send('invalid target: url parse error')
		}

		const siteRes = await crawlFetcher(url.toString())
		if (!siteRes.ok) {
			return response.status(400).send('invalid target: site response error')
		}
		const plainHTML = await siteRes.text()
		const list = getAnchorList(plainHTML, selector)

		const result = [] as { url: string; title: string; description?: string }[]

		for (let i = 0; i < list.length; i++) {
			await sleep(500)

			const pathname = list[i]
			if (pathname.startsWith('http')) {
				continue
			}
			const itemURL = new URL(pathname, sourceUrl.toString())
			const res = await crawlFetcher(itemURL.toString())
			if (!res.ok) continue

			const plainHTML = await res.text()
			const meta = getSiteMeta(plainHTML)

			result.push({
				url: itemURL.toString(),
				title: meta.title,
				description: meta.description,
			})
		}

		return response.json(result)
	} catch (e) {
		if (e instanceof Error) {
			console.log(e.message)
		}
		return new Response('internal error', {
			status: 500,
		})
	}
}

export default handler
