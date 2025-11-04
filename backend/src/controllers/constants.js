// USUARIOS
const GET_ALL_USERS = "SELECT * FROM e_retro_users;";
const GET_USER_BY_ID = "SELECT * FROM e_retro_users WHERE id = $1;";
const CREATE_USER = "INSERT INTO e_retro_users (name, email, password, avatar, role) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
const UPDATE_USER =
  "UPDATE e_retro_users SET id = $1, name = $2, email = $3, user_password = $4, is_active = $5, updated_at = $6, avatar = $7 WHERE id = $1 RETURNING *;";
const DELETE_USER = "DELETE FROM e_retro_users WHERE id = $1 RETURNING *;";

// PRODUCTOS
const GET_ALL_PRODUCTS = "SELECT * FROM e_retro_products;";
const GET_PRODUCT_BY_ID = "SELECT * FROM e_retro_products WHERE id = $1;";
const CREATE_PRODUCT =
  "INSERT INTO e_retro_products (name, price, stock, condition) VALUES ($1, $2, $3, $4) RETURNING *;";
const UPDATE_PRODUCT =
  "UPDATE e_retro_products SET name = $1, price = $2, stock = $3 WHERE id = $4 RETURNING *;";
const DELETE_PRODUCT =
  "DELETE FROM e_retro_products WHERE id = $1 RETURNING *;";

export {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
};
