describe('Login Feature',() => {

  it('User is able to input the registered account and success login',() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Dashboard')
})


  it('Blank username and password is not allowed',() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
      cy.get('[name="username"]').clear('');
      cy.get('[name="password"]').clear('');
      cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
      cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('contain','Required')
      // cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text','Required')
  })


  it('Failed login because of incorrect password',() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('qwerty');
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.get('[class="oxd-text oxd-text--p oxd-alert-content-text"]').should('have.text','Invalid credentials')
})

it('Failed login because of incorrect username',() => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
  cy.get('[name="username"]').type('qwerty');
  cy.get('[name="password"]').type('admin123');
  cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
  cy.get('[class="oxd-text oxd-text--p oxd-alert-content-text"]').should('have.text','Invalid credentials')
})

it('User is able to click Forgot Password',() => {
   cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
        cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click();
        //cy.get('[name="username"]').type('Iftitah')
})

it('User is able to Reset Password',() => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
       cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
       cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click();
       cy.get('[name="username"]').type('Iftitah')
       cy.get('[class="oxd-button oxd-button--large oxd-button--secondary orangehrm-forgot-password-button orangehrm-forgot-password-button--reset"]').click();
})

it('User is able to cancel reset Password',() => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
       cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
       cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click();
       //cy.get('[name="username"]').type('Iftitah')
       cy.get('[class="oxd-button oxd-button--large oxd-button--ghost orangehrm-forgot-password-button orangehrm-forgot-password-button--cancel"]').click();
})

it('User is able to dropdown profile button',() => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
      cy.get('[name="username"]').type('Admin');
      cy.get('[name="password"]').type('admin123');
      cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
      cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Dashboard')
      cy.get('[class="oxd-icon bi-caret-down-fill oxd-userdropdown-icon"]').click();
})

it('User is able to open change password',() => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
      cy.get('[name="username"]').type('Admin');
      cy.get('[name="password"]').type('admin123');
      cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
      cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Dashboard')
      cy.get('[class="oxd-icon bi-caret-down-fill oxd-userdropdown-icon"]').click();
      cy.get('[class="oxd-userdropdown-link"]').contains('Change Password').click();

})

it('User is able to logout',() => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
      cy.get('[name="username"]').type('Admin');
      cy.get('[name="password"]').type('admin123');
      cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
      cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Dashboard')
      cy.get('[class="oxd-icon bi-caret-down-fill oxd-userdropdown-icon"]').click();
      cy.get('[class="oxd-userdropdown-link"]').contains('Logout').click();
      Cypress.on('uncaught:exception', (err, runnable) => {
        // Mengembalikan false untuk mencegah Cypress gagal pada uncaught exceptions
        return false;
      });

})

})
