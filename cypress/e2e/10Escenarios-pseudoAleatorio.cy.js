import { LoginPage } from '../pageObjects/LoginPage';
import { faker } from '@faker-js/faker';


describe('10 Escenarios correspondientes a generación de datos (pseudo)aleatorios).', function() {
  const loginPage = new LoginPage()
  let randomSeed = Math.floor(Math.random() * 100000);
  
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
  // Escenario #01 (pseudo)aleatorio: Creación de suscriptores desde el portal administrativo correctamente
    it('Creación de suscriptores desde el portal administrativo correctamente.', function() {
      cy.wait(1000);

      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      cy.wait(1000);

      // And I click on New Members
      cy.get('[data-test-new-member-button="true"]').click();
      cy.wait(1000);
      
      // And I complete the form for new member
      faker.seed(randomSeed);
      const name = faker.person.firstName();
      const email =  faker.internet.email();
      cy.get('#member-name').clear().type(name);
      cy.get('#member-email').clear().type(email);
      cy.wait(1000);

      // And I click on Save
      cy.get('[data-test-task-button-state="idle"]').click();
      cy.wait(1000);
      
      // Then I validate that the member was created succesful
      cy.get('[data-test-nav="members"]').click();
      cy.wait(1000);
      cy.get('[data-test-input="members-search"]').clear().type(name); 
      cy.wait(3000);
      cy.get('h3.gh-members-list-name')
      .invoke('text')
      .then(text => {
        cy.wait(1000);
        if (text.trim() !== name.trim()) {
          throw new Error(`El nombre del miembro creado (${name}) no coincide con el nombre obtenido (${text.trim()}).`);
          }
        });
            });

    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // // Escenario #02 (pseudo)aleatorio: Creación de suscriptores desde el portal administrativo suministrando correo inválido.
    it('Creación de suscriptores desde el portal administrativo suministrando correo inválido.', function() {
      cy.wait(1000);

      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      cy.wait(1000);

      // And I click on New Members
      cy.get('[data-test-new-member-button="true"]').click();
      cy.wait(1000);

      // And I complete the form for new member
      faker.seed(randomSeed);
      const name = faker.person.firstName();
      const email =  faker.internet.email();
      cy.get('#member-name').clear().type(name);
      cy.get('#member-email').clear().type(name);

      // And I click on Save
      cy.get('[data-test-task-button-state="idle"]').click();
      cy.wait(1000);
      

      // Then I validate that the member wasm't created succesful and show the alert with email error
      cy.get('p.response').should('contain', 'Invalid Email')
    });
    

    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #03 (pseudo)aleatorio: Edición de suscriptores correctamente. 
    it('Edición de suscriptores correctamente. ', function() {
      cy.wait(1000);
      
      // And I click on Members
      cy.get('[data-test-nav="members"]').click();
      
      faker.seed(randomSeed);
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
        cy.get('[data-test-input="members-search"]').clear().type(text.trim());
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
    // Escenario #04 (pseudo)aleatorio: Edición de suscriptores con datos erroneos. 
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

        faker.seed(randomSeed);
        cy.get('#member-email').clear().type(faker.lorem.sentence(), { force: true });
        cy.get('[data-test-button="save"]').click();
        cy.wait(1000);
        cy.get('p.response').should('contain', 'Invalid Email');
        

      });
    });


    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #05 (pseudo)aleatorio: Editar descripción de portal principal correctamente.
    it('Editar descripción de portal principal correctamente.', function() {
      cy.wait(1000);
      // And I 
      cy.get('a.ember-view.gh-nav-bottom-tabicon').click();
      // And I wait for 1 seconds
      cy.wait(1000);
      // And I save the change
      cy.get('.cursor-pointer.text-green').first().click();
      faker.seed(randomSeed);
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
    // Escenario #06 (pseudo)aleatorio: Invitar un colaborador (staff) correctamente. 
    it('Invitar un colaborador (staff) correctamente. ', function() {
      cy.get('.gh-nav-bottom-tabicon').click();
      cy.contains('a', 'Staff').click();
      cy.contains('span', 'Invite people').click();
      cy.wait(3000);
      faker.seed(randomSeed);
      cy.get('div').find('section').find('div').find('div').find('div').find('input').first().clear().type(faker.internet.email());
      cy.get('button.cursor-pointer.bg-black.text-white.dark\\:bg-white.dark\\:text-black.hover\\:bg-grey-900.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold.h-\\[34px\\].px-4.min-w-\\[80px\\]')
      .contains('Send invitation now')
      .click();
      cy.wait(3000);
      cy.get('body').type('{esc}');
      cy.reload();

      cy.wait(2000);
      cy.get('#invited').click();

      faker.seed(randomSeed);
      cy.contains(faker.internet.email()).should('exist');

    });

    
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #07 (pseudo)aleatorio: Invitar un colaborador (staff) con datos incorrectos. 
    it('Invitar un colaborador (staff) con datos incorrectos. ', function() {
      cy.get('.gh-nav-bottom-tabicon').click();
      cy.contains('a', 'Staff').click();
      cy.contains('span', 'Invite people').click();
      cy.wait(3000);
      faker.seed(randomSeed);
      cy.get('div').find('section').find('div').find('div').find('div').find('input').first().clear().type(faker.random.word());
      cy.get('button.cursor-pointer.bg-black.text-white.dark\\:bg-white.dark\\:text-black.hover\\:bg-grey-900.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold.h-\\[34px\\].px-4.min-w-\\[80px\\]')
      .contains('Send invitation now')
      .click();
      cy.wait(3000);
      cy.contains('Please enter a valid email address.').should('exist');  
    });


    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #08 (pseudo)aleatorio: Editar las Social accounts 
    it('Editar las Social accounts ', function() {
      cy.get('.gh-nav-bottom-tabicon').click();
      cy.get('span:contains("Edit")').eq(6).click(); 
      faker.seed(randomSeed);
      cy.get('input').eq(1).clear().type(faker.person.firstName()); 
      cy.get('input').eq(2).clear().type(faker.person.firstName()); 
      cy.contains('Save').click();
      cy.wait(1000);

    });


    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #09 (pseudo)aleatorio: Agreg<ar tags correctamente 
    it('Agregar tags correctamente ', function() {

      cy.get('a[href="#/tags/"]').click();
      cy.contains('New tag').click();
      faker.seed(randomSeed);
      const nameTag = faker.random.word();
      cy.get('input#tag-name').clear().type(nameTag);
      cy.get('input[data-test-input="accentColor"]').clear().type(faker.internet.color().substring(1));
      cy.get('textarea#tag-description').clear().type(faker.lorem.sentence());
      cy.contains('span[data-test-task-button-state="idle"]', 'Save').click();
      cy.wait(2000);
      cy.contains('a[title="Dashboard"]', 'Dashboard').click();
      cy.wait(1000);
      
      cy.contains('a[href="#/tags/"]', 'Tags').click();
      cy.wait(1000);
      cy.contains(nameTag).should('exist'); 
    });


    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    // Escenario #10 (pseudo)aleatorio: Agregar tags con datos erroneos  
    it('Agregar tags con datos erroneos  ', function() {

      cy.get('a[href="#/tags/"]').click();
      cy.contains('New tag').click();
      faker.seed(randomSeed);
      const nameTag = faker.random.word();
      cy.get('input#tag-name').clear().type(nameTag);
      cy.get('input[data-test-input="accentColor"]').clear().type(faker.internet.color());
      cy.get('textarea#tag-description').clear().type(faker.lorem.sentence());
      cy.contains('span[data-test-task-button-state="idle"]', 'Save').click();
      cy.wait(1000);
        cy.contains('The colour should be in valid hex format').should('exist'); 
        cy.wait(1000);

    });
});