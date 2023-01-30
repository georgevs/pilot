const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const fs = require('fs');

const { google } = require('googleapis');

//----------------------------------------------------------------------------------------
const loadFile = (path) => fs.readFileSync(path, 'utf8');
const loadJsonFile = (path) => JSON.parse(loadFile(path));
//----------------------------------------------------------------------------------------
const config = () => ({
  server: {
    key: loadFile('../certs/cert-key-nopassword.pem'),
    cert: loadFile('../certs/cert.pem'),
    port: 3443
  },
  app: {
    localFolderPath: '../app'
  },
  client_secret: loadJsonFile('../secrets/client_secret_588879659786-96ialt5l1bn240naa55eh7gberlo66ds.apps.googleusercontent.com.json')
});

//----------------------------------------------------------------------------------------
const oauth2Client = (config) => {
  const { client_id, client_secret, redirect_uris } = config.web;
  let s = {};
  const client = () => s.client ?? (s.client = new google.auth.OAuth2(client_id, client_secret, redirect_uris));
  const authorizationUrl = () => s.authorizationUrl ?? (s.authorizationUrl = client().generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly'],
    include_granted_scopes: true,

    // NOTE: refresh token is returned ONLY the first time the user concents
    // Optionally force concent which will also provide a new refresh_token
    prompt: 'consent'
  }));
  const getToken = (code) => client().getToken(code);
  const setCredentials = (tokens) => client().setCredentials(tokens);

  // google.options({ auth: client() });

  return { authorizationUrl, getToken, setCredentials, client };
};

//----------------------------------------------------------------------------------------
const app = (config, oauth2Client) => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/auth', authRouter(config, oauth2Client));
  app.use('/', express.static(config.localFolderPath));
  app.route('*').all(() => { throw createError.NotFound() });

  app.use((err, req, res, next) => {
    if (!err?.status) { err = createError.InternalServerError(err) }
    const { status, message } = { ...err, ...err.constructor.prototype };
    console.log({ status, message, url: req.originalUrl });
    res.status(status).json({ status, message });
  });

  return app;
};

//----------------------------------------------------------------------------------------
const authRouter = (config, oauth2Client) => {
  const router = express.Router();

  router.route('/')
    .get((req, res, next) => {
      // console.log('Url', new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`));
      const { code, error } = req.query;
      let redirectUrl;
      if (code) {
        console.log('code', code);
        oauth2Client.getToken(code)
          .then((tokens) => {
            console.log('tokens', tokens);
            oauth2Client.setCredentials(tokens);

            google.gmail('v1')
              .users.labels.list({
                access_token: tokens.tokens.access_token,
                userId: 'me',
              })
              .then((response) => { console.log('response', response) })
              .catch((error) => console.log('error', error));

            res.redirect('/');
          });
      } else if (error) {
        console.log('error', error);
        res.redirect('/');
      } else {
        res.redirect(oauth2Client.authorizationUrl());
      }
    })
    .all(() => { throw createError.MethodNotAllowed() });
    
  return router;
};

//----------------------------------------------------------------------------------------
const server = ({ key, cert, port }, app) => {
  const server = https.createServer({ key, cert }, app);
  const start = () => {
    server.listen(port, () => { console.log(`Listening on port ${port}`)});
  };
  return { start };
};

//----------------------------------------------------------------------------------------
const serve = (config) => {
  server(config.server, app(config.app, oauth2Client(config.client_secret))).start();
};

serve(config());
