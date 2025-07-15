const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ntjghw',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'tests/frontend/**/*.cy.js', // Le dice a Cypress que busque aquí tus archivos .cy.js
        // --- ¡AÑADE ESTA LÍNEA! ---
        baseUrl: 'http://localhost:3000', // Le dice a Cypress que tu fuerte está en http://localhost:3000
  },
});
