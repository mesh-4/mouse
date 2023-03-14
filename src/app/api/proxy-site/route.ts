import url from 'url'

import { formatUrl, getOrigin } from '@/utils'
import { MOCK_UA } from '@/constants'

export async function GET(request: Request) {
	try {
		const pareseUrl = url.parse(request.url, true)
		const { url: target } = pareseUrl.query

		if (typeof target !== 'string') {
			return new Response('invalid input', {
				status: 400,
			})
		}

		const formatedUrl = formatUrl(target)
		const result = await fetch(formatedUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'text/html',
				'User-Agent': MOCK_UA,
			},
		})
		if (!result.ok) {
			return new Response('invalid url', {
				status: 400,
			})
		}

		const html = await result.text()
		const baseTag = `<head>\n<base href="${getOrigin(formatedUrl)}" />\n`

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
