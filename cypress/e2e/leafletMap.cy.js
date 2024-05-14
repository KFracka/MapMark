// spec.cy.js
describe('LeafletMap Component Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/'); // Assuming your application's URL is '/'
  });

  it('should render the LeafletMap component', () => {
    cy.get('.auth-form').within(() => {
      cy.get('#formBasicEmail').type('test@test.com');
      cy.get('#formBasicPassword').type('test');
      cy.get('.auth-form-button').contains('Login').click();
      cy.wait(2000);
    });
    cy.get('.leaflet-container', {timeout: 10000 }).should('exist');
  });

  it('should allow users to search for locations', () => {
    cy.get('.auth-form').within(() => {
      cy.get('#formBasicEmail').type('test@test.com');
      cy.get('#formBasicPassword').type('test');
      cy.get('.auth-form-button').contains('Login').click();
      cy.wait(2000);
    });

    cy.intercept('GET', 'https://nominatim.openstreetmap.org/*').as('searchRequest');

    cy.get('#searchQuery').type('Stockholm');
    cy.get('.mb-2.ml-2.btn.btn-primary').click();

    cy.wait('@searchRequest').then(({ request }) => {
      expect(request.url).to.contain('Stockholm');
    });

    cy.get('.leaflet-marker-icon').should('exist');
    cy.get('.leaflet-marker-icon')
    .eq(3)
    .click();

    cy.get('.leaflet-popup-content').should('exist');
  });

  it('should allow users to add a new marker', () => {
    cy.get('.auth-form').within(() => {
      cy.get('#formBasicEmail').type('test@test.com');
      cy.get('#formBasicPassword').type('test');
      cy.get('.auth-form-button').contains('Login').click();
      cy.wait(2000);
    });

    cy.intercept('POST', 'http://localhost:3001/api/markers/add').as('addMarkerRequest');

    cy.get('.mb-2.ml-2.btn.btn-success').click();
    cy.get('#newMarkerName').type('New Marker');
    cy.get('#newMarkerLat').type('40.7128');
    cy.get('#newMarkerLng').type('-74.0060');
    cy.get('.modal-body').find('.btn.btn-primary').click();

    cy.wait('@addMarkerRequest').then(({ request }) => {
      const requestData = request.body;
      expect(requestData.name).to.equal('New Marker');
      expect(requestData.lat).to.equal('40.7128');
      expect(requestData.lng).to.equal('-74.0060');
    });

    cy.get('.leaflet-marker-icon').should('exist');
  });

  it('should allow users to delete a marker', () => {
    cy.get('.auth-form').within(() => {
      cy.get('#formBasicEmail').type('test@test.com');
      cy.get('#formBasicPassword').type('test');
      cy.get('.auth-form-button').contains('Login').click();
      cy.wait(2000);
    });

    cy.intercept('DELETE', 'http://localhost:3001/api/markers/delete').as('deleteMarkerRequest');

    // Assuming you have a marker at these coordinates
    const lat = '40.7128';
    const lng = '-74.0060';

    cy.get('.mb-2.ml-2.btn.btn-danger').click();
    cy.get('#deleteMarkerLat').type(lat);
    cy.get('#deleteMarkerLng').type(lng);
    cy.get('.modal-footer').find('.btn.btn-danger').click();

    cy.wait('@deleteMarkerRequest').then(({ request }) => {
      const requestData = request.body;
      expect(requestData.lat).to.equal(lat);
      expect(requestData.lng).to.equal(lng);
    });
  });
});
