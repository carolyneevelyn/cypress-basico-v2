/// <reference types="Cypress" />


// bloco describe define a suíte de testes 
// bloco it define um caso de teste
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() { //BeforeEach para cada pré condição antes do teste acontecer.
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
         cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        
        cy.get('#firstName').type('Carolyne')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('carolyne@exemplo.com')
        cy.get('#open-text-area').type(longText, { delay: 0 }) //delay para o formulário.
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible') //cenário de teste que é visível a msg de sucesso.
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Carolyne')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('carolyne@exemplo,com') //email com formatação inválida (com uma vírgula).
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-númerico', function() {
        cy.get('#phone')    
            .type('abcdefghij')
            .should('have.value', '')
    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Carolyne')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('carolyne@exemplo.com') //email com formatação inválida (com uma vírgula).
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Carolyne')
            .should('have.value', 'Carolyne') // verifica se o valor que foi digitado está realmente correto
            .clear() // limpa os campos
            .should('have.value', '')
        cy.get('#lastName')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('carolyne@exemplo.com')
            .should('have.value', 'carolyne@exemplo.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('867678')
            .should('have.value', '867678')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube') //selecionando pelo texto
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria') //selecionando pelo valor 
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product') //selecionando pelo indice 
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
           .should('have.length', 3) // verifica se tem realmente 3 opções
           .each(function($radio) { // empacota cada opção
            cy.wrap($radio).check() // marca cada opção
            cy.wrap($radio).should('be.checked') // checa se foi marcado
           })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check() //selecionando todas as opções de checkbox
            .should('be.checked') //verificando se foram selecionados.
            .last() //selecionando o último elemento marcado
            .uncheck() //desmarcando o último elemento
            .should('not.be.checked') //verificando se realmente foi desmarcado
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
    })
  })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

})




