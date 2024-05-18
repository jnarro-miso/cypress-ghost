import { LoginPage } from '../pageObjects/LoginPage';
import { fetchDataFromAPI } from '../support/consumesApi';



describe('10 Escenarios correspondientes a a-priori.', function() {
  const loginPage = new LoginPage();

  let mockarooData;

  before(() => {
    // Obtener datos de la API de Mockaroo antes de ejecutar los casos de prueba
    fetchDataFromAPI()
      .then(data => {
        mockarooData = data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

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
    // Escenario #01 a priori: Creación de suscriptores desde el portal administrativo correctamente.
    it('Creación de suscriptores desde el portal administrativo correctamente.', function() {
      cy.wait(1000);

      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      cy.wait(1000);
      
      mockarooData.forEach((data, index) => {
        
        // And I click on New Members
        cy.get('[data-test-new-member-button="true"]').click();
        cy.wait(1000);
        cy.get('#member-name').clear().type(data.name);
        cy.get('#member-email').clear().type(data.email);
        cy.get('[data-test-task-button-state="idle"]').click();
        cy.wait(1000);
        cy.get('[data-test-nav="members"]').click();
        cy.wait(1000);
        cy.get('[data-test-input="members-search"]').clear().type(data.name);
        cy.wait(1000);
        cy.get('h3.gh-members-list-name')
          .invoke('text')
          .then(text => {
            cy.wait(1000);
            if (text.trim() !== data.name.trim()) {
              throw new Error(`El nombre del miembro creado (${data.name}) no coincide con el nombre obtenido (${text.trim()}).`);
            }
          });
      });
    });
  
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #02 a priori: Creación de suscriptores desde el portal administrativo suministrando correo inválido.
    it('Creación de suscriptores desde el portal administrativo suministrando correo inválido.', function() {
      cy.wait(1000);

      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      cy.wait(1000);
      
      mockarooData.forEach((data, index) => {
        cy.get('[data-test-new-member-button="true"]').click();
        cy.wait(1000);
        cy.get('#member-name').clear().type(data.name);
        cy.get('#member-email').clear().type(data.name);
        cy.get('[data-test-task-button-state="idle"]').click();
        cy.wait(1000);
        cy.get('p.response').should('contain', 'Invalid Email');
        cy.get('[data-test-nav="members"]').click();
        cy.contains('span', 'Leave').click();
      });
    });

    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    //Escenario #03 a piori: Edición de suscriptores correctamente 
    it('Edición de suscriptores correctamente.', function() {
      cy.wait(1000);
      // And I click on Members
      cy.get('[data-test-nav="members"]').click();

      mockarooData.forEach((data, index) => {
        cy.get('[data-test-input="members-search"]').clear().type(data.name);
        cy.wait(1000);
        cy.get('h3.gh-members-list-name').first().click();
        cy.wait(1000);
        cy.get('#member-note').clear().type(data.note, { force: true });
        // And I save the changes
        cy.get('[data-test-button="save"]').click();
        cy.wait(1000);

        // Then I validate the change
        cy.get('[data-test-nav="members"]').click();
        cy.get('[data-test-input="members-search"]').clear().type(data.name);
        cy.wait(1000);
        cy.get('h3.gh-members-list-name').first().click();
        cy.wait(1000);
        // Obtener el valor actual del campo de texto '#member-note'
        cy.get('#member-note').invoke('val').then(actualValue => {
          // Comparar el valor actual con el valor esperado
          if (actualValue !== data.note) {
            throw new Error('El valor en el campo de nota no coincide con el valor editado.');
          }
        });
        cy.get('[data-test-nav="members"]').click();

      });
    });

    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    //Escenario #04 a piori: Edición de suscriptores con datos erroneos. 
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

        mockarooData.forEach((data, index) => {
          cy.get('#member-email').clear().type(data.note, { force: true });
          cy.get('[data-test-button="save"]').click();
          cy.wait(1000);
          cy.get('p.response').should('contain', 'Invalid Email');
        });

      });
    });

    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #05 a piori: Editar descripción de portal principal correctamente.
    it('Editar descripción de portal principal correctamente.', function() {
      cy.wait(1000);
      // And I 
      mockarooData.forEach((data, index) => {
      cy.get('a.ember-view.gh-nav-bottom-tabicon').click();
      // And I wait for 1 seconds
      cy.wait(1000);
      // And I save the change
      cy.get('.cursor-pointer.text-green').first().click();
      cy.get('input[placeholder="Site description"]').clear().type(data.note, { force: true });
      cy.wait(1000);
      cy.get('.cursor-pointer.text-green').first().click();
      cy.wait(1000);
      // // Then I access to the view site
      cy.get('#done-button-container').click();
      cy.wait(1000);
      cy.get('[data-test-nav="site"]').click();
      cy.wait(1000);
      });
    });

    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #06 a piori: Invitar un colaborador (staff) correctamente. 
    it('Invitar un colaborador (staff) correctamente. ', function() {
      cy.get('.gh-nav-bottom-tabicon').click();
      mockarooData.forEach((data, index) => {
      cy.contains('a', 'Staff').click();
      cy.contains('span', 'Invite people').click();
      cy.wait(3000);
      cy.get('div').find('section').find('div').find('div').find('div').find('input').first().type(data.email);
      cy.get('button.cursor-pointer.bg-black.text-white.dark\\:bg-white.dark\\:text-black.hover\\:bg-grey-900.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold.h-\\[34px\\].px-4.min-w-\\[80px\\]')
      .contains('Send invitation now')
      .click();
      cy.wait(3000);
      cy.get('body').type('{esc}');
      cy.reload();
      cy.wait(2000);
      cy.get('#invited').click();
      cy.contains(data.email).should('exist');
      });

    });

    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #07 a piori: Invitar un colaborador (staff) con datos incorrectos.
    it('Invitar un colaborador (staff) con datos incorrectos.', function() {
      cy.get('.gh-nav-bottom-tabicon').click();
      mockarooData.forEach((data, index) => {
      cy.contains('a', 'Staff').click();
      cy.contains('span', 'Invite people').click();
      cy.wait(1000);
      cy.get('div').find('section').find('div').find('div').find('div').find('input').first().type(data.name);
      cy.get('button.cursor-pointer.bg-black.text-white.dark\\:bg-white.dark\\:text-black.hover\\:bg-grey-900.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold.h-\\[34px\\].px-4.min-w-\\[80px\\]')
      .contains('Send invitation now')
      .click();
      cy.wait(1000);
      cy.contains('Please enter a valid email address.').should('exist');  
      cy.wait(1000);
      cy.get('body').type('{esc}');
      });

    });

    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #08 a piori: Editar las Social accounts 
    it('Editar las Social accounts ', function() {
      mockarooData.forEach((data, index) => {
        cy.get('.gh-nav-bottom-tabicon').click();
      cy.get('span:contains("Edit")').eq(6).click(); 
      cy.get('input').eq(1).clear().type(data.name); 
      cy.get('input').eq(2).clear().type(data.name); 
      cy.contains('Save').click();
      cy.wait(1000);
      cy.get('[data-testid="exit-settings"]').click();
      cy.wait(1000);

      });
    });


    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #09 a piori: Agregar tags correctamente 
    it('Agregar tags correctamente ', function() {

      cy.get('a[href="#/tags/"]').click();
      
      mockarooData.forEach((data, index) => {
        cy.contains('New tag').click();
        cy.get('input#tag-name').type(data.nameTag);
        cy.get('input[data-test-input="accentColor"]').type(data.colorTag.substring(1));
        cy.get('textarea#tag-description').type(data.descriptionTag);
        cy.contains('span[data-test-task-button-state="idle"]', 'Save').click();
        cy.wait(2000);
        cy.contains('a[title="Dashboard"]', 'Dashboard').click();
        cy.wait(1000);
        
        cy.contains('a[href="#/tags/"]', 'Tags').click();
        cy.wait(1000);
        cy.contains(data.nameTag).should('exist'); 

      });
    });

    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #10 a piori: Agregar tags con datos erroneos 
    it('Agregar tags con datos erroneos  ', function() {

      cy.get('a[href="#/tags/"]').click();
      
      mockarooData.forEach((data, index) => {
        cy.contains('New tag').click();
        cy.get('input#tag-name').type(data.nameTag);
        cy.get('input[data-test-input="accentColor"]').type(data.colorTag);
        cy.get('textarea#tag-description').type(data.descriptionTag);
        cy.contains('span[data-test-task-button-state="idle"]', 'Save').click();
        cy.wait(1000);
        cy.contains('The colour should be in valid hex format').should('exist'); 
        cy.wait(1000);
        cy.get('a[href="#/tags/"]:first').click();
        cy.wait(1000);
        cy.contains('Leave').click();
      });
    });
   
});