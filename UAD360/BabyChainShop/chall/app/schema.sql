DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS posts;

CREATE TABLE IF NOT EXISTS products (
   id INTEGER PRIMARY KEY,
   name TEXT,
   image_url TEXT,
   price INTEGER
);

CREATE TABLE IF NOT EXISTS notes (
   id INTEGER PRIMARY KEY,
   content TEXT
);

INSERT INTO products ( id, name, image_url, price ) VALUES (1,'Diamond necklace', '/static/img/necklace.png',789);
INSERT INTO products ( id, name, image_url, price ) VALUES (2,'Golden necklace', '/static/img/earrings.png',1200);
INSERT INTO products ( id, name, image_url, price ) VALUES (3,'Diamond ring', '/static/img/diamond-ring.png',234);

INSERT INTO notes ( id, content ) VALUES (1, 'Fixed logo positioning');
INSERT INTO notes ( id, content ) VALUES (2, 'Update product templates');
INSERT INTO notes ( id, content ) VALUES (3, 'Make sure it is responsive');