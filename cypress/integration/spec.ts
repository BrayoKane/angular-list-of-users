describe('Angular List of Users App Testing', () => {

  it(`Should have the title 'List of Users'`, () => {
    cy.visit('/')
    cy.contains('List of Users');
  });

  it(`Should ensure Url has been routed properly`, () => {
    cy.url().should('include', '/users/list-view');
  });

  it(`Should have 100+ rows for the table due to infinite-scroll functionality`, () => {
    cy.get('.mat-table').find('mat-cell').its('length').should('be.gte', 100)
  });

  it(`Should show CSV and XML options when 'Export To' button is clicked`, () => {
    cy.get('[data-cy=export]').click();
    cy.contains('CSV');
    cy.contains('XML');
  });

});
