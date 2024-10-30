describe('automation test', () => {
  const baseUrl = 'https://automationexercise.com/';

  beforeEach(() => {
       // Bloqueia as requisições de anúncios (tira aqueles textões desnecessários que tinha lá)
       cy.intercept('GET', '**googleads.g.doubleclick.net**', (req) => {
        req.abort();
      }).as('blockAds');
      //Não sei ao certo o que faz pra ser sincero mas tava dando um erro lá e o chat me ajudou corrigir :)
      cy.intercept('GET', '**adtrafficquality.google/getconfig**', (req) => {
        req.abort();
      }).as('blockAdTraffic');
    cy.visit(baseUrl);
  });

  it('Compras', () => {
    // Passo 1: log-in
    cy.get('a[href="/login"]').click(); //Clique em login
    cy.get('input[data-qa="login-email"]').type('brunotest@gmail.com'); //Digite o email
    cy.get('input[data-qa="login-password"]').type('bruno1234'); // Digite a senha
    cy.get('button[data-qa="login-button"]').click(); //Clique no botao de login

    // Passo 2: Selecionar uma T-shirt
    cy.get('a[href="/products"]').click(); //Clique em "products"
    cy.get('input[id="search_product"]').type('T-Shirt');//Digite o produto que no caso é a T-shirt
    cy.get('button[id="submit_search"]').click(); // Clique na lupa de pesquisa
    cy.get('a[href="/product_details/28"]').click(); //Clique em view product
    cy.get('button[class="btn btn-default cart"]').click(); // Clique em add to cart
    cy.contains('View Cart').click(); // Clique em view cart que aparece na mensagem quando você adiciona ao carrinho

    // Passo 3: Finalizar a compra da T-shirt
    cy.get('a[class="btn btn-default check_out"]').click(); // Clique em proceed to checkout
    cy.get('a[href="/payment"]').click(); // Clique em Place Order
    cy.get('input[data-qa="name-on-card"]').type('Bruno Silva'); // Preencha com o nome do cartão
    cy.get('input[data-qa="card-number"]').type('3333333333'); // Preencha com o número do cartão
    cy.get('input[data-qa="cvc"]').type('455'); // Preencha com o código de verificação do cartão
    cy.get('input[data-qa="expiry-month"]').type('10'); // Preencha com mês de vencimento
    cy.get('input[data-qa="expiry-year"]').type('2065'); // Preencha com o ano de vencimento
    cy.get('button[data-qa="pay-button"]').click(); // Clique em pay and confirm order
    cy.get('a[data-qa="continue-button"]').click(); // Finalize clicando em continue
    
  });
});