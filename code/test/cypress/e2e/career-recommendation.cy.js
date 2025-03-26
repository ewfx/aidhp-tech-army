import Papa from 'papaparse';

describe('Career Recommendation UI Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200'); // ✅ Ensure this matches your Angular app URL
  });

  it('fills the Career Recommendation form from CSV', function () {
    cy.fixture('customers.csv').then((csvData) => {
      Papa.parse(csvData, {
        header: true,
        complete: function (results) {
          results.data.forEach((customer) => {
            cy.wait(500); // ✅ Prevent Cypress from moving too fast

            cy.get('.career-recommendation').within(() => {
              cy.get('input[formControlName="Age"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="Age"]').should('exist').type(customer.Age, { force: true, delay: 100 });

              cy.get('input[formControlName="Occupation"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="Occupation"]').should('exist').type(customer.Occupation, { force:true ,  delay: 100 });

              cy.get('input[formControlName="Income"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="Income"]').should('exist').type(customer.Income, { force: true, delay: 100 });

              cy.get('textarea[formControlName="Interests"]').should('exist').clear().wait(300);
              cy.get('textarea[formControlName="Interests"]').should('exist').type(customer.Interests, { force: true, delay: 100 });
            });

            // ✅ Place cy.intercept() BEFORE clicking the button
            cy.intercept('POST', '**/career-recommend').as('getCareerRecommendations');

            // ✅ Click the button ONCE after setting up intercept
            cy.get('.career-recommendation button').contains(' Get Career Recommendations ').click();

            // ✅ Wait for API response and verify status code
            cy.wait('@getCareerRecommendations', { timeout: 10000 }).then((interception) => {
              console.log('🔹 Cypress Intercepted Content API Request:', interception);
              expect(interception.response.statusCode).to.eq(200);
            });
          });
        }
      });
    });
  });
});
