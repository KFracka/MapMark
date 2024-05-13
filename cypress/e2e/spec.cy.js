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
    cy.get('.auth-form').within(() => {
      cy.get('#formBasicEmail').type('test@example.com');
      cy.get('#formBasicPassword').type('password123');
      cy.get('.auth-form-button').contains('Register').click();
    });
    // Add assertions to check for successful registration
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
})
