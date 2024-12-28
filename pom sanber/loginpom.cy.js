/// <reference types="cypress"/>

import loginpom from "./pom-sanber";
 
describe('Login Feature',() => {
    it('User Login with Valid credentials',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginpom.login().should('have.text','Login');
        loginpom.uname().type('Admin');
        loginpom.inputPass().type('admin123');
        cy.intercept("GET","**/employees/action-summary").as("actionsummary");
        loginpom.buttonLogin().click();
        cy.wait("@actionsummary").then((intercept) => {
          expect(intercept.response.statusCode).to.equal(200);
         });
        loginpom.menuDashboard().should('have.text','Dashboard')
    })

    it('User login with invalid username', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') 
        loginpom.login().should('have.text','Login');
        loginpom.uname().type('qwerty');
        loginpom.inputPass().type('admin123');
        cy.intercept("GET","**/messages").as("messages");
        loginpom.buttonLogin().click();
        cy.wait("@messages").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(304);
           });
        loginpom.invalidCredentials().should('have.text','Invalid credentials')
  })

  it('User login with invalid password', () => {
       cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') 
       loginpom.login().should('have.text','Login');
       loginpom.uname().type('Admin');
       loginpom.inputPass().type('qwerty');
       cy.intercept("GET","**/messages").as("messages");
       loginpom.buttonLogin().click();
       cy.wait("@messages").then((intercept) => {
           expect(intercept.response.statusCode).to.equal(304);
       });
       loginpom.invalidCredentials().should('have.text','Invalid credentials')
})

it('User login with invalid username and password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') 
    loginpom.login().should('have.text','Login');
    loginpom.uname().type('qwerty');
    loginpom.inputPass().type('qwerty');
    cy.intercept("GET","**/messages").as("messages");
    loginpom.buttonLogin().click();
    cy.wait("@messages").then((intercept) => {
        expect(intercept.response.statusCode).to.equal(304);
    });
    loginpom.invalidCredentials().should('have.text','Invalid credentials')
})


it('User is able to reset password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginpom.login().should('have.text','Login');
    loginpom.forgotPassword().click();
    loginpom.textReset().should('contain','Reset Password');
    loginpom.uname().type('Admin');
    cy.intercept("GET","**/messages").as("messages");
    loginpom.buttonReset().click();
    cy.wait("@messages").then((intercept) => {
        expect(intercept.response.statusCode).to.eq(304);
    })
    loginpom.textSuccesReset().should('contain','Reset Password link sent successfully');    
}) 

it('User is able to cancel reset password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginpom.login().should('have.text','Login');
    loginpom.forgotPassword().click();
    loginpom.textReset().should('contain','Reset Password');
    cy.intercept("GET","**/messages").as("messages");
    loginpom.buttonCancel().click();
    cy.wait("@messages").then((intercept) => {
        expect(intercept.response.statusCode).to.eq(304);
    })
    loginpom.buttonLogin().click();    
}) 

it('User is able to logout', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    loginpom.login().should('have.text','Login');
    loginpom.uname().type('Admin');
    loginpom.inputPass().type('admin123');
    loginpom.buttonLogin().click();
    loginpom.menuDashboard().should('have.text','Dashboard')
    loginpom.tablogout().click();
    loginpom.LogoutPage().contains('Logout').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Mengembalikan false untuk mencegah Cypress gagal pada uncaught exceptions
        return false;
      });
})
})
