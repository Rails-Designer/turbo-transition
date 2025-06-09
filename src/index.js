import Utilities from "./utilities.js";
import TransitionConfig from "./config.js";

export default class TurboTransition extends HTMLElement {
  #isLeaving = false;
  #config;
  #utilities;

  constructor() {
    super();

    this.#config = new TransitionConfig(this);
    this.#utilities = new Utilities();
  }

  connectedCallback() {
    if (this.#config.hasEnterTransition()) {
      this.#enter();
    }
  }

  remove() {
    if (this.#config.hasLeaveTransition()) {
      this.#leave();

      return this;
    } else {
      return super.remove();
    }
  }

  // private

  async #enter() {
    await this.#transition({ to: "enter" });
  }

  #leave() {
    if (this.#isLeaving) return;

    this.#isLeaving = true;

    const clone = this.cloneNode(true);
    const parent = this.parentNode;

    if (!parent) {
      this.#isLeaving = false;

      return super.remove();
    }

    parent.replaceChild(clone, this);

    const target = clone.firstElementChild;

    if (target) {
      this.#transition({ to: "leave", element: target })
        .then(() => {
          clone.parentNode?.removeChild(clone);

          this.#isLeaving = false;
        });
    } else {
      if (clone.parentNode) { clone.parentNode.removeChild(clone); }

      this.#isLeaving = false;
    }
  }

  async #transition({ to, element = null }) {
    const target = element || this.firstElementChild;;

    if (!target) return;

    const classes = this.#config.getClasses({ for: to });

    await this.#utilities.run(target, classes);
  }
}

customElements.define("turbo-transition", TurboTransition);
