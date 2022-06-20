const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Soy una nueva ruta!!!');
});

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Product 1',
      price: 1000,
    },
    {
      name: 'Product 2',
      price: 500,
    },
  ]);
});

app.get('/products/:id', (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;

  res.json({
    id,
    name: 'Product 1',
    prces: 1000,
  });
});

app.get('/categories', (req, res) => {
  res.json([
    {
      categoryId: 1,
      name: 'Category 1',
      description: 'Category 1',
    },
    {
      categoryId: 2,
      name: 'Category 2',
      description: 'Category 2',
    },
  ]);
});

app.get('/categories/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    categoryId: id,
    name: 'Category 1',
    description: 'Category 1',
  });
});

app.get('/categories/:id/products', (req, res) => {
  const { id } = req.params;

  res.json([
    {
      categoryId: id,
      name: 'Product 1',
      price: 1000,
    },
    {
      categoryId: id,
      name: 'Product 2',
      price: 500,
    },
  ]);
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId,
    name: 'Product 1',
    price: 1000,
  });
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('Ruequest sin parámetros');
  }
});

app.listen(port, () => {
  console.log('My port: ' + port);
  console.log('http://localhost:3000/');
});
