const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const https = require('https');

//----------------------------------------------------------------------------------------
const loadFile = (path) => fs.readFileSync(path, 'utf8');
const loadJsonFile = (path) => JSON.parse(loadFile(path));

//---------------------------------------------------------------------------------------
const config = () => {
  const client_secret = loadJsonFile('./secrets/client_secret_588879659786-96ialt5l1bn240naa55eh7gberlo66ds.apps.googleusercontent.com.json');
  const { hostname, port } = new URL(client_secret.web.redirect_uris[0]);
  return {
    server: {
      cert: loadFile('./certs/cert.pem'),
      key: loadFile('./certs/cert-key-nopassword.pem'),
      hostname,
      port, 
    },
    client_secret
  };
};

//----------------------------------------------------------------------------------------
const app = (config) => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/auth', authRouter(config));
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
const authRouter = (config) => {
  const router = express.Router();
  const { 
    auth_uri, 
    client_id, 
    client_secret, 
    redirect_uris: [redirect_uri], 
    token_uri, 
  } = config;

  router.route('/')
    .get((req, res, next) => {
      const { code, error } = req.query;

      if (code) {
        // exchange code for tokens
        const tokenUrl = new URL(token_uri);
        const params = {
          code,
          client_id,
          client_secret,
          redirect_uri,
          grant_type: 'authorization_code',
        };
        console.log('tokenUrl', tokenUrl, params);

        fetch(token_uri, { method: 'POST', body: JSON.stringify(params) })
          .then(res => res.json())
          .then(tokens => res.json(tokens))
          .catch(error => next(error));

      } else if (error) {
        next(error);

      } else {
        // redirect to authorization url
        const authUrl = new URL(auth_uri);
        Object.entries({
          access_type: 'offline',
          client_id, 
          prompt: 'consent',
          redirect_uri,
          response_type: 'code',
          scope: 'https://www.googleapis.com/auth/drive.readonly',
          state: 'the-state-goes-here'
        }).forEach(([key, value]) => { authUrl.searchParams.set(key, value) });
        console.log('authUrl', authUrl);

        res.redirect(authUrl);
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
  server(config.server, app(config.client_secret.web)).start();
};

serve(config());
