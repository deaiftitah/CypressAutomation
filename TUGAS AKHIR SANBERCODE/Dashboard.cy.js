import loginpom from "./pom-sanber";

describe('Dashboard',() => {
   
it('Dashboard login',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginpom.textLogin().should('have.text','Login');
        loginpom.uname().type('Admin');
        loginpom.inputPass().type('admin123');
        cy.intercept("GET","**/employees/action-summary").as("actionsummary");
                loginpom.buttonLogin().click();
                cy.wait("@actionsummary").then((intercept) => {
                expect(intercept.response.statusCode).to.eq(200);
                })
        loginpom.menuDashboard().should('have.text','Dashboard');
        cy.intercept("GET","**/viewDirectory").as("viewDirectory");
        loginpom.menusidebar().contains('Directory').click();
        loginpom.textdirectory().should('have.text','Directory');
        cy.wait("@viewDirectory").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
        })
        loginpom.inputemployee().type('mini');
        loginpom.selectname().contains('mine').click();
        loginpom.jobTitle().eq(0).click();
        loginpom.selectjobtitle().contains('HR Manager').click();
        loginpom.location().eq(1).click();
        loginpom.selectlocation().contains('Texas R&D').click();
        loginpom.buttonsearch().click();

       
        loginpom.buttonresetdirectory().click();
        
        loginpom.viewafterreset().should('contain','Records Found');
    })
})
