import { serverNeonDB } from "../config/neon/neonDbConfig";

/**
 * Función para llenar la base de datos con productos ficticios
 * [👀 Ojo! falta el user_id correspondiente a algun UUID generado despues de crear un usuario]
 */
async function seedProducts() {
  await serverNeonDB.query(`
    INSERT INTO e_retro_products (name, price, stock, condition, user_id, image)
    VALUES 
    ('Maradona 1986 Argentina Jersey', 199.99, 50, 'new', , 'https://example.com/maradona_jersey.jpg'),
    ('Michael Jordan Chicago Bulls Jersey', 249.99, 30, 'new', , 'https://example.com/jordan_jersey.jpg'),
    ('Pelé 1970 Brazil World Cup Shirt', 179.99, 40, 'new', , 'https://example.com/pele_shirt.jpg'),
    ('Magic Johnson Lakers Jersey', 189.99, 25, 'new', , 'https://example.com/magic_jersey.jpg'),
    ('Muhammad Ali Boxing Gloves', 299.99, 15, 'used', , 'https://example.com/ali_gloves.jpg'),
    ('Zinedine Zidane France 1998 Jersey', 169.99, 35, 'new', , 'https://example.com/zidane_jersey.jpg'),
    ('Wayne Gretzky Edmonton Oilers Jersey', 229.99, 20, 'new', , 'https://example.com/gretzky_jersey.jpg'),
    ('Babe Ruth Yankees Baseball Bat', 499.99, 5, 'used', , 'https://example.com/ruth_bat.jpg'),
    ('Ronaldo 2002 Brazil World Cup Boots', 349.99, 10, 'used', , 'https://example.com/ronaldo_boots.jpg'),
    ('Larry Bird Celtics Jersey', 209.99, 30, 'new', , 'https://example.com/bird_jersey.jpg')`);
}

seedProducts()