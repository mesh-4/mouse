import styles from "./page.module.css";

import FrameSearchBar from "./features/frame/search-bar";
import FramerMonitor from "./features/frame/monitor";
import LoggerContainer from "./features/logger/container";
import LoggerContent from "./features/logger/content";

export default function Home() {
	return (
		<main>
			<div className={styles.dashboard}>
				<div className={styles.dashboard__frame}>
					<FrameSearchBar />
					<FramerMonitor />
				</div>
				<div className={styles.dashboard__sidebar}>
					<LoggerContainer>
						<LoggerContent />
					</LoggerContainer>
				</div>
			</div>
		</main>
	);
}
