

INSERT INTO products (name, description, price, promotional_price, quantity, photo)
VALUES 
  ('Product 1', 'Description for Product 1', 1999, 1499, 100, 'https://images.tcdn.com.br/img/img_prod/829162/produto_teste_nao_compre_81_1_2d7f0b8fa031db8286665740dd8de217.jpg'),
  ('Product 2', 'Description for Product 2', 2999, NULL, 50, 'https://images.tcdn.com.br/img/img_prod/829162/produto_teste_nao_compre_81_1_2d7f0b8fa031db8286665740dd8de217.jpg'),
  ('Product 3', 'Description for Product 3', 3999, 3499, 25, 'https://images.tcdn.com.br/img/img_prod/829162/produto_teste_nao_compre_81_1_2d7f0b8fa031db8286665740dd8de217.jpg'),
  ('Product 4', 'Description for Product 4', 4999, NULL, 10, 'https://images.tcdn.com.br/img/img_prod/829162/produto_teste_nao_compre_81_1_2d7f0b8fa031db8286665740dd8de217.jpg'),
  ('Product 5', 'Description for Product 5', 5999, 4999, 5, 'https://images.tcdn.com.br/img/img_prod/829162/produto_teste_nao_compre_81_1_2d7f0b8fa031db8286665740dd8de217.jpg');

INSERT INTO cart (user_id) VALUES (1);

INSERT INTO cart_items (cart_id, product_id, quantity)
VALUES 
  (1, 1, 2),
  (1, 3, 1);