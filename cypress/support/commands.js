const selectors = require('../support/selectors')
const _ = require('lodash')
// import '@percy/cypress';


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("visitWebsite", (url) => {
    cy.viewport(1366, 768)
    cy.visit(url)
})
Cypress.Commands.add("selectMonth", (month) => {
    cy.get(selectors.loginPage.birthMonth).select(month)

})
Cypress.Commands.add("selectDate", (date) => {
    cy.get(selectors.loginPage.birthDate).select(date)

})
Cypress.Commands.add("selectYear", (year) => {
    cy.get(selectors.loginPage.birthYear).select(year)

})

Cypress.Commands.add("name", (firstName, lastName) => {
    cy.get(selectors.loginPage.firstName).type(firstName)
    cy.get(selectors.loginPage.lastName).type(lastName)
})

Cypress.Commands.add("login", (email, password) => {
    cy.get(selectors.loginPage.loginEmail).type(email)
    cy.get(selectors.loginPage.loginPassword).type(password)
    cy.get(selectors.loginPage.signin).click()
})

Cypress.Commands.add("emailAndPassword", (mobileNumberOrEmail, confirmEmail, newPassword) => {
    cy.get(selectors.loginPage.mobileNumberOrEmail).type(mobileNumberOrEmail)
    cy.get(selectors.loginPage.confirmEmail).type(confirmEmail)
    cy.get(selectors.loginPage.newPassword).type(newPassword)
})

Cypress.Commands.add("birthDateSex", (selectMonth, selectDate, selectYear, sex) => {
    cy.selectMonth(selectMonth)
    cy.selectDate(selectDate)
    cy.selectYear(selectYear)
    cy.get(selectors.loginPage.sex).eq(sex).check()
})


