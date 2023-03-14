export const HOVERED_CLASS = 'mesh-mouse--hovered'
export const SELECTED_CLASS = 'mesh-mouse--selected'

export const PICKER_STYLES = `
.${HOVERED_CLASS} {
  background-color: rgb(57, 121, 204, 0.16) !important;
  outline: 2px dashed #3979CC !important;
  outline-offset: -2px !important;
}
.${SELECTED_CLASS} {
  background-color: rgba(43, 178, 76, 0.16) !important;
  outline: 2px dashed #2bb24c !important;
  outline-offset: -2px !important;
}
`

export const MOCK_UA =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
