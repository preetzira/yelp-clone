CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);
select *
from restaurants
    left join(
        select restaurant_id,
            count(*),
            TRUNC(AVG(rating, 1)) as average_rating
        from reviews
        group by restaurant_id
    ) reviews on restaurants.id = reviews.restaurant_id;


/*
CREATE TABLE products (
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale BOOLEAN
);

ALTER TABLE products ADD COLUMN is_available BOOLEAN;
ALTER TABLE products DROP COLUMN is_available;


CREATE TABLE restaurants(
  id BIGSERIAL NOT NULL PRIMARY KEY,--UNIQUE
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL
);

INSERT INTO restaurants(name, location, price_range) VALUES ('MacD', 'MOGA', 4);
INSERT INTO restaurants(name, location, price_range) VALUES ('MacD', 'MOGA', 4);
INSERT INTO restaurants(name, location, price_range) VALUES ('CCD', 'BARCELONA', 8);

CREATE TABLE reviews(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  review TEXT NOT NULL,
  rating INT CHECK(rating>1 and rating<=5),
  restaurant_id INT NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (id) ON DELETE CASCADE
  --restaurant_id BIGINT NOT NULL REFERENCES restaurants (id)
);

 ALTER TABLE reviews ALTER COLUMN restaurant_id TYPE BIGINT;

*/
