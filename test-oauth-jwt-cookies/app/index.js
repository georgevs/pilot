// index.js

window.addEventListener('load', () => { window.app = new App(new Config()) });

//----------------------------------------------------------------------------------------
class Config {
  constructor() {
    this.services = {
      quotes: {
        baseUrl: window.location.href
      }
    }
  }
}

//----------------------------------------------------------------------------------------
class App {
  constructor(config) {
    this.config = config;
    this.services = new Services(this.config.services);
    this.model = new Model();
    this.ui = new Ui('body');
    this.model.addEventListener('model:quotes-updated', ({ detail }) => { this.ui.renderQuotes(detail) });
    this.ui.addEventListener('ui:quotes-requested', ({ detail }) => { this.requestQuotes(detail) });
  }

  requestQuotes({ includeAuthorization, includeCookies }) {
    const token = includeAuthorization ? this.services.storage.token() : null;
    this.services.quotes.fetch({ token, includeCookies })
      .then(quotes => this.model.updateQuotes(quotes));
  }
}

//----------------------------------------------------------------------------------------
class Model extends EventTarget {
  constructor() {
    super();
    this.quotes = [];
  }

  updateQuotes(quotes) {
    Object.assign(this.quotes, quotes);  // TODO: maybe more sophisticated merge
    this.dispatchEvent(new CustomEvent('model:quotes-updated', { detail: quotes, bubbles: true }));
  }
}

//----------------------------------------------------------------------------------------
class Services {
  constructor(config) {
    this.storage = new LocalStorage();
    this.quotes = new QuotesClient(config.quotes);
  }
}

class LocalStorage {
  token() {
    return localStorage.getItem('token');
  }
}

class QuotesClient {
  constructor(config) {
    this.config = config;
  }

  fetch({ token, includeCookies } = {}) {
    const url = new URL('/quotes', this.config.baseUrl);
    const options = {
      credentials: includeCookies ? 'include' : 'omit',
      headers: Object.assign({}, token && { Authorization: `Bearer ${token}` })
    };
    return window.fetch(url, options)
      .then(res => res.json());
  }
}

//----------------------------------------------------------------------------------------
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

//----------------------------------------------------------------------------------------
class Ui extends UiElement {
  constructor(sel, parent) {
    super(sel, parent);
    this.formQuote = new QuoteForm('.form-quote', this);
    this.listQuotes = new QuotesList('.list-quotes', this);
  }

  renderQuotes(quotes) {
    this.listQuotes.render(quotes);
  }
}

class QuotesList extends UiElement {
  render(quotes) {
    quotes.forEach((quote) => {
      const li = QuoteItem.createUiElement({ sel: 'li li-quote', parent: this });
      li.render(quote);
    });
  }
}

class QuoteItem extends UiElement {
  static createUiElement(options) {
    return new QuoteItem(UiElement.createElement('li', options));
  }
  
  render({ author, text }) {
    this.el.textContent = `${author}: ${text}`;
  }
}

class QuoteForm extends UiElement {
  constructor(sel, parent) {
    super(sel, parent);
    this.addEventListener('submit', (e) => { e.preventDefault(); this.submit() });
  }
  
  submit() {
    const detail = {
      includeAuthorization: this.el.includeAuthorization.checked,
      includeCookies: this.el.includeCookies.checked
    };
    this.dispatchEvent(new CustomEvent('ui:quotes-requested', { detail, bubbles: true }));
  }
}
