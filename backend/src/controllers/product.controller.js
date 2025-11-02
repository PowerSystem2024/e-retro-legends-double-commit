import { GET_ALL_PRODUCTS } from "./constants.js";

export class ProductController {
  constructor({ productsDB }) {
    this.productsDB = productsDB;
  }

  getFirstRow = (result) => result?.rows?.[0] || result?.[0];

  getAllProducts = async (req, res) => {
    try {
      const result = await this.productsDB.query(GET_ALL_PRODUCTS);
      const products = result?.rows || result;
      res.status(200).json(products);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res
        .status(500)
        .json({ message: "Error en el servidor: " + error.message });
    }
  };

  getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.productsDB.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
      );
      const product = this.getFirstRow(result);
      if (!product)
        return res.status(404).json({ message: "Producto no encontrado" });

      res.status(200).json(product);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener el producto: " + error.message });
    }
  };

  createProduct = async (req, res) => {
    const { name, price, stock } = req.body;
    try {
      const result = await this.productsDB.query(
        "INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *",
        [name, price, stock]
      );
      const newProduct = this.getFirstRow(result);
      res.status(201).json(newProduct);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear el producto: " + error.message });
    }
  };

  updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    try {
      const result = await this.productsDB.query(
        "UPDATE products SET name = $1, price = $2, stock = $3 WHERE id = $4 RETURNING *",
        [name, price, stock, id]
      );
      const updatedProduct = this.getFirstRow(result);
      if (!updatedProduct)
        return res.status(404).json({ message: "Producto no encontrado" });

      res.status(200).json(updatedProduct);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al actualizar el producto: " + error.message });
    }
  };

  deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.productsDB.query(
        "DELETE FROM products WHERE id = $1 RETURNING *",
        [id]
      );
      const deletedProduct = this.getFirstRow(result);
      if (!deletedProduct)
        return res.status(404).json({ message: "Producto no encontrado" });

      res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al eliminar el producto: " + error.message });
    }
  };
}
