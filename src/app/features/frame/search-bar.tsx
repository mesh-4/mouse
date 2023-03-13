"use client";

import * as React from "react";

import styles from "./search-bar.module.css";

const SearchBar = () => {
	return (
		<form className={styles.container} method="POST">
			<input
				className={styles.input}
				placeholder="Enter site url. e.g.: Enter website URL (e.g. www.example.com)"
			/>
			<button type="submit" className={styles.btn}>
				Search
			</button>
		</form>
	);
};

export default SearchBar;
