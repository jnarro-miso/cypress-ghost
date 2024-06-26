const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { faker } = require('@faker-js/faker');

const name = faker.person.firstName();
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

Then('I see the dashboard {kraken-string}', async function (site) {
  this.driver.getUrl().then((url) => {
    console.log('URL:', url);
    assert.strictEqual(url, site + '#/dashboard');
  })
});

// Select button by its inner text and click on it
When('I click on {string}', async function (innerText) {
  const element = await this.driver.$(`//*/*[text() = '${innerText}']`);
  return await element.click();
});

When('I set page title to {string}', async function (title) {
  const element = await this.driver.$('[data-test-editor-title-input]');
  return await element.setValue(title)
})

When('I set page content to {string}', async function (content) {
  const element = await this.driver.$('.kg-prose');
  return await element.setValue(content)
})

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

When('I delete page', async function() {
  const options = await this.driver.$('[data-test-psm-trigger]');
  await options.click();
  const deleteButton = await this.driver.$('[data-test-button="delete-post"]')
  await deleteButton.scrollIntoView();
  await deleteButton.click();
  const confirmDeleteButton = await this.driver.$('[data-test-button="delete-post-confirm"]');
  await confirmDeleteButton.click();
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

When('I click tags', async function() {
  let element = await this.driver.$('#ember29');
  return await element.click();
})

When('I click newTag', async function() {
  let elements = await this.driver.$$('//a[contains(@class, "gh-btn-primary") and span[text()="New tag"]]'); // Usando $$ para obtener una lista de elementos
  if (elements.length > 0) {
      await elements[0].click();
  } else {
      throw new Error('Element not found');
  }
});

When('I enter tagName {kraken-string}', async function (tagName) {
  let element = await this.driver.$('#tag-name');
  return await element.setValue(tagName);
});

When('I enter tagColor {kraken-string}', async function (tagColor) {
  let element = await this.driver.$('[name="accent-color"]');
  return await element.setValue(tagColor);
});

When('I enter tagSlug {kraken-string}', async function (tagSlug) {
  let element = await this.driver.$('#tag-slug');
  return await element.setValue(tagSlug);
});

When('I enter tagDescription {kraken-string}', async function (tagDescription) {
  let element = await this.driver.$('#tag-description');
  return await element.setValue(tagDescription);
});

When('I click save', async function() {
  let element = await this.driver.$('[data-test-button="save"]');
  return await element.click();
});

Then('I should see the tag {kraken-string}', async function(tagName) {
  
  let element = await this.driver.$('h3.gh-tag-list-name[data-test-tag-name=""]');

   // Verifica si el texto del elemento coincide con el texto esperado
   let texto = await element.getText();
   if (texto !== tagName) {
      throw new Error(`Expected title "${tagName}" but found "${texto}"`);
   }
});

Then('I see page {string}', async function (pageTitle) {
  const element = await this.driver.$(`//div[@role="menuitem"]/*/*/h3[text() = '${pageTitle}']`);
  if (element === undefined) {
    throw new Error(`There's no page with title ${pageTitle}`);
  }
});

Then('I see text {string} on the page', async function (text) {
  const element = await this.driver.$(`//*/*/*[text() = '${text}']`);
  if (element === undefined) {
    throw new Error(`There's no page with title ${pageTitle}`);
  }
});

Then('I dont see {string} on the page', async function(text) {
  const element = await this.driver.$(`//*/*/*[text() = '${text}']`);
  if (element === undefined) {
    throw new Error(`There's no page with title ${pageTitle}`);
  }
});

// Para funcionalidad de posts
When('I click on Posts', async function() {
  let element = await this.driver.$('[data-test-nav="posts"]');
  return await element.click();
});

When('I go back to Posts', async function() {
  let element = await this.driver.$('[data-test-link="posts"]');
  return await element.click();
});

When('I click on New Post', async function() {
  let element = await this.driver.$("[data-test-nav='new-story']");
  return await element.click();
});

When('I enter post title {kraken-string}', async function (postTitle) {
  let element = await this.driver.$('[data-test-editor-title-input]');
  return await element.setValue(postTitle);
});

When('I click outside', async function() {
  let element = await this.driver.$('.gh-main');
  return await element.click();
})

When('I click on Publish', async function() {
  let element = await this.driver.$('[data-test-button="publish-flow"]');
  await element.click();
  let element2 = await this.driver.$('[data-test-button="continue"]');
  await element2.click();
  let element3 = await this.driver.$('[data-test-button="confirm-publish"]');
  return await element3.click();
});

When('I click on Update', async function() {
  let element = await this.driver.$('[data-test-button="publish-save"]');
  return await element.click();
});

Then('I should see {kraken-string}', async function (postTitle) {
  let element = await this.driver.$('.gh-post-bookmark-title');
  let textContent = await element.getText()
  assert.strictEqual(textContent, postTitle);
});

When('I click on Tags', async function() {
  let element = await this.driver.$('[data-test-nav="tags"]');
  return await element.click();
});

When('I click on New Tag', async function() {
  let element = await this.driver.$('.gh-btn-primary[href="#/tags/new/"]');
  return await element.click();
});

When('I enter tag name {kraken-string}', async function (tagName) {
  let element = await this.driver.$('[data-test-input="tag-name"]');
  return await element.setValue(tagName);
});

When('I click on Save button', async function() {
  let element = await this.driver.$('[data-test-button="save"]');
  return await element.click();
});

When('I go to Editor', async function() {
  let element = await this.driver.$('[data-test-button="close-publish-flow"]');
  return await element.click();
});

When('I open Post settings', async function() {
  let element = await this.driver.$('button.settings-menu-toggle');
  return await element.click();
});

When('I add the tag {kraken-string} to the post', async function (tagName) {
  let element = await this.driver.$('#tag-input');
  await element.setValue(tagName);
  await element.keys('Enter');
  let element2 = await this.driver.$('[data-test-button="publish-save"]');
  return await element2.click();
});

When('I open published post', async function() {
  let element = await this.driver.$('[data-test-editor-post-status] a');
  return await element.click();
});

Then('I should see the tag {kraken-string} in the post {kraken-string}', async function (tagName, postTitle) {
  let element1 = await this.driver.$('.gh-article-tag');
  let textContent1 = await element1.getText()
  assert.strictEqual(textContent1, tagName.toUpperCase());
  let element2 = await this.driver.$('.gh-article-title');
  let textContent2 = await element2.getText()
  assert.strictEqual(textContent2, postTitle);
});

When('I go back to Dashboard', async function() {
  let element = await this.driver.$('.gh-back-to-editor');
  return await element.click();
});

When('I go to Published posts', async function() {
  let element = await this.driver.$('[data-test-nav-custom="posts-Published"]');
  return await element.click();
});

Then('I should see the 2 posts with title {kraken-string}', async function (postTitle) {
  let elements = await this.driver.$$('.gh-content-entry-title');
  let matchingElements = await Promise.all(elements.map(async (element) => {
    let textContent = await element.getText();
    return textContent === postTitle ? element : null;
  }));
  assert.strictEqual(matchingElements.filter((element) => element !== null).length, 2);
});

When('I click on the post with title {kraken-string}', async function (postTitle) {
  let elements = await this.driver.$$('.gh-content-entry-title');
  for (let element of elements) {
    let textContent = await element.getText();
    if (textContent === postTitle) {
      return await element.click();
    }
  }
  throw new Error(`Post with title ${postTitle} not found`);
});

When('I delete the post', async function() {
  let element1 = await this.driver.$('[data-test-button="delete-post"]');
  await element1.click();
  let element2 = await this.driver.$('[data-test-button="delete-post-confirm"]');
  return await element2.click();
});

Then('I should see no posts with title {kraken-string}', async function (postTitle) {
  let elements = await this.driver.$$('.gh-content-entry-title');
  let matchingElements = await Promise.all(elements.map(async (element) => {
    let textContent = await element.getText();
    return textContent === postTitle ? element : null;
  }));
  assert.strictEqual(matchingElements.filter((element) => element !== null).length, 0);
});

Then('I should see the title {kraken-string} in the post', async function (postTitle) {
  let element = await this.driver.$('.gh-article-title');
  let textContent = await element.getText()
  assert.strictEqual(textContent, postTitle);
});
