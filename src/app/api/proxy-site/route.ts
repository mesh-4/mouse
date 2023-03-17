import url from 'url'

import { crawlFetcher } from '@/crawl/fetcher'

export async function GET(request: Request) {
	try {
		const requestUrl = url.parse(request.url, true)
		const { url: target } = requestUrl.query
		if (!target) {
			return new Response('query url is required', {
				status: 400,
			})
		}

		let targetURL: URL
		let sourceURL: URL
		try {
			targetURL = new URL(target as string)
			sourceURL = new URL('/', targetURL.toString())
		} catch {
			return new Response('invalid url', {
				status: 400,
			})
		}

		const result = await crawlFetcher(targetURL.toString())
		if (!result.ok) {
			return new Response('invalid url', {
				status: 400,
			})
		}

		const html = await result.text()
		const baseTag = `<head>\n<base href="${sourceURL.toString()}" />\n`

		return new Response(html.split('<head>').join(baseTag), {
			status: 200,
			headers: {
				'Content-Type': 'text/html',
			},
		})
	} catch {
		return new Response('internal error', {
			status: 500,
		})
	}
}
