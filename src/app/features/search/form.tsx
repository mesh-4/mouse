'use client'

import * as React from 'react'
import { FiXCircle } from 'react-icons/fi'

import { useStore } from '@/store'

type Props = {
	url?: string
}

const SearchForm = ({ url = '' }: Props) => {
	const setUrl = useStore((state) => state.setUrl)

	const inputRef = React.useRef<HTMLInputElement>(null)

	React.useEffect(() => {
		if (url && inputRef.current) {
			inputRef.current.value = url
		}
	}, [url])

	const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setUrl('')
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const target = formData.get('target')
		if (typeof target === 'string') setUrl(target)
	}

	return (
		<form className="flex w-full" onSubmit={handleSubmit}>
			<div className="flex-auto mr-2 w-full relative flex">
				<input
					ref={inputRef}
					className="w-full rounded pl-2 bg-transparent placeholder:text-gray-500 border border-purple-400 hover:border-purple-600 focus:border-purple-600 focus:outline-none"
					type="url"
					name="target"
					placeholder="Enter site url"
					required
					pattern="^(https?):\/\/[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})(:\d{1,5})?(\/[^\s]*)?$"
				/>
				<button
					type="button"
					className="absolute aria-hidden:hidden top-1/2 right-4 text-gray-400 bg-transparent -translate-y-1/2 cursor-pointer text-md hover:text-gray-500 transition-colors"
					aria-hidden={url ? 'false' : 'true'}
					aria-label="reset"
					onClick={handleReset}>
					<FiXCircle />
				</button>
			</div>
			<button
				type="submit"
				className="px-4 cursor-pointer rounded text-white py-2 flex items-center justify-center bg-purple-600 hover:bg-purple-700 disabled:bg-purple-100 disabled:pointer-events-none">
				Search
			</button>
		</form>
	)
}

SearchForm.displayName = 'SearchForm'

export default SearchForm
