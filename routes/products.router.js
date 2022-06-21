const express = require('express');
const ProductService = require('./../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();

const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Response desde endpoint filter');
});

router.get(
  '/:id',
  // ejecutamos las validaciones, le pasamos que esquema utilizar, y
  // por donde nos llegan los datos
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      // const id = req.params.id;
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (err) {
      next(err); // next para atrapar de forma explicita el error con el middleware
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;

    const newProduct = await service.create(body);

    res.status(201).json(newProduct);
  }
);

router.patch(
  '/:id',
  // validamos el id (por el parámetro)
  validatorHandler(getProductSchema, 'params'),
  // y validamos los datos del body
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
