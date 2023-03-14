export const fetcher = <T>(...args: Parameters<typeof fetch>): Promise<T> => {
	return fetch(...args).then((res: Response) => res.json() as Promise<T>)
}

export const htmlFetcher = (...args: Parameters<typeof fetch>): Promise<string> => {
	return fetch(...args).then((res: Response) => res.text() as Promise<string>)
}
