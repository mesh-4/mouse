'use client'

import * as React from 'react'
import { FiXCircle } from 'react-icons/fi'

import { useStore } from '@/store'

import styles from './form.module.css'

const SearchForm = () => {
	const inputRef = React.useRef<HTMLInputElement>(null)

	const url = useStore((state) => state.url)
	const setUrl = useStore((state) => state.setUrl)

	React.useEffect(() => {
		if (inputRef.current) {
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
		<form className={styles.container} onSubmit={handleSubmit}>
			<div className={styles.field}>
				<input
					ref={inputRef}
					className={styles.input}
					name="target"
					type="url"
					required
					pattern="^(https?):\/\/[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})(:\d{1,5})?(\/[^\s]*)?$"
					placeholder="Enter site url"
				/>
				{url && (
					<button type="button" className={styles['clear-btn']} aria-label="reset" onClick={handleReset}>
						<FiXCircle />
					</button>
				)}
			</div>
			<button type="submit" className={styles.btn}>
				Search
			</button>
		</form>
	)
}

export default SearchForm
