const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken');

//----------------------------------------------------------------------------------------
const config = () => ({
  server: {
    key: fs.readFileSync('../certs/cert-key-nopassword.pem', 'utf8'),
    cert: fs.readFileSync('../certs/cert.pem', 'utf8'),
    port: 3443
  },
  app: {
    localFolderPath: '../app'
  }
});

//----------------------------------------------------------------------------------------
const app = (config) => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/', express.static(config.localFolderPath));
  app.use('/auth', auth(express.Router()));
  app.use('/quotes', quotes(express.Router()));
  app.route('*').all(() => { throw createError.NotFound() });

  app.use((err, req, res, next) => {
    // console.log({ err });
    if (!err?.status) { err = createError.InternalServerError(err) }
    const { status, message } = { ...err, ...err.constructor.prototype };
    res.status(status).json({ status, message });
  });

  return app;
};

//----------------------------------------------------------------------------------------
const auth = (router) => {
  router.route('/jwt')
    .get((req, res, next) => {
      const secret = 'secret42';
      const token = jsonwebtoken.sign({ user: 'Joe' }, secret);
      res.json({ token });
    })
    .all(() => { throw createError.MethodNotAllowed() });
    
  router.route('/cookie')
    .get((req, res, next) => {
      const secret = 'secret42';
      const token = jsonwebtoken.sign({ user: 'Joe' }, secret);
      res.cookie('token', token, { httpOnly: true, secure: true });
      res.json({});
    })
    .all(() => { throw createError.MethodNotAllowed() });

  return router;
};

const quotes = (router) => {
  router.route('/')
    .get((req, res, next) => {
      console.log('headers.authorization', req.headers.authorization);
      console.log('cookies', req.cookies);
      res.json([
        { author: 'author 1', text: 'quote 1' },
        { author: 'author 2', text: 'quote 2' },
        { author: 'author 3', text: 'quote 3' }
      ]);
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
  server(config.server, app(config.app)).start();
};

serve(config());
