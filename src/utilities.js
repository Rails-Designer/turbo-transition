export default class Utilities {
  async run(element, classes) {
    this.#applyInitialState(element, classes);

    await this.#nextFrame();

    this.#applyFinalState(element, classes);

    await this.#waitForCompletion(element);

    this.#cleanup(element, classes);
  }

  #applyInitialState(element, classes) {
    element.classList.add(classes.active, classes.from);
  }

  #applyFinalState(element, classes) {
    element.classList.remove(classes.from);
    element.classList.add(classes.to);
  }

  #cleanup(element, classes) {
    element.classList.remove(classes.to, classes.active);
  }

  #nextFrame() {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });
  }

  #waitForCompletion(element) {
    return Promise.all(
      element.getAnimations().map(animation => animation.finished)
    );
  }
}
