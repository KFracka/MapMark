describe('AuthForm Component Tests', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/'); // Assuming your application's URL is '/'
  });

  it('should render the login form', () => {
      cy.get('.auth-form-container').should('exist');
      cy.get('.auth-form').should('exist');
      cy.get('#formBasicEmail').should('exist');
      cy.get('#formBasicPassword').should('exist');
      cy.get('.auth-form-button').contains('Login').should('exist');
      cy.get('.auth-form-link').contains('Forgot password?').should('exist');
  });

  it('should allow users to register', () => {
      cy.intercept('POST', 'http://localhost:3001/api/users/register').as('registerRequest');

      cy.get('.auth-form').within(() => {
          cy.get('#formBasicEmail').type('test@example.com');
          cy.get('#formBasicPassword').type('password123');
          cy.get('.auth-form-button').contains('Register').click();
      });

      cy.wait('@registerRequest').its('response.statusCode').should('eq', 200);

      // Assertion to check for the success message
      cy.get('.auth-form-success-message').should('contain', 'Registration successful! Please login.');

      // Wait for the form to reset and the login form to reappear
      cy.wait(4000); // Adjust this time if necessary
      cy.get('#formBasicEmail').should('exist');
      cy.get('#formBasicPassword').should('exist');
  });

  it('should handle validation errors', () => {
      // Test missing email
      cy.get('.auth-form').within(() => {
          cy.get('#formBasicPassword').type('password123');
          cy.get('.auth-form-button').contains('Register').click();
      });
      cy.get('.auth-form-error-message').should('contain', 'Email is required');

      // Test invalid email format
      cy.get('#formBasicEmail').type('invalid-email');
      cy.get('.auth-form-button').contains('Register').click();
      cy.get('.auth-form-error-message', {timeout: 10000 }).should('contain', 'Invalid email format');

      // Test missing password
      cy.get('#formBasicEmail').clear().type('test@example.com');
      cy.get('#formBasicPassword').clear();
      cy.get('.auth-form-button').contains('Register').click();
      cy.get('.auth-form-error-message').should('contain', 'Password is required');
  });

  it('should handle duplicate registration', () => {
      cy.intercept('POST', 'http://localhost:3001/api/users/register', {
          statusCode: 400,
          body: { message: 'Email is already in use' }
      }).as('duplicateRegisterRequest');

      cy.get('.auth-form').within(() => {
          cy.get('#formBasicEmail').type('duplicate@example.com');
          cy.get('#formBasicPassword').type('password123');
          cy.get('.auth-form-button').contains('Register').click();
      });

      cy.wait('@duplicateRegisterRequest').its('response.statusCode').should('eq', 400);

      cy.get('.auth-form-error-message').should('contain', 'Email is already in use');
  });

  it('should handle server errors gracefully', () => {
      cy.intercept('POST', 'http://localhost:3001/api/users/register', {
          statusCode: 500,
          body: { message: 'Internal Server Error' }
      }).as('serverErrorRequest');

      cy.get('.auth-form').within(() => {
          cy.get('#formBasicEmail').type('error@example.com');
          cy.get('#formBasicPassword').type('password123');
          cy.get('.auth-form-button').contains('Register').click();
      });

      cy.wait('@serverErrorRequest').its('response.statusCode').should('eq', 500);

      cy.get('.auth-form-error-message').should('contain', 'Internal Server Error');
  });

  it('should allow users to login', () => {
      cy.get('.auth-form').within(() => {
          cy.get('#formBasicEmail').type('test@example.com');
          cy.get('#formBasicPassword').type('password123');
          cy.get('.auth-form-button').contains('Login').click();
      });
      // Add assertions to check for successful login
  });

  it('should allow users to reset password', () => {
      cy.get('.auth-form-link').contains('Forgot password?').click();
      cy.get('#formBasicEmail').type('test@example.com');
      cy.get('#formNewPassword').type('newpassword123');
      cy.get('.auth-form-button').contains('Reset Password').click();
      // Add assertions to check for successful password reset
  });
});
