import { LoginPage } from "../pageObjects/LoginPage";
import { faker } from "@faker-js/faker";

describe("Pages feature", () => {
  const loginPage = new LoginPage();
  let dashboardPage;

  // Given a user is logged in to the Ghost admin
  beforeEach(() => {
    loginPage.visit();
    dashboardPage = loginPage.login(
      Cypress.env("USERNAME"),
      Cypress.env("PASSWORD")
    );
  });

  // Pool de datos (pseudo) aleatorio
  it("Creación de nueva página", () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      cy.wait(1000);
      cy.screenshot("Ghost-5.82-EP11-1");

      // When
      pagePage.gotoCreateNewPage();
      cy.screenshot("Ghost-5.82-EP11-2");

      pagePage.setPageContent(page.title, page.content);
      cy.screenshot("Ghost-5.82-EP11-3");

      pagePage.goBackToPages();
      cy.wait(1000);
      cy.screenshot("Ghost-5.82-EP11-4");

      // Then
      pagePage.checkElementExists(page.title);
    });
  });

  // Pool de datos (pseudo) aleatorio
  it("Eliminación de nueva página", () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      pagePage.createPage(page.title, page.content);
      cy.wait(1000);
      cy.screenshot("Ghost-5.82-EP13-1");

      // When
      pagePage.selectPage(page.title);
      cy.screenshot("Ghost-5.82-EP13-2");

      pagePage.deployPageOptions();
      cy.screenshot("Ghost-5.82-EP13-3");

      pagePage.clickOnDeletePage();
      cy.screenshot("Ghost-5.82-EP13-4");

      pagePage.confirmPageDeletion();
      cy.screenshot("Ghost-5.82-EP13-5");

      cy.wait(1000);
      cy.screenshot("Ghost-5.82-EP13-6");

      //Then
      pagePage.checkElementDontExist(page.title);
    });
  });

  // Pool de datos (pseudo) aleatorio
  it("Guardar Draft", () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();

      // When
      pagePage.createPage(page.title, page.content);

      // //Then
      pagePage.checkContentExist(page.title, page.content);
    });
  });

  // Pool de datos (pseudo) aleatorio
  it("Editar página", () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      pagePage.createPage(page.title, page.content);

      // When
      pagePage.editPage(page.title, "new-title", "new-content");

      // //Then
      pagePage.checkElementExists("new-title");
    });
  });

  // Pool de datos (pseudo) aleatorio
  it("Publicar página", () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      pagePage.createPage(page.title, page.content);
      // When
      pagePage.publishPage(page.title);
      pagePage.orderPagesByRecentUpdates();
      // Then
      pagePage.checkPageStatus(page.title, "Published");
    });
  });

  // Pool de datos (pseudo) aleatorio
  it("Add tag to page", () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      // When
      pagePage.gotoCreateNewPage();
      pagePage.deployPageOptions();
      pagePage.addTag(page.tags[0]);

      pagePage.checkElementExists(page.tags[0]);
    });
  });

  // Pool de datos (pseudo) aleatorio
  it("Add more than one tag to page", () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      // When
      pagePage.gotoCreateNewPage();
      pagePage.deployPageOptions();
      pagePage.addTag(page.tags[0]);
      pagePage.addTag(page.tags[1]);

      pagePage.checkElementExists(page.tags[0]);
      pagePage.checkElementExists(page.tags[1]);
    });
  });

  // Pool de datos (pseudo) aleatorio
  it("change default URI to page", () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      // When
      pagePage.gotoCreateNewPage();
      pagePage.deployPageOptions();
      pagePage.addUri(page.uri);

      pagePage.checkElementExists(page.uri + "/");
    });
  });

  // Pool de datos (pseudo) aleatorio
  it("Words counter works correctly", () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      // When
      pagePage.gotoCreateNewPage();
      pagePage.setPageContent(page.title, page.content);

      pagePage.checkElementExists(
        `${page.content.trim().split(/\s+/).length} words`
      );
    });
  });

  // Escenario aleatorio
  it("Excerpt text with 299 chars", () => {
    const randomExcerpt = faker.string.alphanumeric(299);
    // Given
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.setExcerpt(randomExcerpt);

    // Then
    pagePage.checkElementDontExist(
      "Excerpt cannot be longer than 300 characters."
    );
  });

  // Escenario aleatorio
  it("Excerpt text with 300 chars", () => {
    const randomExcerpt = faker.string.alphanumeric(300);
    // Given
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.setExcerpt(randomExcerpt);

    // Then
    pagePage.checkElementDontExist(
      "Excerpt cannot be longer than 300 characters."
    );
  });

  // Escenario aleatorio
  it("Excerpt text with 301 chars", () => {
    const randomExcerpt = faker.string.alphanumeric(301);
    // Given
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.setExcerpt(randomExcerpt);

    // Then
    pagePage.checkElementExists(
      "Excerpt cannot be longer than 300 characters."
    );
  });

  // Escenario aleatorio
  it("Set publish date in correct format", () => {
    // Given
    const randomDate = faker.date.anytime();
    const formattedDate = randomDate.toISOString().split("T")[0];
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.setPublishDate(formattedDate);

    // Then
    pagePage.checkElementDontExist("Invalid date format, must be YYYY-MM-DD");
  });

  // Escenario aleatorio
  it("Set publish date in incorrect format", () => {
    // Given
    const hour = faker.string.alpha(5);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.setPublishDate(hour);

    // Then
    pagePage.checkElementExists("Invalid date format, must be YYYY-MM-DD");
  });

  // Escenario aleatorio
  it("Add Facebook card title 299 chars long", () => {
    // Given
    const randomTitle = faker.string.alphanumeric(299);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.clickOnFacebookCard();
    pagePage.setFacebookCardTitle(randomTitle);

    // Then
    pagePage.checkElementDontExist(
      "Facebook Title cannot be longer than 300 characters."
    );
  });

  // Escenario aleatorio
  it("Add Facebook card title 300 chars long", () => {
    // Given
    const randomTitle = faker.string.alphanumeric(300);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.clickOnFacebookCard();
    pagePage.setFacebookCardTitle(randomTitle);

    // Then
    pagePage.checkElementDontExist(
      "Facebook Title cannot be longer than 300 characters."
    );
  });

  // Escenario aleatorio
  it("Add Facebook card title 301 chars long", () => {
    // Given
    const randomTitle = faker.string.alphanumeric(301);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.clickOnFacebookCard();
    pagePage.setFacebookCardTitle(randomTitle);

    // Then
    pagePage.checkElementExists(
      "Facebook Title cannot be longer than 300 characters."
    );
  });

  // Escenario aleatorio
  it("Add Facebook card description 499 chars long", () => {
    // Given
    const randomDescription = faker.string.alphanumeric(499);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.clickOnFacebookCard();
    pagePage.setFacebookCardDescription(randomDescription);

    // Then
    pagePage.checkElementDontExist(
      "Facebook Description cannot be longer than 500 characters."
    );
  });

  // Escenario aleatorio
  it("Add Facebook card description 500 chars long", () => {
    // Given
    const randomDescription = faker.string.alphanumeric(500);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.clickOnFacebookCard();
    pagePage.setFacebookCardDescription(randomDescription);

    // Then
    pagePage.checkElementDontExist(
      "Facebook Description cannot be longer than 500 characters."
    );
  });

  // Escenario aleatorio
  it("Add Facebook card description 501 chars long", () => {
    // Given
    const randomDescription = faker.string.alphanumeric(501);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.clickOnFacebookCard();
    pagePage.setFacebookCardDescription(randomDescription);

    // Then
    pagePage.checkElementExists(
      "Facebook Description cannot be longer than 500 characters."
    );
  });

  // Escenario aleatorio
  it("Add X card title 299 chars long", () => {
    // Given
    const randomTitle = faker.string.alphanumeric(299);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.clickOnXCard();
    pagePage.setXCardTitle(randomTitle);

    // Then
    pagePage.checkElementDontExist(
      "Twitter Title cannot be longer than 300 characters."
    );
  });

  // Escenario aleatorio
  it("Add X card title 300 chars long", () => {
    // Given
    const randomTitle = faker.string.alphanumeric(300);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.clickOnXCard();
    pagePage.setXCardTitle(randomTitle);

    // Then
    pagePage.checkElementDontExist(
      "Twitter Title cannot be longer than 300 characters."
    );
  });

  // Escenario aleatorio
  it("Add X card title 300 chars long", () => {
    // Given
    const randomTitle = faker.string.alphanumeric(301);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.clickOnXCard();
    pagePage.setXCardTitle(randomTitle);

    // Then
    pagePage.checkElementExists(
      "Twitter Title cannot be longer than 300 characters."
    );
  });

  // Escenario aleatorio
  it("Add X card Description 499 chars long", () => {
    // Given
    const randomTitle = faker.string.alphanumeric(499);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.clickOnXCard();
    pagePage.setXCardDescription(randomTitle);

    // Then
    pagePage.checkElementDontExist(
      "Twitter Description cannot be longer than 500 characters."
    );
  });

  // Escenario aleatorio
  it("Add X card Description 500 chars long", () => {
    // Given
    const randomTitle = faker.string.alphanumeric(500);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.clickOnXCard();
    pagePage.setXCardDescription(randomTitle);

    // Then
    pagePage.checkElementDontExist(
      "Twitter Description cannot be longer than 500 characters."
    );
  });

  // Escenario aleatorio
  it("Add X card Description 501 chars long", () => {
    // Given
    const randomTitle = faker.string.alphanumeric(501);
    const pagePage = dashboardPage.goToPages();
    // When
    pagePage.gotoCreateNewPage();
    pagePage.deployPageOptions();
    pagePage.clickOnXCard();
    pagePage.setXCardDescription(randomTitle);

    // Then
    pagePage.checkElementExists(
      "Twitter Description cannot be longer than 500 characters."
    );
  });

  // A-priory tests
  it("Set uri with special characters", () => {
    // Given
    cy.fixture("page-uri.json").then(({ specialChars }) => {
      const pagePage = dashboardPage.goToPages();
      // When
      pagePage.gotoCreateNewPage();
      pagePage.deployPageOptions();
      pagePage.addUri(specialChars.case);

      // Then
      pagePage.checkElementExists("/" + specialChars.expected);
    });
  });

  // A-priory tests
  it("Set uri with white spaces", () => {
    // Given
    cy.fixture("page-uri.json").then(({ whiteSpaces }) => {
      const pagePage = dashboardPage.goToPages();
      // When
      pagePage.gotoCreateNewPage();
      pagePage.deployPageOptions();
      pagePage.addUri(whiteSpaces.case);

      // Then
      pagePage.checkElementExists("/" + whiteSpaces.expected);
    });
  });

  // A-priory tests
  it("Set invalid URL to metadata cononical URL", () => {
    // Given
    cy.fixture("page-uri.json").then(({ badUrl }) => {
      const pagePage = dashboardPage.goToPages();
      // When
      pagePage.gotoCreateNewPage();
      pagePage.deployPageOptions();
      pagePage.clickOnMetadata();
      pagePage.setCanonicalUrl(badUrl.case);
      // Then
      pagePage.checkElementExists(badUrl.expected);
    });
  });

  // A-priory tests
  it("Set valid URL to metadata cononical URL", () => {
    // Given
    cy.fixture("page-uri.json").then(({ goodUrl }) => {
      const pagePage = dashboardPage.goToPages();
      // When
      pagePage.gotoCreateNewPage();
      pagePage.deployPageOptions();
      pagePage.clickOnMetadata();
      pagePage.setCanonicalUrl(goodUrl.case);
      // Then
      pagePage.checkElementDontExist(goodUrl.notExpected);
    });
  });
});
