import { LoginPage } from '../pageObjects/LoginPage';
import { faker } from '@faker-js/faker';


describe('Escenarios de 06 a 10.', function() {
  const loginPage = new LoginPage()

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
    

    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #01 con datos aleatorios: Creación de suscriptores desde el portal administrativo correctamente
    it('Creación de suscriptores desde el portal administrativo correctamente.', function() {
      cy.wait(1000);
      
      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      cy.wait(1000);
      
      // And I click on New Members
      cy.get('[data-test-new-member-button="true"]').click();
      cy.wait(1000);
      
      // And I complete the form for new member
      cy.get('#member-name').clear().type(faker.person.firstName());
      cy.get('#member-email').clear().type(faker.internet.email());
      
      // And I click on Save
      cy.get('[data-test-task-button-state="idle"]').click();
      cy.wait(1000);
    });
    
    
    
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // // Escenario #02 con datos aleatorios: EP06 - Creación de suscriptores desde el portal administrativo suministrando correo inválido.
    it('Creación de suscriptores desde el portal administrativo suministrando correo inválido.', function() {
      cy.wait(1000);
      
      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      cy.wait(1000);
      
      // And I click on New Members
      cy.get('[data-test-new-member-button="true"]').click();
      cy.wait(1000);
      
      // And I complete the form for new member
      cy.get('#member-name').clear().type(faker.person.firstName());
      cy.get('#member-email').clear().type(faker.person.firstName());
      
      // And I click on Save
      cy.get('[data-test-task-button-state="idle"]').click();
      cy.wait(1000);
      
      // Then I validate that the member wasm't created succesful and show the alert with email error
      cy.get('p.response').should('contain', 'Invalid Email')
    });
    
    
    
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #03 con datos aleatorios: Edición de suscriptores correctamente. 
    it('Edición de suscriptores correctamente. ', function() {
      cy.wait(1000);
      
      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      const note = faker.lorem.sentence();
      // And I select member
      cy.get('h3.gh-members-list-name')
      .first()
      .invoke('text')
      .then(text => {
        cy.get('h3.gh-members-list-name').first().click();
        // And I complete the form for edit member
        cy.get('#member-note').clear().type(note, { force: true });
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
        if (actualValue !== note) {
          throw new Error('El valor en el campo de nota no coincide con la comparación.');
        }
      });
    });
    
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #04 con datos aleatorios: Edición de suscriptores con datos erroneos. 
    it('Edición de suscriptores con datos erroneos.', function() {
      cy.wait(1000);
      
      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      // And I select member
      cy.get('h3.gh-members-list-name')
      .first()
      .invoke('text')
      .then(text => {
        cy.get('h3.gh-members-list-name').first().click();
        
        cy.get('#member-email').clear().type(faker.lorem.sentence(), { force: true });
        cy.get('[data-test-button="save"]').click();
        cy.wait(1000);
        cy.get('p.response').should('contain', 'Invalid Email');
        
        
      });
    });
    
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #05 con datos aleatorios: Editar descripción de portal principal correctamente.
    it('Editar descripción de portal principal correctamente.', function() {
      cy.wait(1000);
      // And I 
      cy.get('a.ember-view.gh-nav-bottom-tabicon').click();
      // And I wait for 1 seconds
      cy.wait(1000);
      // And I save the change
      cy.get('.cursor-pointer.text-green').first().click();
      cy.get('input[placeholder="Site description"]').clear().type(faker.lorem.sentence(), { force: true });
      cy.wait(1000);
      cy.get('.cursor-pointer.text-green').first().click();
      cy.wait(1000);
      // // Then I access to the view site
      cy.get('#done-button-container').click();
      cy.wait(1000);
      cy.get('[data-test-nav="site"]').click();
      cy.wait(1000);
    });
    
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #06 con datos aleatorios: Invitar un colaborador (staff) correctamente. 
    it('Invitar un colaborador (staff) correctamente. ', function() {
      cy.get('.gh-nav-bottom-tabicon').click();
      cy.contains('a', 'Staff').click();
      cy.contains('span', 'Invite people').click();
      cy.wait(3000);
      const email = faker.internet.email();
      cy.get('div').find('section').find('div').find('div').find('div').find('input').first().type(email);
      cy.get('button.cursor-pointer.bg-black.text-white.dark\\:bg-white.dark\\:text-black.hover\\:bg-grey-900.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold.h-\\[34px\\].px-4.min-w-\\[80px\\]')
      .contains('Send invitation now')
      .click();
      cy.wait(3000);
      cy.get('body').type('{esc}');
      cy.reload();
      
      cy.wait(2000);
      cy.get('#invited').click();
      cy.contains(email).should('exist');
      
    });
    
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #07 con datos aleatorios: Invitar un colaborador (staff) con datos incorrectos. 
    it('Invitar un colaborador (staff) con datos incorrectos. ', function() {
      cy.get('.gh-nav-bottom-tabicon').click();
      cy.contains('a', 'Staff').click();
      cy.contains('span', 'Invite people').click();
      cy.wait(3000);
      cy.get('div').find('section').find('div').find('div').find('div').find('input').first().type(faker.random.word());
      cy.get('button.cursor-pointer.bg-black.text-white.dark\\:bg-white.dark\\:text-black.hover\\:bg-grey-900.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold.h-\\[34px\\].px-4.min-w-\\[80px\\]')
      .contains('Send invitation now')
      .click();
      cy.wait(3000);
      cy.contains('Please enter a valid email address.').should('exist');  
    });
    
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #08 con datos aleatorios: Editar las Social accounts 
    it('Editar las Social accounts ', function() {
      cy.get('.gh-nav-bottom-tabicon').click();
      cy.get('span:contains("Edit")').eq(6).click(); 
      cy.get('input').eq(1).clear().type(faker.person.firstName()); 
      cy.get('input').eq(2).clear().type(faker.person.firstName()); 
      cy.contains('Save').click();
      cy.wait(1000);
      
    });
    
    
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #09 con datos aleatorios: Agregar tags correctamente 
    it('Agregar tags correctamente ', function() {
      
      cy.get('a[href="#/tags/"]').click();
      cy.contains('New tag').click();
      const name = faker.random.word();
      cy.get('input#tag-name').type(name);
      cy.get('input[data-test-input="accentColor"]').type(faker.internet.color().substring(1));
      cy.get('textarea#tag-description').type(faker.lorem.sentence());
      cy.contains('span[data-test-task-button-state="idle"]', 'Save').click();
      cy.wait(2000);
      cy.contains('a[title="Dashboard"]', 'Dashboard').click();
      cy.wait(1000);
      
      cy.contains('a[href="#/tags/"]', 'Tags').click();
      cy.wait(1000);
      cy.contains(name).should('exist'); 
    });
    
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #10 con datos aleatorios: Agregar tags con datos erroneos  
    it('Agregar tags con datos erroneos  ', function() {
      
      cy.get('a[href="#/tags/"]').click();
      
      cy.contains('New tag').click();
      cy.get('input#tag-name').type(faker.random.word());
      cy.get('input[data-test-input="accentColor"]').type(faker.internet.color());
      cy.get('textarea#tag-description').type(faker.lorem.sentence());
      cy.contains('span[data-test-task-button-state="idle"]', 'Save').click();
        cy.wait(1000);
        cy.contains('The colour should be in valid hex format').should('exist'); 
        cy.wait(1000);
    });

});