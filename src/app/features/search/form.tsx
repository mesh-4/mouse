'use client'

import * as React from 'react'
import { FiXCircle } from 'react-icons/fi'

import { useStore } from '@/store'

import styles from './form.module.css'

type Props = {
	url?: string
}

const SearchForm: React.FC<Props> = ({ url = '' }) => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const setUrl = useStore((state) => state.setUrl)

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
		<form className={styles.container} onSubmit={handleSubmit}>
			<div className={styles.field}>
				<input
					ref={inputRef}
					className={styles.input}
					type="url"
					name="target"
					placeholder="Enter site url"
					required
					pattern="^(https?):\/\/[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})(:\d{1,5})?(\/[^\s]*)?$"
				/>
				{url && (
					<button type="button" className={styles['clear-btn']} aria-label="reset" onClick={handleReset}>
						<FiXCircle />
					</button>
				)}
			</div>
			<button type="submit" className="button primary">
				Search
			</button>
		</form>
	)
}

SearchForm.displayName = 'SearchForm'

export default SearchForm
