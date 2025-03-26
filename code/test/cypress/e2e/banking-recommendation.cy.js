import Papa from 'papaparse';

describe('Banking Solution Recommendation UI Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200'); // ✅ Ensure this matches your Angular app URL
  });

  it('fills the Banking Solution Recommendation form from CSV', function () {
    cy.fixture('customers.csv').then((csvData) => {
      Papa.parse(csvData, {
        header: true,
        complete: function (results) {
          results.data.forEach((customer) => {
            cy.wait(500); // ✅ Prevent Cypress from moving too fast

            cy.get('.banking-recommendation').within(() => {
              cy.get('input[formControlName="Age"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="Age"]').should('exist').type(customer.Age, { force: true, delay: 100 });

              //cy.get('input[formControlName="MaritalStatus"]').should('exist').clear().wait(300);
              cy.get('select[formControlName="MaritalStatus"]').should('exist').select(customer.MaritalStatus || 'Single', { force: true });


              cy.get('input[formControlName="Income"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="Income"]').should('exist').type(customer.Income, { force: true, delay: 100 });

              cy.get('textarea[formControlName="Interests"]').should('exist').clear().wait(300);
              cy.get('textarea[formControlName="Interests"]').should('exist').type(customer.Interests, { force: true, delay: 100 });
            });

            // ✅ Place cy.intercept() BEFORE clicking the button
            cy.intercept('POST', '**/banking-recommend').as('getBankingRecommendations');

            // ✅ Click the button ONCE after setting up intercept
            cy.get('.banking-recommendation button').contains(' Get Banking Recommendations ').click();

            // ✅ Wait for API response and verify status code
            cy.wait('@getBankingRecommendations', { timeout: 10000 }).then((interception) => {
              console.log('🔹 Cypress Intercepted Banking API Request:', interception);
              expect(interception.response.statusCode).to.eq(200);
            });
          });
        }
      });
    });
  });
});
