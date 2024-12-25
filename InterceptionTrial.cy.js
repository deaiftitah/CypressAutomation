Cypress.on('uncaught:exception', (err, runnable) => {
  console.error(err);
  return false;
});

describe('Login Feature',() => {

  it('User is able to input the registered account and success login',() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');
    //cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/indexhttps://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as("actionsummary");
    cy.intercept("GET", "**/employees/action-summary").as("actionsummary");
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    //cy.wait('@actionsummary').its('response.statusCode').should('eq', 200);
    cy.wait("@actionsummary").then((intercept) => { 
      expect(intercept.response.statusCode).to.equal(200); 
    });
    //cy.wait("@actionsumary",{timeout: 5000}).then((intercept)=>{
    //  var responseBody = intercept.response.body;
    //  expect(responseBody).to.have.property('data').that.is.an('array');
    //  expect(responseBody).to.have.property('meta');
    //  expect(responseBody).to.have.property('rels');
    //  expect(intercept.response.statusCode).to.equal(200);
    cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Dashboard')
    })


  it('Blank username and password is not allowed',() => {
    cy.intercept('GET', '/web/index.php/core/i18n/messages', {
      statusCode: 400,
      body: { message: 'Username and password are required.' },
    }).as('required');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    //cy.get('[name="username"]').clear('');
    //cy.get('[name="password"]').clear('');
    //cy.intercept('POST', '/api/v1/auth/login').as("required");
    //cy.intercept("POST", "**/web/index.php/core/i18n/messages").as("required");
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.wait('@required').its('response.statusCode').should('eq', 400);
    //cy.wait('@required').then((intercept) => { 
      //console.log('Intercept:', intercept);
      //expect(intercept.response.statusCode).to.equal(400); 
      //});
    cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('contain.text','general.required')
    })

    it('Failed login because of incorrect password',() => {
      cy.intercept('GET', '/web/index.php/core/i18n/messages', {
        statusCode: 400,
        body: { message: 'Invalid credentials.' },
    }).as('incorrectpass');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('qwerty');
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.wait('@incorrectpass').its('response.statusCode').should('eq', 400);
    cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
});
      
    it('Failed login because of incorrect username',() => {
      cy.intercept('GET', '/web/index.php/core/i18n/messages', {
        statusCode: 400,
        body: { message: 'Invalid credentials.' },
    }).as('incorrectuser');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('qwert');
    cy.get('[name="password"]').type('admin123');
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.wait('@incorrectuser').its('response.statusCode').should('eq', 400);
    cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
    });

    //LOCATIONS
    it('Succes login and direct to dashboard',() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
      cy.get('[name="username"]').type('Admin');
      cy.get('[name="password"]').type('admin123');
      cy.intercept("GET","https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations").as("dashboard");
      cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
      cy.wait("@dashboard").then((intercept) => {
          var responseBody = intercept.response.body;
          expect(responseBody).to.have.property('data').that.is.an('array');
              responseBody.data.forEach((response) => {
          expect(intercept.response.statusCode).to.equal(200); 
          //array "data"
          expect(response).to.have.property('location');
          expect(response.location).to.have.property('id');
          expect(response.location).to.have.property('name');
          expect(response).to.have.property('count').that.is.a('number');
          //meta
          expect(responseBody.meta).to.have.property('otherEmployeeCount');
          expect(responseBody.meta).to.have.property('unassignedEmployeeCount');
          expect(responseBody.meta).to.have.property('totalLocationCount');
          })
      })
    })
    
  })