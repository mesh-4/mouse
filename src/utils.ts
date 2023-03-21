export const isNoHTML = (element: Element | null) => {
	if (!element) return false
	return element.tagName === 'HTML'
}

export const isSelectableElement = (element: Element | null) => {
	if (!element) return false
	const tagName = element.tagName.toLowerCase()
	return tagName !== 'br' && tagName !== 'svg'
}

export const getClassFromElement = (element: Element): string => {
	const selectors = ''

	if (element.classList.length === 0) {
		return selectors
	} else {
		for (let i = 0; i < element.classList.length; i++) {
			const className = element.classList[i]
			selectors.concat(`.${className}`)
		}
	}

	return selectors
}

export const getNodePath = (node: Element): string => {
	if (node.parentElement && node.parentElement.nodeName !== 'HTML') {
		const parentPath = getNodePath(node.parentElement)
		const nodeClass = node.getAttribute('class') ? `.${node.getAttribute('class')!.replace(/\s+/g, '.')}` : ''
		return `${parentPath} > ${node.nodeName}${nodeClass}`
	}
	const nodeClass = node.getAttribute('class') ? `.${node.getAttribute('class')!.replace(/\s+/g, '.')}` : ''
	return `${node.nodeName}${nodeClass}`
}

export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

type ActionType = 'scroll' | 'selection'

export const getLogTxt = (type: ActionType, msg: string) => {
	return `[${type}] ${msg}`
}
