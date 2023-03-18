'use client'

import * as React from 'react'

import { useStore } from '@/store'

import SearchForm from './form'

const Search = () => {
	const url = useStore((state) => state.url)

	return (
		<div
			className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md data-[active=true]:top-[5%] transition-transform"
			data-active={url ? 'true' : 'false'}>
			<SearchForm url={url} />
		</div>
	)
}

Search.displayName = 'Search'

export default Search
