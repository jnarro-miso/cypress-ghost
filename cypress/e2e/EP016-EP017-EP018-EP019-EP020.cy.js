import { LoginPage } from '../pageObjects/LoginPage';
const faker = require('faker');


describe('Escenarios de 06 a 10.', function() {
  const loginPage = new LoginPage()
  const name = faker.name.findName();
  const email = faker.internet.email();
  const edicion = faker.lorem.paragraph();

    // Given a user is logged in to the Ghost admin
    beforeEach(() => {
      cy.wait(1000);
      loginPage.visit();
      cy.wait(1000);
      loginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));    
      cy.wait(1000);
      Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception', err);
        return false;
      });
    })
    


    // EP06 - Creación de suscriptores desde el portal administrativo
    it('EP06 - Creación de suscriptores desde el portal administrativo', function() {
      cy.wait(1000);
      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      cy.wait(1000);
      // And I click on New Members
      cy.get('[data-test-new-member-button="true"]').click();
      // And I wait for 2 seconds
      cy.wait(1000);
      // And I complete the form for new member
      cy.get('#member-name').clear().type(name);
      cy.get('#member-email').clear().type(email);
      // And I click on Save
      cy.get('[data-test-task-button-state="idle"]').click();
      cy.wait(1000);
      // And I search the member that was created
      cy.get('[data-test-nav="members"]').click();
      cy.get('[data-test-input="members-search"]').type(name);
      // And I wait for 2 seconds
      cy.wait(1000);
      // Then I validate that the member was created succesful
      cy.get('h3.gh-members-list-name')
        .invoke('text')
        .then(text => {
          // Se valida que el texto obtenido coincida con el nombre esperado
          if (text.trim() !== name.trim()) {
            throw new Error(`El nombre del miembro creado (${name}) no coincide con el nombre obtenido (${text.trim()}).`);
          }
        });
    });
  
  
  
    // EP07 - Eliminar suscriptor desde el portal administrativo
    it('EP07 - Eliminar suscriptor desde el portal administrativo ', function() {
      cy.wait(1000);
      
      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      cy.wait(1000);
      // And I select member
      cy.get('h3.gh-members-list-name')
      .first()
      .invoke('text')
      .then(text => {
        cy.wait(1000);
        // Guarda el texto del primer elemento en la variable 'member'
        cy.get('h3.gh-members-list-name').first().click();
        cy.get('[data-test-button="member-actions"]').click();
        cy.get('[data-test-button="delete-member"]').click();
        // And I confirm delete a member
        cy.get('[data-test-button="confirm"]').click();
        // And I search to delete member
        cy.wait(1000);
        cy.get('[data-test-input="members-search"]').type(text.trim());
        // Then I validate that the member was deleted succesful
        cy.get('h4')
        .invoke('text')
        .then(message => {
          if (message.trim() !== "No members match the current filter") {
            throw new Error(`El suscriptor no se eliminó correctamente.`);
          }
        });
      });
    });



    // EP08 - Filtrar suscriptores 
    it('EP08 - Filtrar suscriptores ', function() {
      cy.wait(1000);

      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      // And I wait for 1 seconds
      cy.wait(1000);
      // And I complete the filter
      // Hacer clic en el botón para filtrar miembros
      cy.get('[data-test-button="members-filter-actions"]').click();

      cy.get('[data-test-select="members-filter"] optgroup[label="Basic"] option')
        .then(options => {
          const randomIndex = Math.floor(Math.random() * options.length);
          const randomValue = options[randomIndex].getAttribute('value');
          cy.get('[data-test-select="members-filter"]').select(randomValue);
        });
      
      // Then I filter the subscriptors
      cy.get('[data-test-button="members-apply-filter"]').click();

    });
    


    // EP09 - Edición de suscriptores 
    it('EP09 - Edición de suscriptores ', function() {
      cy.wait(1000);
      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      
      // And I select member
      cy.get('h3.gh-members-list-name')
      .first()
      .invoke('text')
      .then(text => {
        cy.get('h3.gh-members-list-name').first().click();
        // And I complete the form for edit member
        cy.get('#member-note').clear().type(edicion, { force: true });
        
        // And I save the changes
        cy.get('[data-test-button="save"]').click();
        cy.wait(1000);
        
        // And I search a edited member
          // Click en el enlace 'members'
        cy.get('[data-test-nav="members"]').click();
        // Establecer el valor del campo de búsqueda de miembros
        cy.get('[data-test-input="members-search"]').type(text.trim());

      });
        cy.get('h3.gh-members-list-name').first().click();

        // Obtener el valor actual del campo de texto '#member-note'
        cy.get('#member-note').invoke('val').then(actualValue => {
          // Comparar el valor actual con el valor esperado
          if (actualValue !== edicion) {
            throw new Error('El valor en el campo de nota no coincide con la comparación.');
          }
        });
    });
    
    
    
    // EP10 - Editar descripción de portal principal
    it('EP10 - Editar descripción de portal principal ', function() {
      cy.wait(1000);
      // And I 
      cy.get('a.ember-view.gh-nav-bottom-tabicon').click();
      // And I wait for 1 seconds
      cy.wait(1000);
      // And I save the change
      cy.get('.cursor-pointer.text-green').first().click();
      cy.get('input[placeholder="Site description"]').type(edicion);
      cy.get('.cursor-pointer.text-green').first().click();
      
      // // And I wait for 1 seconds
      cy.wait(1000);
      // // Then I access to the view site
      cy.get('#done-button-container').click();
      cy.get('[data-test-nav="site"]').click();
    });
});
