import { LoginPage } from '../pageObjects/LoginPage';
// import { LoginPage } from '../pageObjects/LoginPage';
import { faker } from '@faker-js/faker';


describe('Escenarios de 06 y 07 en ghost 3.42.0.', function() {
  const loginPage = new LoginPage()
  const name = faker.person.firstName();
  const email = faker.internet.email();

    // Given a user is logged in to the Ghost admin
    beforeEach(() => {
      cy.wait(1000);
      loginPage.visitOld();
      cy.wait(1000);
      loginPage.loginOld(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));    
      cy.wait(1000);
      Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception', err);
        return false;
      });
    })
    


    //EP06 - Creación de suscriptores desde el portal administrativo
    it('EP06 - Creación de suscriptores desde el portal administrativo', function() {
      cy.wait(1000);

      // And I click on Members
      cy.contains('a', 'Staff').click();
      cy.wait(1000);
      cy.screenshot('EP06-01-3.42.0');

      // // And I click on New Members
      cy.get('button.gh-btn-green').contains('Invite people').click();
      cy.wait(1000);
      cy.screenshot('EP06-02-3.42.0');

      // And I complete the form for new member
      cy.get('input#new-user-email').type(email);
      cy.get('select#new-user-role').select('Contributor');
      cy.screenshot('EP06-03-3.42.0');

      // And I click on Save
      cy.contains('button', 'Send invitation now').click();
      cy.wait(1000);
      cy.screenshot('EP06-04-3.42.0');

      // Then I validate that the member was created succesful
      cy.reload();
      cy.contains('a', 'Staff').click()
      
      if (!cy.contains('h3', email).should('exist')) {
        throw new Error(`El nombre del miembro creado ("${email}") no coincide con el nombre obtenido (${text.trim()}).`);
      }
      cy.wait(1000);
      cy.screenshot('EP06-05-3.42.0');
      
    });
  
  
  
    // EP07 - Eliminar suscriptor desde el portal administrativo
    it('EP07 - Eliminar suscriptor desde el portal administrativo ', function() {
      cy.wait(1000);
      
      // And I click on Members
      cy.contains('a', 'Staff').click();
      cy.wait(1000);
      cy.screenshot('EP07-01-3.42.0');

      // // And I select member
      cy.get('h3.apps-card-app-title')
        .first()
        .invoke('text')
        .then((text) => {
          cy.screenshot('EP07-02-3.42.0');

          // And I delete member 
          cy.get('a.apps-configured-action').first().click();
          cy.screenshot('EP07-03-3.42.0');
          cy.reload();
          cy.wait(2000); 
          cy.screenshot('EP07-04-3.42.0');

          // Then I validate that the member was deleted succesful
          cy.contains(text).should('not.exist'); 
          cy.screenshot('EP07-05-3.42.0');     
      });
    });




});