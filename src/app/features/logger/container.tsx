import * as React from "react";

import styles from "./container.module.css";

const LoggerContainer = ({ children }: React.PropsWithChildren) => {
	return (
		<div className={styles.logger__container}>
			<p className={styles.logger__title}>操作記錄</p>
			<div className={styles.logger__content}>{children}</div>
		</div>
	);
};

export default LoggerContainer;
