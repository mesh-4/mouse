'use client'

import * as React from 'react'

import { useStore } from '@/store'
import { useProxySite } from '@/hooks'
import { getLogTxt, getNodePath } from '@/utils'
import { PICKER_STYLES, AREA_HOVERED_CLASS, HOVERED_CLASS, SELECTED_CLASS } from '@/constants'

var tempWindow: Window | null = null

type Props = {
	cssSelector?: string
}

const Frame = () => {
	const url = useStore((state) => state.url)
	const addLog = useStore((state) => state.addLog)
	const setCurrentSelector = useStore((state) => state.setCurrentSelector)

	const { srcDoc, error, isLoading } = useProxySite(url)

	const iframeRef = React.useRef<HTMLIFrameElement>(null)

	const onIframeLoad = () => {
		if (!iframeRef.current) {
			console.warn('iframe not mount')
			return
		}

		tempWindow = iframeRef.current.contentWindow
		if (!tempWindow) {
			console.warn('contentWindow not found')
			return
		}

		// * inject styles
		const style = tempWindow.document.createElement('style')
		style.innerHTML = PICKER_STYLES
		tempWindow.document.head.appendChild(style)

		/* anchor event handle
		const elementsMap: Record<string, Element[]> = {}

		// * inject event listeners to links
		tempWindow.document.querySelectorAll('a').forEach((anchor) => {
			if (!anchor.href) return

			try {
				const url = new URL(anchor.href)
				if (url.protocol !== 'https:' && url.protocol !== 'http:') return
			} catch (e) {
				if (e instanceof Error) console.error(e)
			}

			const selector = getNodePath(anchor)

			if (!elementsMap[selector]) {
				elementsMap[selector] = [anchor]
			} else {
				elementsMap[selector].push(anchor)
			}
		})

		for (const [selector, elements] of Object.entries(elementsMap)) {
			elements.forEach((element) => {
				element.addEventListener('click', (e) => {
					e.preventDefault()

					// remove previous selected elements
					tempWindow?.document.querySelectorAll(`.${SELECTED_CLASS}`).forEach((ele) => {
						ele.classList.remove(SELECTED_CLASS)
					})

					setCurrentSelector(selector)
					elements.forEach((ele) => {
						const child = ele.firstElementChild
						if (child && !child.className.includes(SELECTED_CLASS)) {
							child.classList.add(SELECTED_CLASS)
						}
					})
				})

				element.addEventListener('mouseenter', () => {
					elements.forEach((ele) => {
						const child = ele.firstElementChild
						if (child && child?.tagName !== 'BR' && child?.tagName !== 'SVG') {
							if (child.className.includes(HOVERED_CLASS)) return
							child.classList.add(HOVERED_CLASS)
						}
					})
				})

				element.addEventListener('mouseleave', () => {
					elements.forEach((ele) => {
						const child = ele.firstElementChild
						if (child) {
							child.classList.remove(HOVERED_CLASS)
						}
					})
				})
			})
		}
		*/

		// * detect user scroll posistion and add log
		const onScroll = () => {
			const scrollY = tempWindow?.scrollY || 0
			addLog(getLogTxt('scroll', `${scrollY}`))
		}

		// * detect user mouse hover
		let prevHovered: HTMLElement | null = null

		const onHover = (e: MouseEvent) => {
			if (e.type !== 'mouseover') {
				return
			}
			if (prevHovered) {
				prevHovered.classList.remove(AREA_HOVERED_CLASS)
			}
			;(e.target as HTMLElement).classList.add(AREA_HOVERED_CLASS)
			prevHovered = e.target as HTMLElement
		}

		// * get user selected text and add log
		const onSelection = () => {
			const selection = tempWindow?.getSelection()
			if (!selection) {
				return
			}

			if (selection.anchorNode?.parentElement) {
				const wrapperPath = getNodePath(selection.anchorNode.parentElement)
				addLog(getLogTxt('selection', 'anchor wrapper:' + wrapperPath))
			}

			const selectedText = selection.toString()
			if (selectedText) {
				addLog(getLogTxt('selection', selectedText))
			}
		}

		tempWindow.addEventListener('scroll', onScroll)
		tempWindow.document.addEventListener('mouseover', onHover)
		tempWindow.document.addEventListener('selectionchange', onSelection)
	}

	if (!url) {
		return null
	}

	if (isLoading) {
		return <p>Loading</p>
	}

	if (error) {
		return <p>Error</p>
	}

	return (
		<div>
			<iframe
				ref={iframeRef}
				srcDoc={srcDoc}
				sandbox="allow-same-origin"
				title={'Inline frame for '.concat(url)}
				width="100%"
				height="100%"
				onLoad={onIframeLoad}
				style={{ border: 'none', position: 'absolute' }}
			/>
		</div>
	)
}

export default React.memo(Frame)
