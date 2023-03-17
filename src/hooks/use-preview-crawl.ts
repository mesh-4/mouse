import useSWRMutation from 'swr/mutation'

import type { PreviewItem } from '@/types'

type PreviewCrawlInput = {
	url: string
	selector: string
}

export const sendRequest = async (url: string, { arg }: { arg: PreviewCrawlInput }) => {
	const { url: target, selector } = arg
	return fetch(url, {
		method: 'POST',
		body: `${target}=====${selector}`,
	}).then((res) => res.json() as Promise<PreviewItem[]>)
}

export const usePreviewCrawl = () => {
	const mutation = useSWRMutation('/api/preview-crawl', sendRequest)
	return mutation
}
