import { DashboardPage } from "./DashboardPage";

export class LoginPage {
  visit() {
    cy.visit(Cypress.env('GHOST_ADMIN_URL') + '#/signin')
  }

  visitOld() {
    cy.visit(Cypress.env('OLD_GHOST_ADMIN_URL') + '#/signin')
  }

  login(email, password) {
    cy.get('#identification').type(email)
    cy.get('#password').type(password)
    cy.get("[data-test-button='sign-in']").click()
    return new DashboardPage()
  }

  loginOld(email, password) {
    cy.get("[name='identification']").type(email)
    cy.get("[name='password']").type(password)
    cy.get("button.login").click()
    cy.wait(1000)
    return new DashboardPage()
  }
}