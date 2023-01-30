// index.js

// window.addEventListener('load', () => {
//   const btnSignIn = document.querySelector('.btn-sign-in');
//   btnSignIn.addEventListener('click', () => {
//     window.location.replace(new URL('/auth', window.location.href));
//   });
// });

window.addEventListener('load', () => { window.app = new App() });

class App {
  constructor() {
    this.ui = new Ui('body');
    this.ui.addEventListener('ui:sign-in', () => {
      window.location.replace(new URL('/auth', window.location.href));
    });
  }
}

class UiElement {
  constructor(sel, parent) {
    this.el = sel instanceof HTMLElement ? sel : (parent ?? document).querySelector(sel);
    this.addEventListener = this.el.addEventListener.bind(this.el);
    this.dispatchEvent = this.el.dispatchEvent.bind(this.el);
    this.querySelector = this.el.querySelector.bind(this.el);
    this.appendChild = this.el.appendChild.bind(this.el);
  }

  static createElement(tagName, { sel, parent }) {
    const el = document.createElement(tagName);
    if (sel) { el.classList.add(...sel.split(' ')) }
    if (parent) { parent.appendChild(el) }
    return el;
  }
}

class Ui extends UiElement {
  constructor(sel, parent) {
    super(sel, parent);
    this.btnSignIn = new UiElement('.btn-sign-in', this);
    this.btnSignIn.addEventListener('click', () => { this.dispatchEvent(new CustomEvent('ui:sign-in')) });
  }
}
