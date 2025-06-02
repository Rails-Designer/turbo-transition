export default class Config {
  #element;

  constructor(element) {
    this.#element = element;
  }

  hasEnterTransition() {
    return this.#element.hasAttribute("enter-from-class") ||
           this.#element.hasAttribute("enter-active-class") ||
           this.#element.hasAttribute("enter-to-class");
  }

  hasLeaveTransition() {
    return this.#element.hasAttribute("leave-from-class") ||
           this.#element.hasAttribute("leave-active-class") ||
           this.#element.hasAttribute("leave-to-class");
  }

  getClasses({ for: type }) {
    return {
      from: this.#element.getAttribute(`${type}-from-class`) || "",
      active: this.#element.getAttribute(`${type}-active-class`) || "",
      to: this.#element.getAttribute(`${type}-to-class`) || ""
    };
  }
}
