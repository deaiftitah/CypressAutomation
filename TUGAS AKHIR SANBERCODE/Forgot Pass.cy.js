/// <reference types="cypress"/>

import pom from "./pom";
 
describe('Login Feature',() => {
    it('User Login with Valid credentials',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword().type('admin123');
        cy.intercept("GET","**/employees/action-summary").as("actionsummary");
        loginPage.buttonLogin().click();
        cy.wait("@actionsummary").then((intercept) => {
          expect(intercept.response.statusCode).to.equal(200);
         });
        loginPage.menuDashboard().should('have.text','Dashboard')
    })

    it('Pengguna tidak dapat login menggunakan data Username Invalid', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') 
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Yuturr');
        loginPage.inputPassword().type('admin123');
        cy.intercept("GET","**/messages").as("messages");
        loginPage.buttonLogin().click();
        cy.wait("@messages").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(304);
           });
        loginPage.invalidCredentials().should('have.text','Invalid credentials')
  })

  it('Pengguna tidak dapat login menggunakan data Password Invalid', () => {
       cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') 
       loginPage.textLogin().should('have.text','Login');
       loginPage.inputUsername().type('Admin');
       loginPage.inputPassword().type('TYEYYYE3');
       cy.intercept("GET","**/messages").as("messages");
       loginPage.buttonLogin().click();
       cy.wait("@messages").then((intercept) => {
           expect(intercept.response.statusCode).to.equal(304);
       });
       loginPage.invalidCredentials().should('have.text','Invalid credentials')
})

it('Pengguna Login dengan Username dan Password Invalid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') 
    loginPage.textLogin().should('have.text','Login');
    loginPage.inputUsername().type('TREEW');
    loginPage.inputPassword().type('TYEYYYE3');
    cy.intercept("GET","**/messages").as("messages");
    loginPage.buttonLogin().click();
    cy.wait("@messages").then((intercept) => {
        expect(intercept.response.statusCode).to.equal(304);
    });
    loginPage.invalidCredentials().should('have.text','Invalid credentials')
})


it('Pengguna login setelah reset password untuk memastikan password baru berfungsi', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.textLogin().should('have.text','Login');
    loginPage.forgotPassword().click();
    loginPage.textReset().should('contain','Reset Password');
    loginPage.inputUsername().type('Admin');
    cy.intercept("GET","**/messages").as("messages");
    loginPage.buttonReset().click();
    cy.wait("@messages").then((intercept) => {
        expect(intercept.response.statusCode).to.eq(304);
    })
    loginPage.textSuccesReset().should('contain','Reset Password link sent successfully');    
}) 

/it('Pengguna login melakukan Cancel password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.textLogin().should('have.text','Login');
    loginPage.forgotPassword().click();
    loginPage.textReset().should('contain','Reset Password');
    cy.intercept("GET","**/messages").as("messages");
    loginPage.buttonCancel().click();
    cy.wait("@messages").then((intercept) => {
        expect(intercept.response.statusCode).to.eq(304);
    })
    loginPage.buttonLogin().click();    
}) 

it('Pengguna Melakukan Logout pada website', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    loginPage.textLogin().should('have.text','Login');
    loginPage.inputUsername().type('Admin');
    loginPage.inputPassword().type('admin123');
    loginPage.buttonLogin().click();
    loginPage.menuDashboard().should('have.text','Dashboard')
    loginPage.tablogout().click();
    loginPage.LogoutPage().contains('Logout').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Mengembalikan false untuk mencegah Cypress gagal pada uncaught exceptions
        return false;
      });
})
})