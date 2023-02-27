// index.js

window.addEventListener('load', () => { window.app = new App(loadConfig()) });

//----------------------------------------------------------------------------------------
const loadConfig = () => ({
  services: {
    google: {
      apiKey: 'AIzaSyDHrxH4GOgOkRkLQV0gaZ8sx0NNBXhJ3KA',
      clientId: '588879659786-96ialt5l1bn240naa55eh7gberlo66ds.apps.googleusercontent.com',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
      scope: 'https://www.googleapis.com/auth/gmail.readonly',
    },
  }
});

//----------------------------------------------------------------------------------------
class App {
  constructor(config) {
    this.services = new Services(config.services);

    this.model = { };
    
    this.ui = new Ui(document.body);
    this.ui.addEventListener('ui:request-authenticate', this.handleUiRequestAuthenticate.bind(this));
    this.ui.addEventListener('ui:request-labels', this.handleUiRequestLabels.bind(this));
    this.ui.addEventListener('ui:request-messages', this.handleUiRequestMessages.bind(this));

    this.services.googleApi.loadClient()
      .then(this.handleLoaded.bind(this));
  }
  handleLoaded() {
    this.model.isLoaded = true;
    this.ui.render(this.model);
  }
  handleUiRequestAuthenticate() {
    const prompt = !this.services.googleApi.isAuthenticated() ? 'consent' : '';
    this.services.googleIdentityService.authenticateWithImplicitGrant({ prompt })
      .then(this.handleAuthenticateResponse.bind(this));
  }
  handleAuthenticateResponse(tokenResponse) {
    this.model.isAuthenticated = tokenResponse && tokenResponse.access_token !== null;
    this.model.error = tokenResponse ? tokenResponse.error : 'null';
    this.ui.render(this.model);
  }
  handleUiRequestLabels() {
    this.services.googleApi.requestLabels()
      .then(this.handleLabels.bind(this));
  }
  handleLabels(labels) {
    this.model.labels = labels;
    this.ui.render(this.model);
  }
  handleUiRequestMessages() {
    this.services.googleApi.requestMessages()
      .then(this.handleMessages.bind(this));
  }
  handleMessages(messages) {
    this.model.messages = messages;
    this.ui.render(this.model);
  }
}

//----------------------------------------------------------------------------------------
class UiElement {
  constructor(sel, parent) {
    this.el = sel instanceof HTMLElement ? sel : (parent || document.querySelector(sel));
    this.addEventListener = this.el.addEventListener.bind(this.el);
    this.dispatchEvent = this.el.dispatchEvent.bind(this.el);
  }
  toggleClass(classNames, cond) {
    const list = this.el.classList;
    (cond ? list.add : list.remove).apply(list, classNames);
  }
}
class Ui extends UiElement {
  constructor(sel, parent) {
    super(sel, parent);

    this.btnAuthenticate = new UiElement('.btn-authenticate');
    this.btnAuthenticate.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('ui:request-authenticate'));
    });

    this.btnLabels = new UiElement('.btn-labels');
    this.btnLabels.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('ui:request-labels'));
    });

    this.listLabels = new UiLabels('.list-labels');

    this.btnMessages = new UiElement('.btn-messages');
    this.btnMessages.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('ui:request-messages'));
    });

    this.listMessages = new UiMessages('.list-messages');

    this.alertDanger = new UiAlert('.alert-danger');
  }
  render({ isLoaded, isAuthenticated, labels, messages, error }) {
    this.btnAuthenticate.toggleClass(['d-none'], !isLoaded || isAuthenticated);
    this.btnLabels.toggleClass(['d-none'], !isAuthenticated);
    this.btnMessages.toggleClass(['d-none'], !isAuthenticated);
    this.listLabels.toggleClass(['d-none'], !labels);
    this.listMessages.toggleClass(['d-none'], !messages);
    this.alertDanger.toggleClass(['d-none'], !error);

    this.listLabels.render({ labels });
    this.listMessages.render({ messages });
    this.alertDanger.render({ error });
  }
}

class UiAlert extends UiElement {
  constructor(sel, parent) {
    super(sel, parent);
  }
  render({ error }) {
    this.el.textContent = (error || '').toString();
  }
}

class UiLabels extends UiElement {
  constructor(sel, parent) {
    super(sel, parent);
  }
  render({ labels }) {
    this.el.querySelectorAll(':scope > li').forEach(li => { li.remove() });
    if (labels) {
      labels.forEach(label => {
        new UiLabelItem(this.el.appendChild(UiLabelItem.createElement()))
          .render(label);
      });
    }
  }
}

class UiLabelItem extends UiElement {
  static createElement() {
    const el = document.createElement('li');
    el.classList.add('list-group-item');
    return el;
  }
  constructor(sel, parent) {
    super(sel, parent);
  }
  render({ name }) {
    this.el.textContent = name.toString();
  }
}

class UiMessages extends UiElement {
  constructor(sel, parent) {
    super(sel, parent);
  }
  render({ messages }) {
    this.el.querySelectorAll(':scope > li').forEach(li => { li.remove() });
    if (messages) {
      messages.forEach(message => {
        new UiMessageItem(this.el.appendChild(UiMessageItem.createElement()))
          .render(message);
      });
    }
  }
}

class UiMessageItem extends UiElement {
  static createElement() {
    const el = document.createElement('li');
    el.classList.add('list-group-item');
    return el;
  }
  constructor(sel, parent) {
    super(sel, parent);
  }
  render({ id, threadId }) {
    this.el.textContent = `${threadId}/${id}`;
  }
}

//----------------------------------------------------------------------------------------
class Services {
  constructor(config) {
    this.googleApi = new GoogleAPI(config.google);
    this.googleIdentityService = new GoogleIdentityService(config.google);
  }
}

class GoogleAPI {
  constructor(config) {
    this.config = config;
  }
  loadClient() {
    const { apiKey, discoveryDocs } = this.config;
    return new Promise((resolve, reject) => {
      gapi.load('client', () => {
        this.client = gapi.client;
        this.client.init({ apiKey, discoveryDocs })
          .then(resolve, reject);
      });
    });
  }
  isAuthenticated() {
    return this.client.getToken() !== null;
  }
  requestLabels() {
    return new Promise((resolve, reject) => {
      this.client.gmail.users.labels.list({ userId: 'me' })
        .then(({ result: { labels } }) => { resolve(labels) }, reject);
    });
  }
  requestMessages() {
    return new Promise((resolve, reject) => {
      this.client.gmail.users.messages.list({ userId: 'me' })
        .then(({ result: { messages } }) => { resolve(messages) }, reject);
    });
  }
}

class GoogleIdentityService {
  constructor(config) {
    this.config = config;
  }
  authenticateWithImplicitGrant({ prompt }) {
    const { clientId, scope } = this.config;
    return new Promise((resolve) => {
      this.client = google.accounts.oauth2.initTokenClient({  // OAuth 2 implicit grant
        callback: resolve,
        client_id: clientId,
        scope,
      });
      this.client.requestAccessToken({ prompt });
    });
  }
}
