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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login',({username, password}) => {
    cy.request('POST', 'http://localhost:3000/api/login',{username, password}).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('addUser', ({username, password}) => {
    cy.request('POST', 'http://localhost:3000/api/users', {username, password})
})

Cypress.Commands.add('createBlog',() => {
    cy.get('#createBlog').click()
    cy.get('#newblog-title').type('React patterns')
    cy.get('#newblog-author').type('Michael Chan')
    cy.get('#newblog-url').type('https://reactpatterns.com/')
    cy.get('#newblog-submit-button').click()
})