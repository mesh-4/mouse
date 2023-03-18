import * as cheerio from 'cheerio'

export const getAnchorList = (plainHTML: string, selector: string) => {
	const result = [] as string[]

	const $ = cheerio.load(plainHTML)
	const $anchors = $(selector)
	$anchors.each((_index, element) => {
		const href = $(element).attr('href')
		if (href) result.push(href)
	})

	return result
}

export const getSiteMeta = (plainHTML: string) => {
	const $ = cheerio.load(plainHTML)

	const title = $('head > title').text()
	const socialImage = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content')

	return {
		title,
		socialImage,
	}
}
