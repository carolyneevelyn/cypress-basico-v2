Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(config) {
    cy.get('#firstName').type('Carolyne')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('carolyne@exemplo.com')
        cy.get('#open-text-area').type('Teste') 
        cy.contains('button', 'Enviar').click()
})