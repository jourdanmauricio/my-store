const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());
const whiteList = ['http://localhost:8080', 'https://my-app.com'];
const options = {
  origen: (origen, callback) => {
    if (whiteList.includes(origen)) {
      callback(null, true);
    } else {
      callback(new Error('Accso no permitido'));
    }
  },
};
app.use(cors(options));

routerApi(app);
// Utilizamos los middleware. Siempre deben ir después del routing:
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Soy una nueva ruta!!!');
});

app.listen(port, () => {
  console.log('My port: ' + port);
  console.log('http://localhost:3000/');
});

routerApi(app);
