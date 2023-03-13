import { REGEX, NO_CRAWL_CLASS_TEXTS, NO_SELECTABLE_TAG } from "./constants";

export const isNoHTML = (element: Element | null) => {
  if (!element) return false;
  return element.tagName === "HTML";
};

export const isSupportProtocol = (url: URL) => {
  return ["http:", "https:"].includes(url.protocol);
};

export const isSelectableElement = (element: Element | null) => {
  if (!element) return false;
  const tagName = element.tagName.toLowerCase();
  return !NO_SELECTABLE_TAG.includes(tagName);
};

export const isValidClassName = (className?: string | null) => {
  if (!className) return false;
  if (
    REGEX.punctuation.test(className) ||
    REGEX.hexadecimal.test(className) ||
    REGEX.bigNum.test(className)
  ) {
    return false;
  }
  for (let i = 0; i < NO_CRAWL_CLASS_TEXTS.length; i++) {
    if (className.includes(NO_CRAWL_CLASS_TEXTS[i])) {
      return false;
    }
  }
  return true;
};

export const getSelector = (elements: Element[]) => {
  const filteredClasses = elements.map((element) => {
    return [...element.classList].reduce((acc, cur) => {
      if (isValidClassName(cur)) {
        acc.push(CSS.escape(cur.trim()));
      }
      return acc;
    }, [] as string[]);
  });

  const seletorStore = [] as string[][];
  const elementNums = elements.length - 1;

  const genElementSelectors = (store = [] as string[], idx = 0) => {
    if (filteredClasses[idx].length) {
      for (const className of filteredClasses[idx]) {
        const selector = [
          ...store,
          elements[idx].tagName.concat(".", className),
        ];

        if (idx === elementNums) {
          seletorStore.push(selector);
        } else {
          genElementSelectors(selector, idx + 1);
        }
      }
    } else {
      const selector = [...store, elements[idx].tagName];

      if (idx === elementNums) {
        seletorStore.push(selector);
      } else {
        genElementSelectors(selector, idx + 1);
      }
    }
  };
  genElementSelectors([], 0);

  return seletorStore.map((selector) => selector.join(" > "));
};
