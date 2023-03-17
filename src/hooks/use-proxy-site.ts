import useSWR from 'swr'

const fetcher = (...args: Parameters<typeof fetch>): Promise<string> => {
	return fetch(...args).then((res: Response) => res.text() as Promise<string>)
}

export const useProxySite = (url: string) => {
	const { data, error, isLoading } = useSWR<string>(url ? `/api/proxy-site?url=${url}` : null, fetcher, {
		revalidateOnFocus: false,
	})

	return { srcDoc: data, error, isLoading }
}
