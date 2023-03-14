import useSWR from 'swr'

import { htmlFetcher } from '@/fetcher'

export const useProxySite = (url: string) => {
	const { data, error, isLoading } = useSWR<string>(url !== '' ? `/api/proxy-site?url=${url}` : null, htmlFetcher, {
		revalidateOnFocus: false,
	})

	return { srcDoc: data, error, isLoading }
}
