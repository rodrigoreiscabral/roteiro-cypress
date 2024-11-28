describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Edita uma tarefa existente', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');
  
    cy.get('[data-cy=todos-list] > li')
      .first()
      .dblclick();
  
    cy.get('[data-cy=todos-list] > li .edit')
      .clear()
      .type('TP2 de Sistemas Operacionais{enter}');
  
    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.text', 'TP2 de Sistemas Operacionais');
  });
  
  it('Adiciona múltiplas tarefas', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');
  
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3)
      .each((item, index) => {
        cy.wrap(item).should('have.text', `Tarefa ${index + 1}`);
      });
  });
  
  it('Atualiza a contagem correta de tarefas restantes', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');
  
    cy.get('.todo-count').should('contain.text', '3 items left');
  
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();
  
    cy.get('.todo-count').should('contain.text', '2 items left');
  });
});
