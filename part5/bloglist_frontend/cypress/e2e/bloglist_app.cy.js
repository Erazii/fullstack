describe('BLOG APP', () => {
  beforeEach(function (){
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
  })
  describe('tests before logged in', function (){
    beforeEach(function (){
      cy.visit('http://localhost:3000')
      cy.contains('Log in').click()
    })

    it('login form is displayed by default', function (){
      cy.contains('Username')
      cy.contains('Password')
    })

    describe('login', function (){
      beforeEach(function (){
        cy.request('POST', 'http://localhost:3000/api/users', {username: 'erazi', password:'123456789'})
      })
      it('success with the correct credential', function (){
        cy.get('#username').type('erazi')
        cy.get('#password').type('123456789')
        cy.get('#login-button').click()
        cy.contains('erazi is logged in')
      })
      it('fails with the wrong credentials', function () {
        cy.get('#username').type('izare')
        cy.get('#password').type('123456789')
        cy.get('#login-button').click()
        cy.contains('Invalid password or username')
        cy.get('#username').type('erazi')
        cy.get('#password').type('12345678')
        cy.get('#login-button').click()
        cy.contains('Invalid password or username')
      });
    })
  })
  describe('tests when logged in', function (){
    beforeEach(function (){
      cy.addUser({username: 'erazi', password:'123456789'})
      cy.login({username: 'erazi', password:'123456789'})
    })
    it('A blog can be created', function () {
      cy.createBlog()
      cy.contains('React patterns')
      cy.contains('Michael Chan')
      cy.contains('https://reactpatterns.com/')
    });
    it('A user can like a post', function () {
      cy.createBlog()
      cy.get('#view-info').click()
      cy.get('#like-button').click()
      cy.get('#blogLikes').contains('1')
    });
    it('A user can delete a post', function () {
      cy.createBlog()
      cy.get('#view-info').click()
      cy.contains('React patterns')
      cy.get('#deleteblog-button').click()
      cy.get('html').should('not.contain', 'React patterns')
    });
    it.only('blogs are ordered according to likes with the blog with the most likes being first', function () {
      cy.createBlog()
      cy.get('#newblog-title').type('Second')
      cy.get('#newblog-author').type('IDK')
      cy.get('#newblog-url').type('IDK')
      cy.get('#newblog-submit-button').click()

      cy.get('.blog').eq(0).should('contain', 'React patterns')

      cy.get('.blog').eq(1).get('.view-info').eq(1).click()
      cy.get('.like-button').eq(1).click()
      cy.get('.blog').eq(0).should('contain', 'Second')
      /*cy.get('.blog').eq(0).get('#like-button').click()*/


    });
  })
})