/**
 * Generación dinámica de data pools
 * 
 * Genera data pools de manera aleatoria
 */


// cypress/support/commands.js or within your test file
const { faker } = require('@faker-js/faker');

Cypress.Commands.add('generatePage', () => {
  return {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(1),
    // author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    uri: faker.lorem.word(),
    tags: faker.helpers.arrayElements([
      'technology', 'health', 'science', 'sports', 'entertainment', 'business'
    ], 3)
  };
});
