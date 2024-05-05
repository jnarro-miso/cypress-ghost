import { DashboardPage } from "./DashboardPage";

export class LoginPage {
  visit() {
    cy.visit(Cypress.env('GHOST_ADMIN_URL') + '#/signin')
  }

  login(email, password) {
    cy.get('#identification').type(email)
    cy.get('#password').type(password)
    cy.get('#ember5').click()
    return new DashboardPage()
  }
}