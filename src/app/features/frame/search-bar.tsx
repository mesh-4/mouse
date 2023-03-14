'use client'

import * as React from 'react'

import { useStore } from '@/store'

import styles from './search-bar.module.css'

const SearchBar = () => {
	const setUrl = useStore((state) => state.setUrl)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const target = formData.get('target')
		if (typeof target === 'string') setUrl(target)
	}

	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<input
				className={styles.input}
				name="target"
				placeholder="Enter site url. e.g.: Enter website URL (e.g. www.example.com)"
				type="url"
				required
			/>
			<button type="submit" className={styles.btn}>
				Search
			</button>
		</form>
	)
}

export default SearchBar
