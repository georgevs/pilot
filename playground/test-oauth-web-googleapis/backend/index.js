const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const fs = require('fs');

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
  app.use('/', router(config));
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
const router = (config) => {
  const router = express.Router();
  router.use(express.static(config.localFolderPath));
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
