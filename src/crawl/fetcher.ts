import { MOCK_UA } from '@/constants'

export const crawlFetcher = async (target: string) => {
	return fetch(target, {
		method: 'GET',
		headers: {
			'Content-Type': 'text/html',
			'User-Agent': MOCK_UA,
		},
	})
}
