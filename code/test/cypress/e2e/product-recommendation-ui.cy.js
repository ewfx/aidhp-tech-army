import Papa from 'papaparse';

describe('Product Recommendation UI Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200'); // ✅ Ensure this matches your Angular app URL
  });

  it('fills the Product Recommendation form from CSV', function () {
    cy.fixture('customers.csv').then((csvData) => {
      Papa.parse(csvData, {
        header: true,
        complete: function (results) {
          results.data.forEach((customer) => {
            cy.wait(500); // ✅ Prevent Cypress from moving too fast

            cy.get('.product-recommendation').within(() => {
              cy.get('input[formControlName="Age"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="Age"]').should('exist').type(customer.Age, { force: true, delay: 100 });

              cy.get('select[formControlName="Gender"]').should('exist').select(customer.Gender || 'Male', { force: true }); // ✅ Use 'Male' as fallback if undefined

              cy.get('select[formControlName="MaritalStatus"]').should('exist').select(customer.MaritalStatus || 'Single', { force: true }); // ✅ Use 'Single' if undefined


              cy.get('input[formControlName="City"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="City"]').should('exist').type(customer.City, { force: true, delay: 100 });

              cy.get('input[formControlName="State"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="State"]').should('exist').type(customer.State, { force: true, delay: 100 });

              cy.get('input[formControlName="Country"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="Country"]').should('exist').type(customer.Country, { force: true, delay: 100 });

              cy.get('input[formControlName="Education"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="Education"]').should('exist').type(customer.Education, { force: true, delay: 100 });

              cy.get('input[formControlName="Occupation"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="Occupation"]').should('exist').type(customer.Occupation, { force: true, delay: 100 });

              cy.get('input[formControlName="Income"]').should('exist').clear().wait(300);
              cy.get('input[formControlName="Income"]').should('exist').type(customer.Income, { force: true, delay: 100 });

              cy.get('textarea[formControlName="Interests"]').should('exist').clear().wait(300);
              cy.get('textarea[formControlName="Interests"]').should('exist').type(customer.Interests, { force: true, delay: 100 });

              cy.get('textarea[formControlName="PurchasedProducts"]').should('exist').clear().wait(300);
              cy.get('textarea[formControlName="PurchasedProducts"]').should('exist').type(customer.PurchasedProducts, { force: true, delay: 100 });
            });

            // ✅ Place cy.intercept() BEFORE clicking the button
            cy.intercept('POST', '**/recommendProducts').as('getProductRecommendations');

            // ✅ Click the button ONCE after setting up intercept
            cy.get('.product-recommendation button').contains('Get Recommendations').click();

            // ✅ Wait for API response and verify status code
            cy.wait('@getProductRecommendations', { timeout: 10000 }).then((interception) => {
              console.log('🔹 Cypress Intercepted Product API Request:', interception);
              expect(interception.response.statusCode).to.eq(200);
            });
          });
        }
      });
    });
  });
});
