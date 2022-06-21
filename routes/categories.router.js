// imports of Modules
const express = require('express');
const CategoriesService = require('./../services/categories.service');

// instace of class
const router = express.Router();
const service = new CategoriesService();

// routing
router.get('/', async (req, res) => {
  const categories = await service.find();
  res.status(200).json(categories);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const category = await service.findOne(id);
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({
      message: 'Not Found',
    });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const updataCategory = await service.update(id, body);
  res.status(200).json(updataCategory);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const deleteCategory = await service.delete(id);
  res.status(200).json(deleteCategory);
});

module.exports = router;
