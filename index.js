const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const whiteList = ['http://localhost:8080', 'https://my-app.com'];
const options = {
  origen: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Accso no permitido'));
    }
  },
};
app.use(cors(options));
require('./utils/auth');

app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Soy una nueva ruta!!!');
});

routerApi(app);
// Utilizamos los middleware. Siempre deben ir después del routing:
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port: ' + port);
  console.log('http://localhost:3000/');
});
