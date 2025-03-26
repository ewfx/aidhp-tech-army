import Papa from 'papaparse';

describe('Content Recommendation UI Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200'); // ✅ Ensure this matches your Angular app URL
  });

  it('fills the Content Recommendation form from CSV', function () {
    cy.fixture('customers.csv').then((csvData) => {
      Papa.parse(csvData, {
        header: true,
        complete: function (results) {
          results.data.forEach((customer) => {
            cy.wait(500); // ✅ Prevent Cypress from moving too fast

            cy.get('.content-recommendation').within(() => {
              cy.get('input[formControlName="Age"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="Age"]').should('exist').type(customer.Age, { force: true, delay: 100 });

              //cy.get('input[formControlName="MaritalStatus"]').should('exist').clear().wait(300);
              cy.get('select[formControlName="MaritalStatus"]').should('exist').select(customer.MaritalStatus || 'Single', { force: true });


              cy.get('input[formControlName="Occupation"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="Occupation"]').should('exist').type(customer.Occupation, { force:true ,  delay: 100 });

              cy.get('textarea[formControlName="Interests"]').should('exist').clear().wait(300);
              cy.get('textarea[formControlName="Interests"]').should('exist').type(customer.Interests, { force: true, delay: 100 });
            });

            // ✅ Place cy.intercept() BEFORE clicking the button
            cy.intercept('POST', '**/content-recommend').as('getContentRecommendations');

            // ✅ Click the button ONCE after setting up intercept
            cy.get('.content-recommendation button').contains(' Get Content Recommendations ').click();

            // ✅ Wait for API response and verify status code
            cy.wait('@getContentRecommendations', { timeout: 10000 }).then((interception) => {
              console.log('🔹 Cypress Intercepted Content API Request:', interception);
              expect(interception.response.statusCode).to.eq(200);
            });
          });
        }
      });
    });
  });
});
