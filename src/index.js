import Utilities from "./utilities.js";
import TransitionConfig from './config.js';

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
      this.enter();
    }
  }

  async enter() {
    await this.#transition({ to: "enter" });
  }

  async leave() {
    if (this.#isLeaving) return;

    this.#isLeaving = true;

    await this.#transition({ to: "leave" });
  }

  remove() {
    if (this.#config.hasLeaveTransition()) {
      this.leave().then(() => { super.remove(); });
    } else {
      super.remove();
    }
  }

  // private

  async #transition({ to }) {
    if (!this.#target) return;

    const classes = this.#config.getClasses({ for: to });

    await this.#utilities.run(this.#target, classes);
  }

  get #target() {
    return this.firstElementChild;
  }
}

customElements.define("turbo-transition", TurboTransition);
