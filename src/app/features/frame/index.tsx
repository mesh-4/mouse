"use client";

import * as React from "react";

import { PICKER_STYLES } from "@/frame/constants";
import {
	isNoHTML,
	getSelector,
	isSupportProtocol,
	isSelectableElement,
} from "@/frame/utils";
import type { NodeElementMap, SelectorClassMap } from "@/frame/types";

var tempWindow: Window | null = null;

type FrameProps = {
	url: string;
	srcDoc: string;
	isLoading: boolean;
	error?: string;
	cssSelector?: string;
};

const Frame: React.FC<FrameProps> = ({
	url,
	srcDoc,
	isLoading,
	error,
	cssSelector,
}) => {
	const listMap = React.useRef<NodeElementMap>({});
	const classMap = React.useRef<SelectorClassMap>({});
	const iframeRef = React.useRef<HTMLIFrameElement>(null);

	const getSilmilarElements = (
		element: Element,
		listMap: NodeElementMap,
		classMap: SelectorClassMap
	) => {
		let tempEle = element;
		const nodeList = [tempEle];

		for (let cursor = 0; cursor < 4 && tempEle && isNoHTML(tempEle); cursor++) {
			nodeList.unshift(tempEle);
			tempEle = tempEle.parentNode as Element;
		}

		if (
			element.children?.length &&
			isSelectableElement(element.firstElementChild)
		) {
			nodeList.push(element.firstElementChild as Element);
		}

		const elementsSelector = getSelector(nodeList);
		const targetSelector = elementsSelector.join(", ");

		let selector: string;
		let elements: NodeListOf<Element>;

		if (classMap[targetSelector]) {
			selector = classMap[targetSelector];
			elements = listMap[selector];
		} else {
			try {
				const numsOfSelected =
					tempWindow!.document.querySelectorAll(targetSelector).length || 0;

				const tempSelector = [...elementsSelector];
				let selectorQueue = [] as Array<string | undefined>;

				let n = 0;
				do {
					selectorQueue = [...selectorQueue, tempSelector.shift()];
					selector = selectorQueue.join(", ");

					elements = listMap[selector];
					if (!elements) {
						elements = tempWindow!.document.querySelectorAll(selector);
						listMap[selector] = elements;
					}

					if (n === elements?.length) {
						selectorQueue.pop();
					}
					n = elements.length;
				} while (numsOfSelected > elements.length);

				classMap[selector] = selector;
			} catch {
				return [];
			}
		}

		return [
			{
				elements,
				cssSelector,
			},
		];
	};

	const onIframeLoad = () => {
		if (!iframeRef.current) {
			console.warn("iframe not mount");
			return;
		}

		tempWindow = iframeRef.current.contentWindow;
		if (!tempWindow) {
			console.warn("contentWindow not found");
			return;
		}

		// * inject styles
		const style = tempWindow.document.createElement("style");
		style.innerHTML = PICKER_STYLES;
		tempWindow.document.head.appendChild(style);

		// * inject event listeners to links
		tempWindow.document.querySelectorAll("a").forEach((anchor) => {
			if (!anchor.href) return;

			try {
				const url = new URL(anchor.href);
				if (!isSupportProtocol(url)) return;
			} catch (e) {
				if (e instanceof Error) {
					console.error(e);
				}
			}

			const groups = getSilmilarElements(
				anchor,
				listMap.current,
				classMap.current
			);
			if (groups.length) {
				anchor.addEventListener("click", (event) => {
					event.preventDefault();

					tempWindow?.document
						.querySelectorAll(".feedly-selected")
						.forEach((ele) => {
							ele.classList.remove("feedly-selected");
						});

					const { elements } = groups[0];
					elements.forEach((ele) => {
						if (!ele.className.includes("feedly-selected")) {
							ele.classList.add("feedly-selected");
						}
					});
				});
			}

			anchor.addEventListener("mouseenter", () => {
				groups.forEach((group, idx) => {
					group.elements.forEach((ele) => {
						if (ele.className.includes("feedly-hovered")) return;
						ele.classList.add("feedly-hovered--".concat(idx.toString()));
					});
				});
			});

			anchor.addEventListener("mouseleave", () => {
				groups.forEach((group, idx) => {
					group.elements.forEach((ele) => {
						ele.classList.remove("feedly-hovered--".concat(idx.toString()));
					});
				});
			});
		});

		if (cssSelector) {
			tempWindow.document.querySelectorAll(cssSelector).forEach((ele) => {
				ele.classList.add("feedly-selected");
			});
		}
	};

	if (isLoading) {
		return <p>Loading</p>;
	}

	if (error) {
		return <p>Error</p>;
	}

	return (
		<div>
			<iframe
				ref={iframeRef}
				srcDoc={srcDoc}
				sandbox="allow-same-origin"
				title={"Inline frame for ".concat(url)}
				width="100%"
				onLoad={onIframeLoad}
				style={{ border: "none" }}
			/>
		</div>
	);
};

export default React.memo(Frame);
