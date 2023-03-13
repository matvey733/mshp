const { faker } = require("@faker-js/faker");

module.exports = function genCat() {
  const cat = {
    id: Math.floor(Math.random() * 1000),
    image: faker.image.food(),
    name: faker.name.firstName(),
    breed: faker.animal.cat(),
    color: faker.color.human(),
    age: Math.floor(Math.random() * 10),
    desciption: faker.lorem.sentence()
  }

  return cat;
}