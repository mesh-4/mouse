export const NO_SELECTABLE_TAG = ["br", "svg"];

export const REGEX = {
  punctuation: /(\.|\[|\]|,|=|@|!|#|\$|%|&|'|\*|\+|\/|\?|\^|\{|\||\}|~|;)/,
  hexadecimal: /[0-9a-f]{32}/,
  bigNum: /\d{6}$/,
};

export const NO_CRAWL_CLASS_TEXTS = [
  "[",
  "]",
  "(",
  ")",
  "spacing",
  "font",
  "footer",
  "header",
  "hide",
  "copyright",
  "poweredby",
  "center",
  "theme",
  "odd",
  "even",
];

export const PICKER_STYLES = `
.feedly-hovered--0 {
  background-color: rgb(57, 121, 204, 0.16) !important;
  outline: 2px dashed #3979CC !important;
  outline-offset: -2px !important;
}
.feedly-hovered--1 {
  background-color: rgba(244, 67, 54, 0.16) !important;
  outline: 2px dashed #F44336 !important;
  outline-offset: -2px !important;
}
.feedly-hovered--2 {
  background-color: rgba(255, 238, 85, 0.16) !important;
  outline: 2px dashed #FFEE55 !important;
  outline-offset: -2px !important;
}
.feedly-selected {
  background-color: rgba(43, 178, 76, 0.16) !important;
  outline: 2px dashed #2bb24c !important;
  outline-offset: -2px !important;
}
`;
