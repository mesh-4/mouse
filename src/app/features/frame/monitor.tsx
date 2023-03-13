"use client";

import * as React from "react";

import styles from "./monitor.module.css";

const FramerMonitor = () => {
	return (
		<div className={styles.container}>
			<div className={styles["container--spacer"]} />
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
				}}
			/>
		</div>
	);
};

export default FramerMonitor;
