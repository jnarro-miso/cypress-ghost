const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const faker = require('faker');

const name = faker.name.findName();
const email = faker.internet.email();
let member;
const edicion = faker.lorem.paragraph();

When('I enter username {kraken-string}', async function (email) {
  let element = await this.driver.$('#identification');
  return await element.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
  let element = await this.driver.$('#password');
  return await element.setValue(password);
});

When('I click Sign in', async function () {
  let element = await this.driver.$("[data-test-button='sign-in']");
  return await element.click();
});

//Dar click en Miembros para verlos listados
When('I click on Members', async function () {
  const element = await this.driver.$('[data-test-nav="members"]');
  return await element.click();
});

//Para agregar miembro
When('I click on New Members', async function () {
  return await this.driver.$('[data-test-new-member-button="true"]').click();
});

//Completar el formulario para agregar miembro
When('I complete the form for new member', async function () {
  let element = await this.driver.$('#member-name');
  await element.setValue(name);
  
  let element1 = await this.driver.$('#member-email');
  return await element1.setValue(email);
});

When('I click on Save', async function () {
  return await this.driver.$('[data-test-task-button-state="idle"]').click();
});

When('I search the member that was created', async function () {
  //Click en members
  await this.driver.$('[data-test-nav="members"]').click();
  
  //Se hace la busqueda del miembro creado
  let element = await this.driver.$('[data-test-input="members-search"]');
  element = await element.setValue(name);
});



//Seleccionar miembro a eliminar (primero en lista)
When('I select member', async function () {
  let element1 = await this.driver.$('h3.gh-members-list-name');
  element1 = await element1.getText();
  member = element1;
  await this.driver.$('h3.gh-members-list-name').click();
});

//Eliminar el suscriptor
When('I delete a member', async function () {
  await this.driver.$('[data-test-button="member-actions"]').click();
  await this.driver.$('[data-test-button="delete-member"]').click();
});

//Consifirmar la eliminación
When('I confirm delete a member', async function () {
  await this.driver.$('[data-test-button="confirm"]').click();
});

//Busqueda de suscriptor eliminado
When('I search to delete member', async function () {
  let element = await this.driver.$('[data-test-input="members-search"]');
  element = await element.setValue(member);
});

//Validación que no exista dicho suscriptor
Then('I validate that the member was deleted succesful', async function () {
  
  //Se obtiene la respuesta del filtro
  let message = await this.driver.$('h4');
  message = await message.getText();
  if (message.trim() !== "No members match the current filter") {
      throw new Error(`El suscriptor no se elimino correctamente!.`);
  }
  return;
});


When('I complete the filter', async function () {
  await this.driver.$('[data-test-button="members-filter-actions"]').click();
  await this.driver.$('[data-test-button="add-members-filter"]').click();
  // Localiza el elemento select
  const selectElement = await this.driver.$('[data-test-select="members-filter"]');
  // Encuentra todas las opciones dentro del grupo "Basic"
  const basicOptions = await selectElement.$$('optgroup[label="Basic"] option');
  // Genera un número aleatorio para seleccionar una opción
  const randomIndex = Math.floor(Math.random() * basicOptions.length);
  
  await basicOptions[randomIndex].click();
  
  if (await this.driver.$('[data-test-input="members-filter-value"]')) {
      const randomChar = randomLetter();
      await this.driver.$('[data-test-input="members-filter-value"]').setValue(randomChar);
  }
  
  await this.driver.$('[data-test-delete-members-filter="1"]').click();
   
});

When('I complete the form for edit member', async function () {
  
  let element1 = await this.driver.$('#member-email');
  await element1.setValue(email);
  
  let noteTextarea = await this.driver.$('#member-note');
  return await noteTextarea.setValue(edicion);
});

When('I save the changes', async function () {
  let saveButton = await this.driver.$('[data-test-button="save"]');
  return await saveButton.click();
});

Then('I validate the changes', async function () {   
  
});

When('I search a edited member', async function () {
  //Click en members
  await this.driver.$('[data-test-nav="members"]').click();
  
  //Se hace la busqueda del miembro editado
  let element = await this.driver.$('[data-test-input="members-search"]');
  element = await element.setValue(member);
});

function randomLetter() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

When('I see the profile of the user', async function () {
  await this.driver.$('a.ember-view.gh-nav-bottom-tabicon').click();
});

When('I save the change', async function () {
  await this.driver.$('.cursor-pointer.text-green').click();
  let element = await this.driver.$('input[placeholder="Site description"]');
  await element.setValue(edicion);

  await this.driver.$('.cursor-pointer.text-green').click();

});

Then('I see the dashboard', async function () {
  this.driver.getUrl().then((url) => {
    console.log('URL:', url);
    assert.strictEqual(url, 'https://ghost-rpq7.onrender.com/ghost/#/dashboard');
  })
});
Then('I access to the view site', async function () {
  await this.driver.$('#done-button-container').click();
  
  await this.driver.$('[data-test-nav="site"]').click();
 
});

//Validación de creación correcta.
Then('I validate that the member was created succesful', async function () {
  
  //Se obtiene la respuesta del filtro
  let element1 = await this.driver.$('h3.gh-members-list-name');  
  element1 = await element1.getText();
  
  //Se valida que el usuario obtenido en la busqueda sea el mismo que se creo
  if (element1.trim() !== name.trim()) {
      throw new Error(`El nombre del miembro creado (${name}) no coincide con el nombre obtenido (${element1}).`);
  }
  return;
});

Then('I filter the subscriptors', async function () {    
  const applyButton = await this.driver.$('[data-test-button="members-apply-filter"]');
  await applyButton.click(); 
});

//Validación de edición correcta.
Then('I validate that the member was edited succesful', async function () {
  
  await this.driver.$('h3.gh-members-list-name').click();

  let noteTextarea = await this.driver.$('#member-note');
  let actualValue = await noteTextarea.getValue();
  
  // Comparar el valor actual con el valor esperado
  if (actualValue !== edicion) {
      throw new Error('El valor en el campo de nota no coincide con la comparación.');
  } 
  return;
});