const { faker } = require('@faker-js/faker');

class CategoriesService {
  constructor() {
    this.categories = new Array();
    this.generate();
  }

  generate() {
    const count = 10;
    for (let i = 0; i < count; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        nombre: faker.commerce.department(),
        class: faker.commerce.productAdjective(),
      });
    }
  }

  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    return this.categories.find((item) => item.id === id);
  }

  async update(id, changes) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Ups, Not Found');
    const updataCategory = {
      ...this.categories[index],
      ...changes,
    };
    this.categories[index] = updataCategory;
    return updataCategory;
  }

  async delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Ups, Not Found');
    this.categories.splice(index, 1);
    return {
      delete: true,
    };
  }
}

module.exports = CategoriesService;
