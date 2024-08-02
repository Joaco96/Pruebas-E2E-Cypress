describe('Test página de registro', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3002/register')
  });

  it('Debe mostrar errores de validación cuando dejamos todos los campos sin completar', () => {
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="error-name"]').should('exist');
    cy.get('[data-cy="error-email"]').should('exist');
    cy.get('[data-cy="error-password"]').should('exist');
  });

  it('Debe mostrar errores de validación cuando ingresamos un email con formato incorrecto', () => {
    cy.get('[data-cy="email-input"]').type('joacocortes96');
    cy.get('[data-cy="email-input"]').should('have.value','joacocortes96');
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="error-email"]').should('exist');
  });

  it('Debe registrar al usuario correctamente y dirigirse al dashboard', () => {
    cy.get('[data-cy="name-input"]').type('Joaquin');
    cy.get('[data-cy="name-input"]').should('have.value','Joaquin');
    cy.get('[data-cy="email-input"]').type('joacocortes96@gmail.com');
    cy.get('[data-cy="email-input"]').should('have.value','joacocortes96@gmail.com');
    cy.get('[data-cy="password-input"]').type('laclavedemiecommerce44');
    cy.get('[data-cy="password-input"]').should('have.value','laclavedemiecommerce44');
    cy.get('[data-cy="submit"]').click();
    // Chequeamos que avanzo de página luego del registro
    cy.url().should('equal', 'http://localhost:3002/');
    // Chequeamos que exista el elemento avatar para corroborar que esta en el dashboard
    cy.get('[data-cy="avatar"]').should('exist');
  });

});